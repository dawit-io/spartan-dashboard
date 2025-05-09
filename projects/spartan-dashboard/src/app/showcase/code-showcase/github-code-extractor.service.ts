import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileNode } from './code-explorer.component';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubCodeExtractorService {
  // URL for GitHub raw content
  private readonly rawBaseUrl = 'https://raw.githubusercontent.com';
  private owner = '';
  private repo = '';
  private branch = 'main';

  constructor(private http: HttpClient) {}


  configure(config: {
    owner: string;
    repo: string;
    branch?: string;
  }): void {
    this.owner = config.owner;
    this.repo = config.repo;
    if (config.branch) this.branch = config.branch;
  }

  /**
   * Extracts source code from GitHub given a file path
   * @param path The path of the file in the repository
   */
  getSourceCode(path: string): Observable<string> {
    if (!this.owner || !this.repo) {
      return throwError(() => new Error('GitHub repository not configured. Call configure() first.'));
    }

    const encodedBranch = encodeURIComponent(this.branch);
    const rawUrl = `${this.rawBaseUrl}/${this.owner}/${this.repo}/${encodedBranch}/${this.normalizePath(path)}`;

    // Direct HTTP request to raw content (no base64 decoding needed)
    return this.http.get(rawUrl, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error(`Error retrieving file from GitHub: ${path}`, error);
        return of(`// Error retrieving file: ${path}\n// ${error.message || 'Check the path and configuration'} \n// URL: ${rawUrl}`);
      })
    );
  }

  /**
   * Maps the manually defined file structure by retrieving files from GitHub
   * @param fileStructure The manually defined file structure
   * @returns A new structure with content loaded from GitHub
   */
  loadComponentsFromGithub(fileStructure: FileNode[]): Observable<FileNode[]> {
    // Convert the tree structure to a flat list of files
    const allFiles = this.flattenFileStructure(fileStructure)
      .filter(node => node.type === 'file');

    // If there are no files, return the original structure
    if (allFiles.length === 0) {
      return of(fileStructure);
    }

    // Retrieve the content for each file
    const fileRequests = allFiles.map(file =>
      this.getSourceCode(this.normalizePath(file.path)).pipe(
        map(content => ({
          ...file,
          content
        }))
      )
    );

    // Convert back to the original structure with updated content
    return this.combineFileRequests(fileRequests, fileStructure);
  }

  /**
   * Normalizes the file path for the GitHub API
   * Removes leading slashes if present
   */
  private normalizePath(path: string): string {
    return path.startsWith('/') ? path.substring(1) : path;
  }

  /**
   * Flattens the file structure to facilitate processing
   */
  private flattenFileStructure(nodes: FileNode[]): FileNode[] {
    let result: FileNode[] = [];

    for (const node of nodes) {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result = result.concat(this.flattenFileStructure(node.children));
      }
    }

    return result;
  }

  /**
   * Combines all file requests and reconstructs the original structure
   */
  private combineFileRequests(
    fileRequests: Observable<FileNode>[],
    originalStructure: FileNode[]
  ): Observable<FileNode[]> {
    if (fileRequests.length === 0) {
      return of(originalStructure);
    }

    return new Observable<FileNode[]>(observer => {
      const fileContents = new Map<string, string>();

      const subscriptions = fileRequests.map(request =>
        request.subscribe({
          next: (fileNode) => {
            fileContents.set(fileNode.path, fileNode.content || '');

            if (fileContents.size === fileRequests.length) {
              const updatedStructure = this.updateFileStructureWithContent(
                originalStructure,
                fileContents
              );
              observer.next(updatedStructure);
              observer.complete();
            }
          },
          error: (err) => {
            console.error('Error in a file request:', err);
            fileContents.set(`error-${fileContents.size}`, '');

            if (fileContents.size === fileRequests.length) {
              const updatedStructure = this.updateFileStructureWithContent(
                originalStructure,
                fileContents
              );
              observer.next(updatedStructure);
              observer.complete();
            }
          }
        })
      );

      // Cleanup of subscriptions
      return () => {
        subscriptions.forEach(sub => sub.unsubscribe());
      };
    });
  }

  /**
   * Updates the file structure with downloaded contents
   */
  private updateFileStructureWithContent(
    structure: FileNode[],
    contentMap: Map<string, string>
  ): FileNode[] {
    return structure.map(node => {
      if (node.type === 'file') {
        return {
          ...node,
          content: contentMap.get(node.path) || node.content || ''
        };
      } else if (node.children) {
        return {
          ...node,
          children: this.updateFileStructureWithContent(node.children, contentMap)
        };
      }
      return node;
    });
  }
}

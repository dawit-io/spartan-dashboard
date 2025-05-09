import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFolder,
  lucideFolderOpen,
  lucideFile,
  lucideFileText,
  lucideFileCode,
  lucideFileJson,
  lucideChevronRight,
  lucideChevronDown,
  lucideCopy,
  lucideCheck,
} from '@ng-icons/lucide';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  content?: string;
  language?: string;
}

@Component({
  selector: 'app-code-explorer',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule, MonacoEditorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideIcons({
      lucideFolder,
      lucideFolderOpen,
      lucideFile,
      lucideFileText,
      lucideFileCode,
      lucideFileJson,
      lucideChevronRight,
      lucideChevronDown,
      lucideCopy,
      lucideCheck,
    }),
  ],
  template: `
    <div
      class="h-full flex flex-col md:flex-row border rounded-lg bg-card overflow-hidden dark"
    >
      <!-- File Tree -->
      <div class="w-full md:w-64 border-r border-border overflow-y-auto">
        <div class="p-4">
          <h3 class="text-sm font-medium text-card-foreground mb-3">Files</h3>
          <div class="file-tree">
            <ng-container *ngFor="let node of fileStructure">
              <div class="file-tree-node">
                <div
                  class="flex items-center p-1.5 rounded-md hover:bg-muted cursor-pointer"
                  (click)="toggleNode(node)"
                >
                  <span *ngIf="node.type === 'directory'" class="mr-1.5">
                    <ng-icon
                      [name]="
                        expandedNodes.includes(node.path)
                          ? 'lucideChevronDown'
                          : 'lucideChevronRight'
                      "
                      class="h-4 w-4 text-muted-foreground"
                    ></ng-icon>
                  </span>
                  <span *ngIf="node.type === 'file'" class="w-4 mr-1.5"></span>
                  <ng-icon
                    [name]="getNodeIcon(node)"
                    class="h-4 w-4 mr-1.5 text-muted-foreground"
                  ></ng-icon>
                  <span
                    class="text-foreground"
                    [class.font-medium]="selectedFilePath === node.path"
                    [class.text-primary]="selectedFilePath === node.path"
                  >
                    {{ node.name }}
                  </span>
                </div>

                <div
                  *ngIf="expandedNodes.includes(node.path) && node.children"
                  class="pl-4"
                >
                  <ng-container *ngFor="let childNode of node.children">
                    <div class="file-tree-node">
                      <div
                        class="flex items-center p-1.5 rounded-md hover:bg-muted cursor-pointer"
                        (click)="toggleNode(childNode)"
                      >
                        <span
                          *ngIf="childNode.type === 'directory'"
                          class="mr-1.5"
                        >
                          <ng-icon
                            [name]="
                              expandedNodes.includes(childNode.path)
                                ? 'lucideChevronDown'
                                : 'lucideChevronRight'
                            "
                            class="h-4 w-4 text-muted-foreground"
                          ></ng-icon>
                        </span>
                        <span
                          *ngIf="childNode.type === 'file'"
                          class="w-4 mr-1.5"
                        ></span>
                        <ng-icon
                          [name]="getNodeIcon(childNode)"
                          class="h-4 w-4 mr-1.5 text-muted-foreground"
                        ></ng-icon>
                        <span
                          class="text-foreground"
                          [class.font-medium]="
                            selectedFilePath === childNode.path
                          "
                          [class.text-primary]="
                            selectedFilePath === childNode.path
                          "
                        >
                          {{ childNode.name }}
                        </span>
                      </div>
                      <div
                        *ngIf="
                          expandedNodes.includes(childNode.path) &&
                          childNode.children
                        "
                        class="pl-4"
                      >
                        <ng-container
                          *ngFor="let grandChildNode of childNode.children"
                        >
                          <div class="file-tree-node">
                            <div
                              class="flex items-center p-1.5 rounded-md hover:bg-muted cursor-pointer"
                              (click)="toggleNode(grandChildNode)"
                            >
                              <span
                                *ngIf="grandChildNode.type === 'directory'"
                                class="mr-1.5"
                              >
                                <ng-icon
                                  [name]="
                                    expandedNodes.includes(grandChildNode.path)
                                      ? 'lucideChevronDown'
                                      : 'lucideChevronRight'
                                  "
                                  class="h-4 w-4 text-muted-foreground"
                                ></ng-icon>
                              </span>
                              <span
                                *ngIf="grandChildNode.type === 'file'"
                                class="w-4 mr-1.5"
                              ></span>
                              <ng-icon
                                [name]="getNodeIcon(grandChildNode)"
                                class="h-4 w-4 mr-1.5 text-muted-foreground"
                              ></ng-icon>
                              <span
                                class="text-foreground"
                                [class.font-medium]="
                                  selectedFilePath === grandChildNode.path
                                "
                                [class.text-primary]="
                                  selectedFilePath === grandChildNode.path
                                "
                              >
                                {{ grandChildNode.name }}
                              </span>
                            </div>
                          </div>
                        </ng-container>
                      </div>
                    </div>
                  </ng-container>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <div
          class="flex items-center justify-between p-4 border-b border-border"
        >
          <span class="text-sm font-medium text-card-foreground">{{
            selectedFileName
          }}</span>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            (click)="copyCode()"
          >
            <ng-icon
              [name]="copied ? 'lucideCheck' : 'lucideCopy'"
              class="h-3.5 w-3.5 mr-1"
            />
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <div class="flex-1 min-h-[400px]">
          <ngx-monaco-editor
            style="height: 100%; min-height: 400px;"
            [options]="editorOptions"
            [(ngModel)]="code"
            (onInit)="onEditorInit($event)"
          ></ngx-monaco-editor>
        </div>
      </div>
    </div>
  `,
  styles: [`
    ngx-monaco-editor {
      display: block;
      height: 100%;
      min-height: 400px;
    }
  `]
})
export class CodeExplorerComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() fileStructure: FileNode[] = [];
  @Input() selectedFilePath: string = '';
  @Output() fileSelect = new EventEmitter<string>();

  selectedFile: FileNode | null = null;
  selectedFileName: string = '';
  expandedNodes: string[] = [];
  editor: any = null;
  copied: boolean = false;
  isDarkMode: boolean = true;
  code: string = '';

  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    readOnly: true,
    fontSize: 14,
    wordWrap: 'on',
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    lineNumbers: 'on',
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    stickyScroll: {
      enabled: false,
    },
    hideCursorInOverviewRuler: true,
    renderLineHighlight: 'none',
    cursorStyle: 'line-thin',
  };

  ngOnInit() {
    this.suppressAllConsoleErrors();
    this.expandAllDirectories(this.fileStructure);

    if (this.selectedFilePath) {
      this.selectFileByPath(this.selectedFilePath);
    } else if (this.fileStructure.length > 0) {
      this.findAndSelectFirstFile(this.fileStructure);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileStructure'] && !changes['fileStructure'].firstChange) {
      this.expandAllDirectories(this.fileStructure);
    }

    if (
      changes['selectedFilePath'] &&
      !changes['selectedFilePath'].firstChange
    ) {
      this.selectFileByPath(this.selectedFilePath);
    }
  }

  ngAfterViewInit() {
    // ngx-monaco-editor gestisce automaticamente l'inizializzazione
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    // Ora l'editor è pronto all'uso
  }

  private expandAllDirectories(nodes: FileNode[]) {
    nodes.forEach((node) => {
      if (node.type === 'directory') {
        this.expandedNodes.push(node.path);
        if (node.children) {
          this.expandAllDirectories(node.children);
        }
      }
    });
  }

  private findAndSelectFirstFile(nodes: FileNode[]): boolean {
    for (const node of nodes) {
      if (node.type === 'file') {
        this.selectFile(node);
        return true;
      } else if (node.children) {
        if (this.findAndSelectFirstFile(node.children)) {
          return true;
        }
      }
    }
    return false;
  }

  private selectFileByPath(path: string) {
    const findFile = (nodes: FileNode[]): boolean => {
      for (const node of nodes) {
        if (node.path === path) {
          this.selectFile(node);
          return true;
        }

        if (node.children) {
          if (findFile(node.children)) {
            return true;
          }
        }
      }
      return false;
    };

    findFile(this.fileStructure);
  }

  private suppressAllConsoleErrors(): void {
    console.error = () => {};
    window.addEventListener('error', (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }, true);
  }

  toggleNode(node: FileNode) {
    if (node.type === 'directory') {
      const index = this.expandedNodes.indexOf(node.path);
      if (index >= 0) {
        this.expandedNodes.splice(index, 1);
      } else {
        this.expandedNodes.push(node.path);
      }
    } else {
      this.selectFile(node);
    }
  }

  selectFile(file: FileNode) {
    if (file.type !== 'file') return;

    this.selectedFile = file;
    this.selectedFileName = file.name;
    this.selectedFilePath = file.path;
    this.fileSelect.emit(file.path);

    // Aggiorna il contenuto dell'editor
    this.code = file.content || '';
    this.editorOptions = {
      ...this.editorOptions,
      language: this.getLanguageFromFile(file)
    };
  }

  getNodeIcon(node: FileNode): string {
    if (node.type === 'directory') {
      return this.expandedNodes.includes(node.path)
        ? 'lucideFolderOpen'
        : 'lucideFolder';
    }

    // Get file extension
    const ext = node.name.split('.').pop()?.toLowerCase() || '';

    switch (ext) {
      case 'ts':
      case 'js':
      case 'jsx':
      case 'tsx':
        return 'lucideFileCode';
      case 'json':
        return 'lucideFileJson';
      case 'html':
      case 'css':
      case 'scss':
      case 'md':
        return 'lucideFileText';
      default:
        return 'lucideFile';
    }
  }

  getLanguageFromFile(file: FileNode | null): string {
    if (!file) return 'typescript';

    if (file.language) return file.language;

    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    switch (ext) {
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'tsx':
        return 'typescript';
      case 'json':
        return 'json';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'scss':
        return 'scss';
      case 'md':
        return 'markdown';
      default:
        return 'typescript';
    }
  }

  copyCode() {
    if (!this.selectedFile?.content) return;

    navigator.clipboard.writeText(this.selectedFile.content).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  ngOnDestroy() {
    // Pulizia non necessaria, ngx-monaco-editor gestisce la distruzione dell'editor
  }
}

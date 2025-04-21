import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HeaderComponent } from '../layout/header/header.component';
import { MainComponent } from '../layout/main/main.component';
import {
  CodeExplorerComponent,
  FileNode,
} from '../showcase/code-showcase/code-explorer.component';
import { GithubCodeExtractorService } from '../showcase/code-showcase/github-code-extractor.service';
import { FeaturedComponent } from '../showcase/featured.component';
import { ShowcaseContainerComponent } from '../showcase/showcase-container.component';

@Component({
  selector: 'app-showcase-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseContainerComponent,
    HeaderComponent,
    MainComponent,
    CommonModule,
    FeaturedComponent,
    CodeExplorerComponent,
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-background">
      <app-header></app-header>

      <main class="flex-1">
        <section class="w-full py-3">
          <div class="container px-4">
            <div class="flex flex-col items-start">
              <h1 class="text-2xl font-bold">Spartan UI Dashboard</h1>
              <p class="text-sm text-muted-foreground mt-1">
                Dashboard, sidebar and charts
              </p>
            </div>
          </div>
        </section>

        <!-- Showcase Component -->
        <app-showcase-container [title]="'A simple dashboard layout'">
          <!-- Preview Content -->
          <div showcase-preview class="w-full h-full">
            <feautured></feautured>
          </div>

          <!-- Code Content -->
          <div showcase-code class="h-[600px]">
            <div
              *ngIf="isLoading"
              class="flex items-center justify-center h-full"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
              ></div>
              <span class="ml-2">Loading source code from GitHub...</span>
            </div>

            <app-code-explorer
              *ngIf="!isLoading"
              [fileStructure]="fileStructure"
              [selectedFilePath]="selectedFilePath"
              (fileSelect)="onFileSelect($event)"
            ></app-code-explorer>
          </div>
        </app-showcase-container>
      </main>

      <footer class="border-t py-6 md:py-0">
        <div
          class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
        >
          <p
            class="text-center text-sm leading-loose text-muted-foreground md:text-left"
          >
            © 2025 Spartan Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  `,
})
export class ShowcasePageComponent implements OnInit {
  selectedFilePath: string = '';
  fileStructure: FileNode[] = [];
  isLoading: boolean = true;

  private githubService = inject(GithubCodeExtractorService);

  ngOnInit() {
    // Configura il servizio GitHub con i dettagli specifici
    this.githubService.configure({
      owner: 'dawit-io',
      repo: 'spartan-dashboard',
      branch: 'feature/#showcase',
    });

    // Definisci una struttura file piatta ma con i percorsi completi per GitHub
    const manualFileStructure: FileNode[] = [
      {
        name: 'showcase.component.ts',
        path: 'projects/spartan-dashboard/src/app/pages/showcase.component.ts',
        type: 'file',
        language: 'typescript',
        content: '', // Verrà riempito dal servizio GitHub
      },
      {
        name: 'sidebar.component.ts',
        path: 'projects/spartan-dashboard/src/app/layout/sidebar/sidebar.component.ts',
        type: 'file',
        language: 'typescript',
        content: '', // Verrà riempito dal servizio GitHub
      },
    ];

    // Carica il contenuto dei file da GitHub
    this.isLoading = true;
    this.githubService
      .loadComponentsFromGithub(manualFileStructure)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (updatedStructure) => {
          this.fileStructure = updatedStructure;
          // Seleziona il primo file per default
          this.findAndSelectFirstFile(this.fileStructure);
        },
        error: (error) => {
          console.error('Errore nel caricamento dei file da GitHub:', error);
          // In caso di errore, utilizza comunque la struttura base
          this.fileStructure = manualFileStructure;
          this.findAndSelectFirstFile(this.fileStructure);
        },
      });
  }

  onFileSelect(filePath: string) {
    this.selectedFilePath = filePath;
  }

  private findAndSelectFirstFile(nodes: FileNode[]): boolean {
    for (const node of nodes) {
      if (node.type === 'file') {
        this.selectedFilePath = node.path;
        return true;
      } else if (node.children) {
        if (this.findAndSelectFirstFile(node.children)) {
          return true;
        }
      }
    }
    return false;
  }
}

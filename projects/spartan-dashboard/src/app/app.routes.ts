import { Routes } from '@angular/router';
import { DefaultDashboardComponent  } from './showcase/demo/default-dashboard.component';
import { ShowcasePageComponent } from './showcase/showcase-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./pages/components/components-page.component').then((m) => m.ComponentsPageComponent),
  },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'featured', component: DefaultDashboardComponent  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

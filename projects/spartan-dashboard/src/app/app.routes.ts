import { Routes } from '@angular/router';
import { DefaultDashboardComponent  } from './showcase/default-dashboard.component';
import { ShowcasePageComponent } from './showcase/showcase-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'featured', component: DefaultDashboardComponent  },
  {
    path: '**',
    redirectTo: '/showcase',
  },
];

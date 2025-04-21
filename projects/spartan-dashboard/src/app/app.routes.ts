import { Routes } from '@angular/router';
import { ShowcasePageComponent } from './pages/showcase-page.component';
import { FeaturedComponent } from './showcase/featured.component';

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
  { path: 'featured', component: FeaturedComponent },
  {
    path: '**',
    redirectTo: '/showcase',
  },
];

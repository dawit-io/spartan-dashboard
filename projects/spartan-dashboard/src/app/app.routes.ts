import { Routes } from '@angular/router';
import { FeaturedShowcaseComponent } from './pages/featured-showcase.component';
import { HomeComponent } from './pages/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'featured', component: FeaturedShowcaseComponent },
  { path: '**', redirectTo: '' }
];

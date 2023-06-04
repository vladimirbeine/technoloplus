import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'intro-page',
    loadChildren: () => import('./pages/intro-page/intro-page.module').then( m => m.IntroPagePageModule)
  },
  {
    path: 'recent-news',
    loadChildren: () => import('./pages/recent-news/recent-news.module').then( m => m.RecentNewsPageModule)
  },
  {
    path: 'single-page',
    loadChildren: () => import('./pages/single-page/single-page.module').then( m => m.SinglePagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

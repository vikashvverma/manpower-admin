import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { PartyComponent } from './party/party.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // outlet: 'popup'
  },
  {
    path: 'job',
    component: JobComponent
  },
  {
    path: 'party',
    component: PartyComponent
  },  // { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard,
    // SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';

const routes: Routes = [
  // Auth Layout
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/profile',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () => import('@myschool/auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },

  // Profile Module
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@myschool/profile/profile.module').then(m => m.ProfileModule),
      },

      //Grade Module
      {
        path: '',
        loadChildren: () => import('@myschool/grades/grades.module').then(m => m.GradesModule),
      }
      

    ]
  },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

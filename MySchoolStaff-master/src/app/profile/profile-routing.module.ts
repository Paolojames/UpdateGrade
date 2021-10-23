import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@myschool/auth/auth.guard';
import { ProfileComponent } from '@myschool/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        // canActivate: [AuthGuard],
        // canDeactivate: [AuthGuard],
        component: ProfileComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

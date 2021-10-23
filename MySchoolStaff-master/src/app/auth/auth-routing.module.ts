import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { GradesComponent } from '@myschool/grades/grades.component';
import { EnglishComponent } from '@myschool/english/english.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'verify/:token',
        component: VerifyComponent,
      },

      {
        path: 'grades',
        component: GradesComponent,
      },
      
      {
        path: 'english',
        component: EnglishComponent,
      },

      {
        path: 'change-password',
        canActivate: [AuthGuard],
        canDeactivate: [AuthGuard],
        component: ChangePasswordComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@myschool/auth/auth.guard';
import { GradesComponent } from '@myschool/grades/grades.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grades',
        // canActivate: [AuthGuard],
        // canDeactivate: [AuthGuard],
        component: GradesComponent,
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule { }

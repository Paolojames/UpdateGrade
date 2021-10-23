import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnglishComponent } from '@myschool/english/english.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'english',
        // canActivate: [AuthGuard],
        // canDeactivate: [AuthGuard],
        component: EnglishComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnglishRoutingModule { }

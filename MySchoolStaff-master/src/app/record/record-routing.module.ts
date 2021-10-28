import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from '@myschool/record/record.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'record',
        
        component: RecordComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule { }

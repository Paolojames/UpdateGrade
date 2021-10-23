import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesRoutingModule } from './grades-routing.module';
import { MaterialModule } from '@myschool/material/material.module';
import { GradesComponent } from '@myschool/grades/grades.component';


@NgModule({
  declarations: [
    GradesComponent
  ],
  imports: [
    CommonModule,
    GradesRoutingModule,
    MaterialModule,
  ],
   

})
export class GradesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@myschool/material/material.module';
import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from '@myschool/record/record.component';

@NgModule({
  declarations: [
    RecordComponent
  ],
  imports: [
    CommonModule,
    RecordRoutingModule,
    MaterialModule
  ]
})
export class RecordModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishRoutingModule } from './english-routing.module';
import { MaterialModule } from '@myschool/material/material.module';
import { SchoolClassService } from '@myschool/services/school-class.service';
import { ProfileService } from '@myschool/services/profile.service';
import { EnglishComponent } from '@myschool/english/english.component';


@NgModule({
  declarations: [
    EnglishComponent
  ],
  imports: [
    CommonModule,
    EnglishRoutingModule,
    MaterialModule,
   
  ],
 
})
export class EnglishModule { }

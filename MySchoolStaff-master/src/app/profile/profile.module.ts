import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '@myschool/material/material.module';
import { ProfileComponent } from '@myschool/profile/profile.component';
import { SchoolClassService } from '@myschool/services/school-class.service';
import { ProfileService } from '@myschool/services/profile.service';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
  ],
  providers: [
    SchoolClassService,
    ProfileService,
  ]
})
export class ProfileModule { }

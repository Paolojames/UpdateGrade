import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { StudentResponse } from '@myschool/interfaces/school.interface';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceResolver implements Resolve<StudentResponse> {
  constructor(
    private profileService: ProfileService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentResponse> {
    return this.profileService.getStudentProfile<StudentResponse>();
  }
}

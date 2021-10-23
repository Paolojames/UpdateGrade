import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, StaffResponse } from '@myschool/interfaces/school.interface';
import { AuthService } from '@myschool/services/auth.service';
import { ProfileService } from '@myschool/services/profile.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  profile$: Observable<Profile> = new Observable<Profile>();;
  logo: string = '/assets/logo-dark-wide.png';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    // this.route.data.subscribe(data => {
    //   const profile: Observable<StudentResponse> = of(data.profile);
    //   this.profile$ = profile.pipe(map(this.serializeStudentResponse));
    // });
  }

  ngOnInit(): void {
    this.getStaffProfile();
  }

  private serializeStaffResponse(data: StaffResponse): Profile {
    return {
      name: `${data.user.firstName || ''} ${data.user.lastName || ''}`,
      image: data.image || '/assets/profile-pic.jpg',
    }
  }

  private getStaffProfile(): void {
    this.profile$ = this.profileService.getStaffProfile<StaffResponse>()
      .pipe(map(this.serializeStaffResponse));
  }

  onBrandClick(): void {
    this.router.navigate(['/profile']);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onChangePassword(): void {
    this.router.navigate(['/change-password'])
  }

}

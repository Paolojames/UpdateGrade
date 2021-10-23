import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile, StaffRequest, StaffResponse} from '@myschool/interfaces/school.interface';
import { ProfileService } from '@myschool/services/profile.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private staffId?: number;
  uploadedFileContent?: any;

  grades: string = '/grades';
  profile$: Observable<Profile> = new Observable<Profile>();

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getStaffProfile();
  }

  private serializeStaffResponse(data: StaffResponse): Profile {
    return {
      name: `${data.user.firstName || ''} ${data.user.lastName || ''}`,
      image: data.image || '/assets/profile-pic.jpg',
    };
  }

  private getStaffProfile(): void {
    this.profile$ = of({
      name: 'Teacher 1',
      image: '/assets/profile-pic.jpg',
    });
    // this.profile$ = this.profileService.getStaffProfile<StaffResponse>()
    //   .pipe(
    //     tap((data: StaffResponse) => {
    //       this.staffId = data.id;
    //     }),
    //     map(this.serializeStaffResponse)
    //   );
  }

  private validatePhotoMimeType(file?: File): void {
    const pattern: RegExp = new RegExp("image/*", 'gi');
    if (file && !pattern.test(file.type)) {
      this.snackBar.open('Unknown file type! File is not an image.', 'Ok', {
        // verticalPosition: 'top',
        panelClass: 'profile-snack-bar'
      });
    }
  }

  onChangeUpload(event: any): void {
    const file: File = event.target.files[0];
    let profile: Partial<StaffRequest> = {
      image: file
    };
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (x) => {
      this.uploadedFileContent = fileReader.result;
    };

    fileReader.readAsDataURL(file);
    this.validatePhotoMimeType(file);
    this.profileService.formUpdateProfile<StaffResponse>(this.staffId!, profile).subscribe();
  }

  ngOnDestroy(): void {
    this.snackBar.dismiss();
  }
}

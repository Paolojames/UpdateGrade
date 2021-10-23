import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { School } from '@myschool/interfaces/school.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  login: string = "/login";
  hidePassword: boolean = true;
  selectedSchool?: School;
  schools: School[] = [{
    id: "1",
    name: "Saint Clare",
    active: true
  }, {
    id: "2",
    name: "Saint Paul",
    active: true
  }];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const token = 'abc123';
    this.router.navigate(["verify", token]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm= this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  
  }

  ngOnInit() {
    
   }

  loginUser(userData) {
    this.userData = userData;
    this.authService.login(this.userData)
  }
}
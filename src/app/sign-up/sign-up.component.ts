import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  formGroup: FormGroup;
  rquiredAlert: string = 'This field is required';
  userData: any;
  isShown=false;
  constructor(
    public formBuilder: FormBuilder, 
    public authService: AuthService, 
    public router: Router) { }

  ngOnInit() {
    
    this.createForm();
  }
 
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneNumregex: RegExp = /^\+[1-9]{1}[0-9]{3,14}$/;
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'mobileNumber': [null, Validators.required,Validators.pattern(phoneNumregex)],
      'city': [null, Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      'password': [null, [Validators.required, this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'AlphaNumeric password is required with atleast one capital letter' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be alphanumeric with atleast one capital letter' : '';
  }

  onSubmit(userData) {
    this.userData = userData;
    this.authService.register(this.userData).subscribe((res) => {
      if (res._id){
        this.router.navigate(['login']);
      }
    })
  }

  onCountryChange(event)
{
  console.log(event.dialCode);
  console.log(event.name);
  console.log(event.iso2);
}


}

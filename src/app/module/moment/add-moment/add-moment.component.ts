
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../../nav-bar/navbar.service';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css']
})
export class AddMomentComponent implements OnInit {
  isShown: boolean;
  form: FormGroup = new FormGroup({});
  
  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public nav: NavbarService ) {
  
    this.form = this.fb.group({
      title: [null,Validators.required,Validators.maxLength(100)],
      file: [null,Validators.required],
      tags:[null,Validators.required],
    })

 

  }

  ngOnInit() {
    this.nav.show();
    this.isShown = true;
  }
  
  uploadFile(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }

  submitForm() {
    const formModel = this.form.value; 
    console.log(formModel)
    this.authService.addMoment(formModel).subscribe((res) => {
      if (res._id){
        this.router.navigate(['/user/listMoment']);
      }
    })
  }
  

  
}

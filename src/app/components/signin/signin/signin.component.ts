import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6789]{1}[0-9]{9}$')]]
    });
  }
  get signupControl() 
     {
      return this.signinForm.controls; 
    }
  
    handleSignup(){
      if (this.signinForm.invalid) return;
       const { fullName, email, password, mobileNumber } = this.signinForm.value;
    const userData = {
      name : fullName,
      email,
      password,
      mobileNumber
    };
    this.userService.signupApi(userData).subscribe(
      (res) => {
        console.log(res);
              },
      (err)=>console.log(err))
  }
}

import { DataService } from 'src/app/services/dataService/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Use ":" instead of "!=" to define the type correctly
  constructor(private formBuilder: FormBuilder,private userService:UserService,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   

  }

  get loginControl() 
  {
     return this.loginForm.controls; 
  }

  handleLogin(){
     if(this.loginForm.invalid) return
     const {email, password} = this.loginForm.controls
     this.userService.loginApi(email.value, password.value).subscribe(res => {
       console.log(res)
       localStorage.setItem("authToken", res.data)
       this.router.navigate(["/books"])
      }, err => console.log(err)
    )
  }
}

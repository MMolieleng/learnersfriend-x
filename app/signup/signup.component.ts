import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../auth.service';

import { User } from "../models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  submitted: boolean = false;
  submitting: boolean = false;
  submittedSuccessfully: boolean = false;
  successfullyRegistered: boolean = false;

  showSignup: boolean = false;

  errorMessage: string = null;
  user: User;

  constructor(private auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit() {

    this.showSignup = true;
    this.submitting = false;
    this.signupForm  = 
      new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
      });
  }

  get f() { return this.signupForm.controls; }

  signup(){

    this.doSignup();
  //   this.submitting = true;
  //   this.submitted = false;
  //   this.errorMessage = null;
  //   console.log(this.signupForm)

  //   if (this.signupForm.valid){
      
  //     let displayName = this.signupForm.value.fullNames
  //     this.auth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.signupForm.value.userEmail, this.signupForm.value.userPassword)
  //     .then(res =>{
        

  //       res.user.updateProfile({displayName: displayName, photoURL: ""})
  //       .then(r =>{
  //         console.info("Done With User")
  //         console.log(r)
  //       })
  //       this.submitted = true;
  //       this.submitting = false;
  //       this.submittedSuccessfully = true;
  //       this.showSignup = false;
  //     })
  //     .catch(err => {

  //       this.showSignup = true;
  //       console.error("Error occured "+ err.message)
  //       console.log(err)
  //       this.errorMessage = err.message;
  //       this.submitted = true;
  //       this.submitting = false;
  //       this.submittedSuccessfully = false;
  //     })
  //   }
  }

  doSignup(){

    this.submitting = true;
    this.submitted = false;
    this.errorMessage = null;

    if (this.signupForm.valid){
    
      this.user = this.signupForm.value;
      console.log(this.user);

      this.authService.signupUser(this.user)
      .subscribe(res => {

        console.log("SUCCESS")
        console.log(res)
      }, err => {
        console.log("Error Http")
        console.log(err)
      })
    }
  }
}

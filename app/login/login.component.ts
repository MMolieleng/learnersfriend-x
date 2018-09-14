import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  wrongDetails: boolean = false;
  submitted: boolean = false;
  submitting: boolean = false;
  errorMessage: string = null;

  loginForm: FormGroup
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, 
    private authService: AuthService) {
      
  }

  ngOnInit() {
    this.submitted = false;
    this.submitting = false;

    this.loginForm = new FormGroup({
        userEmail: new FormControl(''),
        userPassword: new FormControl('')
      });
  }

  login() {
    this.wrongDetails = false;
    this.submitting = true;
    
    this.authService.login(this.loginForm.value.userEmail, this.loginForm.value.userPassword)
    .then(res => {
      this.submitting = false;
      this.router.navigate(['courses'])
    })
    .catch(err =>{
      this.submitting = false;
      this.wrongDetails = true;
      // console.error(err)
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  get f() { return this.loginForm.controls; }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  emailForm: FormGroup
  submitting: boolean;
  submitted: boolean;
  errorSubmitting: boolean;
  erroMessage: string = null;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {

  }

  ngOnInit() {

    this.submitted = false;
    this.submitting = false;
    this.errorSubmitting = false;
    this.emailForm  = new FormGroup({
      userEmail: new FormControl('')
    });
  }

  submitUserEmail(){

    this.submitted = false;
    this.erroMessage = null;
    this.submitting = true;
    this.errorSubmitting = false;
    this.afAuth.auth.sendPasswordResetEmail(this.emailForm.value.userEmail)
    .then(res => {

      this.submitted = true;
      this.submitting = false;
      this.errorSubmitting = false;
      console.info(res)
    })
    .catch(err => {

      console.log(err)
      this.erroMessage = err.message;
      this.submitting = false;
      this.errorSubmitting = true;
    })
  }

  get f() { return this.emailForm.controls; }

}

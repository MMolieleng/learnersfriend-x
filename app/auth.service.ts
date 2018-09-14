import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public API = '//localhost:8080';
  public SIGNUP_API = this.API + '/users/signup';

  authState:any = null;
  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private router:Router,
    private http: HttpClient) {

      // this.afAuth.authState.subscribe((auth) => {
      //   console.log("Auth Service Subscriber")
      //   this.authState = auth
      //   console.log("In Subscrice Auth =  "+ auth.email)
      //   console.log(auth)
      //   console.log("In Subscrice ")
      //   console.log(this.authState)
      // });
  }

  login(email, password){
    
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  get currentUserObservable(): any {
    return this.afAuth.auth
  }  

  //Returns true if user is logged in
  get authenticated(): boolean {
    console.log("Checking authState")
    console.log(this.authState)
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    console.log("In Current User")
    console.log(this.afAuth.authState);
    return this.authenticated ? this.authState : null;
  }

  set loggedState(state){
    this.authState = state;
  }
  signup(){
    console.log('signup here');
  }


  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['login'])
  }

  getUser(){
    console.info(this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser
  }

  // Remote Signup User
  signupUser(user: User){

    var userData = {
      'firstname':user.firstname,
      'lastname': user.lastname, 
      'password': user.password, 
      'email': user.email
    };

    var postData = JSON.stringify(userData);

    return this.http.post(
      this.SIGNUP_API, 
      JSON.stringify(user),
      {
        headers: {
          'Content-Type':'application/json'
        }
      }
    );
  }
}

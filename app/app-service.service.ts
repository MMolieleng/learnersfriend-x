import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const subscribeEndpoint:string = "https://whispering-stream-18628.herokuapp.com/subscribe";
// const subscribeEndpoint:string = "http://localhost:5000/subscribe";


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  subscribeEndpoint:string = "https://whispering-stream-18628.herokuapp.com/subscribe";

  constructor(private http: HttpClient) { }

  sendEmail( emailAddress, message, usernames, price){

   return this.http.post(this.subscribeEndpoint, {email: emailAddress, message: message, usernames: usernames, price: price });
  }

  getCourses() {
    return this.http.get('./assets/courses.json');
  }

  getTutors(){
    return this.http.get('./assets/tutors.json');
  }
}

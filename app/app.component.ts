import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
// import * as $ from 'jquery';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  postsCol: AngularFirestoreCollection;
  posts: Observable<Object[]>;

  subscriptionCollection: AngularFirestoreCollection;
  subscriptionsList: Observable<Object[]>

  courses: Object[];
  submitted: boolean = false;
  submittedSuccessfully: boolean = false;
  selectedCourse: any = null;

  subscriptionForm: FormGroup
  submitting: boolean = false;

  @ViewChild('closeBtn') closeModalBtn: ElementRef;
  
  constructor(private afs: AngularFirestore, private auth: AuthService){
  
  }

  isLogged(){
    return this.auth.authenticated;
  }

  logout(){
    this.auth.signOut();

  }

  ngOnInit(){

    this.useJquery()
    this.submitting = false;
    this.subscriptionForm  = 
      new FormGroup({
        userNames: new FormControl(''),
        userPhone: new FormControl(''),
        userEmail: new FormControl('')
      });

    this.courses = this.getCourses();
    // this.postsCol = this.afs.collection('posts');
    // this.posts = this.postsCol.valueChanges();

    this.subscriptionCollection = this.afs.collection('subscriptions');
    this.subscriptionsList = this.subscriptionCollection.valueChanges();

    this.courses = [
      {title:"Mathematics", icon:"fa-plus", bg:"bg-dark", color:"text-light", price: 100.00},
      {title:"Business Education", icon:"fa-yen", bg:"bg-success", color:"text-light", price: 100},
      {title:"Physics", icon:"fa-flask", bg:"bg-primary", color:"text-light", price: 100},
      {title:"Biology", icon:"fa-heartbeat", bg:"bg-danger", color:"text-light", price: 100},
      {title:"English", icon:"fa-bookmark", bg:"bg-primary", color:"text-light", price: 100},
      {title:"Religion", icon:"fa-book", bg:"bg-warning", color:"text-light", price: 100},
      {title:"Accounting", icon:"fa-bar-chart", bg:"bg-success", color:"text-light", price: 100},
      {title:"Chemistry", icon:"fa-filter", bg:"bg-dark", color:"text-light", price: 100}      
    ];
  }

  useJquery(){
    
      // $(".navbar-brand").toggle(function(){
      //     var div = $("div");  
      //     div.animate({left: '100px'}, "slow");
      //     div.animate({fontSize: '5em'}, "slow");
      // });

      $(document).ready(function() { 
        $("body").click(function(event) {
                // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
                 if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
                    $('.navbar-collapse').hide()
                }
          });
        });
  }

  getCourses(){
    return [
        {title:'Mathematics', selected:false, price:100},
        {title:'English', selected:false, price: 100},
        {title:'Physics', selected:false, price: 100},
        {title:'Chemistry', selected:false, price: 100}
      ];
  }

  subscribe(event , courseParam){
    
    this.selectedCourse = courseParam
    console.log(this.selectedCourse)
    console.log("Subscription "+this.selectedCourse.title +" "+ event )
  }


  onSubmit(){
    
    this.submitting = true;
    this.submitted = false;
    this.submittedSuccessfully = false;

    let newSubscription = {
      subject: this.selectedCourse.title,
      price: this.selectedCourse.price,
      courseIcon: this.selectedCourse.icon,
      userNames: this.subscriptionForm.value.userNames,
      userPhone: this.subscriptionForm.value.userPhone,
      userEmail: this.subscriptionForm.value.userEmail,
      subscriptionDate: new Date().toLocaleString() +"" 
    };

    this.subscriptionCollection.add( newSubscription )
    .then(res => {
    
      console.log(res.id)
      this.submitting = false;
      this.submitted = true;
      this.submittedSuccessfully = true;
    })
    .catch(res => {
      this.submitting = false;
      this.submitted = true;
      this.submittedSuccessfully = false;     
    });
  }

  closeSuccess(){
    this.submitted = false;
    this.submitting = false;
    this.submittedSuccessfully = false;
    this.closeModalBtn.nativeElement.click();    
  }
}

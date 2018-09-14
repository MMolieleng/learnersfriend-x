import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
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
  
  constructor(private afs: AngularFirestore, private appService: AppServiceService){

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
      {title:"Mathematics", icon:"fa-plus", bg:"bg-dark", color:"text-light", price: 150.00},
      {title:"Business Education", icon:"fa-yen", bg:"bg-success", color:"text-light", price: 150},
      // {title:"Physics", icon:"fa-flask", bg:"bg-primary", color:"text-light", price: 150},
      // {title:"Biology", icon:"fa-heartbeat", bg:"bg-danger", color:"text-light", price: 150},
      {title:"English", icon:"fa-bookmark", bg:"bg-primary", color:"text-light", price: 150},
      {title:"Accounting", icon:"fa-book", bg:"bg-warning", color:"text-light", price: 150},
      // {title:"Accounting", icon:"fa-bar-chart", bg:"bg-success", color:"text-light", price: 100},
      // {title:"Chemistry", icon:"fa-filter", bg:"bg-dark", color:"text-light", price: 100}      
    ];
  }

  useJquery(){
  
  $(document).ready(function() { 

    $("body").click(function(event) {
            // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
             if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
                $('.navbar-collapse').collapse('toggle');
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
    console.log("Selected Course")
    // console.log(this.selectedCourse);
    this.appService.sendEmail( 'info.learnersfriend@gmail.com', this.selectedCourse.title, this.subscriptionForm.value.userNames, this.selectedCourse.price )
    .subscribe(
      function(res){
        // this.appService.sendEmail( 'info.learnersfriend@gmail.com' );
      },
      function(err){
      })

    this.appService.sendEmail( this.subscriptionForm.value.userEmail, 
      this.selectedCourse.title, this.subscriptionForm.value.userNames, this.selectedCourse.price)
    .subscribe(
      function(res){
        // Email Sending Failed
      },
      function(err){
        // Email Sending Failed
      }
  )

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

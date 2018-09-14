import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { last } from '@angular/router/src/utils/collection';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {

  tutors: any;
  filteredTutors: any [];

  submitted: boolean = false;
  submitting: boolean = false;
  submittedSuccessfully: boolean = false;
  selectedTutor: any = null;

  subscriptionForm: FormGroup;
  subscriptionCollection: AngularFirestoreCollection;
  subscriptionsList: Observable<Object[]>

  @ViewChild('closeBtn') closeModalBtn: ElementRef;

  constructor(private afs: AngularFirestore, private appService: AppServiceService) { }
  
  ngOnInit() {

    this.submitting = false;
    this.subscriptionForm  = 
      new FormGroup({
        userNames: new FormControl(''),
        userPhone: new FormControl(''),
        userSubject: new FormControl(''),
        userMessage: new FormControl('')
      });

    this.subscriptionCollection = this.afs.collection('subscriptions');
    this.appService.getTutors()
    .subscribe(data =>{
      
      this.tutors = data;
      this.filterTutors('All');
      this.shuffle();
    }, err => {
      // console.log(err)
    })
  }

  getSymbol(lastname:string){
    return lastname.charAt(0).toLocaleUpperCase();
  }

  filterTutors(subject){

    if (subject == 'All')
      this.filteredTutors = this.tutors;
    else
    {
      this.filteredTutors = [];
      for ( var i = 0; i < this.tutors.length; i++ ){

        let tutor = this.tutors[i];
        let subjects = this.tutors[i].subjects;
        for (var k = 0; k < subjects.length; k++){
          if (subjects[k].title == subject){
            this.filteredTutors.push(tutor);
          }
        }
      }
     this.shuffle();
    
    }
  }

  subscribe(event , courseParam){
    
    this.selectedTutor = courseParam
    // console.log(this.selectedTutor)
    // console.log("Subscription "+this.selectedTutor.surname +" "+ event )
  }

  onSubmit(){

    // console.log(this.subscriptionForm.value)
    this.submitting = true;
    this.submitted = false;
    this.submittedSuccessfully = false;

    let newSubscription = {
      subject: this.subscriptionForm.value.userSubject,
      price: this.selectedTutor.fee,
      userNames: this.subscriptionForm.value.userNames,
      userPhone: this.subscriptionForm.value.userPhone,
      subscriptionDate: new Date().toLocaleString() +"" 
    };

    this.appService.sendEmail( 'info.learnersfriend@gmail.com', this.selectedTutor.firstname, this.subscriptionForm.value.userNames, this.selectedTutor.fee )
    .subscribe(
      function(res){
        // this.appService.sendEmail( 'info.learnersfriend@gmail.com' );
      },
      function(err){
      })

      // Save to firesbase
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


  shuffle = function() {
     
    for (var i = this.filteredTutors.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = this.filteredTutors[randomIndex]; 
         
        this.filteredTutors[randomIndex] = this.filteredTutors[i]; 
        this.filteredTutors[i] = itemAtIndex;
    }
  }

  closeSuccess(){
    this.submitted = false;
    this.submitting = false;
    this.submittedSuccessfully = false;
    this.closeModalBtn.nativeElement.click();    
  }
}

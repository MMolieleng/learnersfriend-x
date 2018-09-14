import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any;
  constructor(public appService: AppServiceService) { }

  ngOnInit() {

    this.appService.getCourses()
    .subscribe(data =>{

      this.courses = data
    }, err => {
      // TODO give informative error message here
      console.log(err)
      
    })
  }
}

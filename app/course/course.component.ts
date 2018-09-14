import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { AppServiceService } from '../app-service.service';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private id;
  course: any;
  videos: any;
  courses: any;
  playingIndex = 0;
  currentVideo: any //= {"url":"https://youtube.com/embed/2Q7yRXkYSxs"};

  constructor(private route: ActivatedRoute, 
              private router: Router,
              public sanitizer: DomSanitizer, 
              private appService: AppServiceService) {
   
    // this.currentVideo = {"url":"https://www.youtube.com/embed/2Q7yRXkYSxs"};
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    
    });
   }

  ngOnInit() {

    this.appService.getCourses()
    .subscribe(data =>{

      this.courses = data;
      this.course = this.courses[this.id]
     
      if (this.course == null){
        
        this.router.navigate(["404"]);
      }else{

        this.videos = this.course.videos;
        this.currentVideo = this.videos[0];
      }
    }, err => {

      // TODO give informative error message here      
      console.log(err)
    })
  }

  changeVideo(index){
    this.playingIndex = index;
    this.currentVideo.url = this.videos[index].url;
  }

  videoURL( url : string ) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url +'?autoplay=1');
  }

  public getSantizeUrl(url : string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

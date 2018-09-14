import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserPageComponent } from './user-page/user-page.component'

import { AppServiceService } from  './app-service.service';
import { CoursesComponent } from './courses/courses.component';
import { TutorsComponent } from './tutors/tutors.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { CourseComponent } from './course/course.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AuthGuard } from './core/auth.guard';
export const firebaseConfig = environment.firebaseConfig;

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'tutors', component: TutorsComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'userpage', component: UserPageComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    UserPageComponent,
    CoursesComponent,
    TutorsComponent,
    WorkshopsComponent,
    CourseComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes /*, { enableTracing: true }*/), // <-- debugging purposes only
    BrowserModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [AuthService, AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

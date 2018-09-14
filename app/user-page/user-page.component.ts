import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {

    console.log("Current User : "+ this.auth.getUser().displayName);
  }
}

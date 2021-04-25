import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();
  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userToken : User = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if(userToken){
      this.authService.currentUser = userToken;
      this.authService.changeMemberPhoto(userToken.photoUrl)
    }
  }

  
}

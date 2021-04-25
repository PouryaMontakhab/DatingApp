import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any= {};
  photoUrl : string;
  constructor(public authService : AuthService,
              private alertService : AlertifyService,
              private router  : Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{
      this.alertService.success("user logged in successfully");
    },error =>{
      this.alertService.error(error);
    }, () =>{
      this.router.navigate(['/members']);
    })
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    this.authService.logout();
    this.alertService. message('logout user');
    this.router.navigate(['/home']);

  }


}

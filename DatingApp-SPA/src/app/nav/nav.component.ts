import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any= {};
  constructor(public authService : AuthService,private alertService : AlertifyService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{
      this.alertService.success("user logged in successfully");
    },error =>{
      this.alertService.error(error);
    })
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertService. message('logout user');
  }


}

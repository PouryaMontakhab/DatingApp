import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any= {};
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next =>{
      console.log("user logged in successfully");
    },error =>{
      console.log("user logged in unsuccessfull");
    })
  }

  loggedIn(){
    let token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
  }


}

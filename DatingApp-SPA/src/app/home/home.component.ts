import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values :any;
  constructor(private http:HttpClient,public authService:AuthService) { }

  ngOnInit() {
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

 
}

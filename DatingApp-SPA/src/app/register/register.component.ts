import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};
  @Input() ValueFromHome :any;
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe((response) =>{
      console.log('register successfull');
    },error =>{console.log(error)});
    console.log(this.model);
  }

  cancel(){
  }

}

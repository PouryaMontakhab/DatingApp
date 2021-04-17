import { Component, Input, OnInit } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};
  @Input() ValueFromHome :any;
  constructor(private authService : AuthService , private alertService : AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe((response) =>{
      this.alertService.success('register successfull');
    },error =>{this.alertService.error(error)});
  }

  cancel(){
  }

}

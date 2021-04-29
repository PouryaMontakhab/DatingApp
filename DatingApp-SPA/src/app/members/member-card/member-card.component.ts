import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user:User;
  constructor(private authService : AuthService , private userService : UserService , private alertService : AlertifyService) { }

  ngOnInit() {

  }

  sendLike(recipientId:number){
    this.userService.sendLike(this.authService.decodedToken.nameid, recipientId).subscribe(data =>{
      this.alertService.success("You have liked :" + this.user.knownAs);
    },error =>{
      this.alertService.error(error);
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {

  @Input() recipientId:number;
  newMessage:any={};
  messages : Message[];
  constructor(private authService :AuthService , private userService : UserService , private alertService : AlertifyService) { }

  ngOnInit() {
    this.loadMessage()
  }

  loadMessage(){
    const currentUser = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid , this.recipientId)
    .pipe(
      tap(messages =>{
        debugger;
        for (let i = 0; i < messages.length; i++) {
          if(messages[i].isRead === false && messages[i].recipientId === currentUser){
            this.userService.markAsRead(currentUser , messages[i].id)
          }          
        }
      })
    ).subscribe(messages =>{
      this.messages = messages;
    },error =>{
      this.alertService.error(error);
    })
  }

  sendMessage(){
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid,this.newMessage)
    .subscribe((message : Message) =>{
      this.messages.unshift(message);
      this.newMessage.content = '';
    },error =>{this.alertService.error(error)});
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-Messages',
  templateUrl: './Messages.component.html',
  styleUrls: ['./Messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private authService : AuthService , private userService : UserService , private alertService : AlertifyService , private route : ActivatedRoute) { }
  messages : Message[];
  pagination : Pagination;
  messageContainer = 'Unread';
  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    })
    }

    pageChanged(event : any) : void{
      this.pagination.currentPage = event.page;

    }

    loadMessages(){
      this.userService.getMessages(this.authService.decodedToken.nameid , this.pagination.currentPage , this.pagination.itemsPerPage,this.messageContainer)
      .subscribe((res : PaginatedResult<Message[]>) =>{
        this.messages = res.result;
        this.pagination = res.pagination;
      },error => {
        this.alertService.error(error);
      })
    }

    deleteMessage(id:number){
      this.alertService.confirm("Are you sure you want to delete this message ?" , ()=>{
        this.userService.deleteMessage(id,this.authService.decodedToken.nameid).subscribe((res)=>{
          this.messages.splice(this.messages.findIndex(m => m.id == id),1);
          this.alertService.success('Message has been deleted');
        },error =>{this.alertService.error(error)})
      })
    }

}

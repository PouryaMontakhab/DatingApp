import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm')  editForm:NgForm;
    user:User;
    photoUrl : string;


  constructor(private route : ActivatedRoute,private userService :UserService , private authService : AuthService,private alertService:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user']
    })
    this.authService.currentPhotoUrl.subscribe(photoUrl =>{this.photoUrl = photoUrl});
  }

  UpdateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user)
    .subscribe(data =>{
      this.alertService.success("data Updated Successfully");
      this.editForm.reset(this.user);
    },error =>{
      this.alertService.error(error)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_Services/alertify.service';
import { UserService } from '../../_Services/user.service';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.scss']
})
export class MemberListComponent implements OnInit {

  constructor(private userService : UserService , alertService : AlertifyService,private router : ActivatedRoute) { }
  users : User[];
  ngOnInit() {
    this.router.data.subscribe(data =>{
      this.users = data['users']
    })
  }

  // getUsers (){
  //   return this.userService.getUsers().subscribe((res)=>{
  //     this.users = res;
  //   },error => {console.log(error)});
  // }

}

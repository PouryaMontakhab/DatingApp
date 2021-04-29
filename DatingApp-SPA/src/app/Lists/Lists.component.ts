import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../_models/Pagination';
import { User } from '../_models/user';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-Lists',
  templateUrl: './Lists.component.html',
  styleUrls: ['./Lists.component.scss']
})
export class ListsComponent implements OnInit {

  users : User[];
  pagination : Pagination;
  likeParams : string;

  constructor(private authService : AuthService ,
              private userService : UserService ,
              private alertService : AlertifyService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;

    })
    this.likeParams = 'liker';
  }

  getUsers (){
    return this.userService.getUsers(this.pagination.currentPage , this.pagination.itemsPerPage,null,this.likeParams).subscribe((res)=>{
      this.users = res.result;
      this.pagination = res.pagination;
    },error => {console.log(error)});
  }

  pageChanged(event : any ) :void{
    this.pagination.currentPage = event.page;
    this.getUsers();
  }


}

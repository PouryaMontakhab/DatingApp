import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { even } from '@rxweb/reactive-form-validators';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_Services/alertify.service';
import { UserService } from '../../_Services/user.service';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.scss']
})
export class MemberListComponent implements OnInit {

  constructor(private userService : UserService , private alertService : AlertifyService,private router : ActivatedRoute) { }
  users : User[];
  user : User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value :"male" , Display:"Males"} , {value : "female" , Display : "Females"}];
  userParams : any ={};
  pagination : Pagination;
  ngOnInit() {
    this.router.data.subscribe(data =>{
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    })

    this.userParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userParams.minAge = 18 ; 
    this.userParams.maxAge = 99;
  }

  resetFilters(){
    this.userParams.gender = this.user.gender ==='female' ? 'male' : 'female';
    this.userParams.minAge = 18 ; 
    this.userParams.maxAge = 99;
    this.getUsers();
  }

  pageChanged(event : any ) :void{
    this.pagination.currentPage = event.page;
    this.getUsers();
  }


  getUsers (){
    return this.userService.getUsers(this.pagination.currentPage , this.pagination.itemsPerPage,this.userParams).subscribe((res)=>{
      this.users = res.result;
      this.pagination = res.pagination;
    },error => {console.log(error)});
  }

}

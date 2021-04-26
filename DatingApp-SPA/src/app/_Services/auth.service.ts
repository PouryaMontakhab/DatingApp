import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl:string=environment.apiUrl + 'auth/';
decodedToken : any;
currentUser : User;
photoUrl = new BehaviorSubject<string>("");
currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http : HttpClient) { }
jwtHelper = new JwtHelperService();

changeMemberPhoto(photoUrl:string){
  this.photoUrl.next(photoUrl);
}

login(model:any){
  return this.http.post(this.baseUrl + 'login',model).pipe(
    map((response :any) =>{
      const user = response;
      if(user){
        localStorage.setItem('token',user.token);
        localStorage.setItem('user',JSON.stringify(user.userToken));
        this.currentUser = user.userToken;
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.changeMemberPhoto(this.currentUser.photoUrl);
      }
    })
  )
}

register(user:User){
  return this.http.post(this.baseUrl + 'register',user);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}


logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.currentUser = null;
  this.decodedToken=null;
}

}

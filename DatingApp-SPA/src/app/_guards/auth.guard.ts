import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService ,
              private router:Router,
              private alertService : AlertifyService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean  {
   if(this.authService.loggedIn())
     {
       return true;
     }
     
     this.alertService.error("You should be login first");
     this.router.navigate(['/home']);
     return false;
  }
  
}

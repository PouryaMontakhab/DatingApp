import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_Services/alertify.service";
import { AuthService } from "../_Services/auth.service";
import { UserService } from "../_Services/user.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService : UserService , private alertService : AlertifyService, private router:Router, private authService : AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertService.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
    
}
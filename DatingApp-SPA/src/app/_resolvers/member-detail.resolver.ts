import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_Services/alertify.service";
import { UserService } from "../_Services/user.service";

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService : UserService , private alertService : AlertifyService, private router:Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertService.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
    
}
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/message";
import { User } from "../_models/user";
import { AlertifyService } from "../_Services/alertify.service";
import { AuthService } from "../_Services/auth.service";
import { UserService } from "../_Services/user.service";

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1 ;
    pageSize = 5;
    messgeContainer = 'Unread';
    constructor(private userService : UserService , private alertService : AlertifyService, private router:Router , private authService : AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,this.pageNumber, this.pageSize,this.messgeContainer).pipe(
            catchError(error => {
                this.alertService.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
    
}
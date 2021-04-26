export class UserForRegister{
    Username:string;
    Password:string;
    ConfirmedPassword:string;
    constructor(private username=username, private password=password,private confirmedPassword=confirmedPassword){}
}
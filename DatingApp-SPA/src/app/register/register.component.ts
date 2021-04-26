import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { UserForRegister } from '../_models/UserForRegister';
import { AlertifyService } from '../_Services/alertify.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : User;
  userForRegisterFormModel : UserForRegister;
  bsConfig: Partial<BsDatepickerConfig>;
  @Input() ValueFromHome :any;
  registerForm : FormGroup;
  constructor(public authService : AuthService 
    , private alertService : AlertifyService 
    , private router : Router
    , private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass : 'theme-red'
    }
  }

  createRegisterForm(){
    this. registerForm = new FormGroup({
      username : new FormControl('',Validators.required),
      knownAs : new FormControl('',Validators.required),
      dateOfBirth : new FormControl(null,Validators.required),
      city : new FormControl('',Validators.required),
      country : new FormControl('',Validators.required),
      gender : new FormControl('',Validators.required),
      password : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword : new FormControl('',Validators.required),
    },this.passwordMatchValidator)
  }
  passwordMatchValidator(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null  : {'mismatch' : true}
  }

  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({},this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertService.success("Register was successfull . ");
      }
      ,error =>
      {
        this.alertService.error(error)
      },() =>{
        this.authService.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        })
      })
    }
  }

  cancel(){
  }

}

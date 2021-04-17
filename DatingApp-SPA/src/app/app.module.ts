import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';



import { AppComponent } from './app.component';
import { ValueComponent } from './Value/Value.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_Services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_Services/error.interceptor';
import { AlertifyService } from './_Services/alertify.service';


@NgModule({
  declarations: [				
    AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxFontAwesomeModule,
    BsDropdownModule.forRoot()

  ],
  providers: [AuthService,
              AlertifyService,
              ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

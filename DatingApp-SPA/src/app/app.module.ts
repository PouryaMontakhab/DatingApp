import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import {TabsModule} from 'ngx-bootstrap/tabs';



import { AppComponent } from './app.component';
import { ValueComponent } from './Value/Value.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_Services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_Services/error.interceptor';
import { AlertifyService } from './_Services/alertify.service';
import { ListsComponent } from './Lists/Lists.component';
import { MessagesComponent } from './Messages/Messages.component';
import { MemberListComponent } from './members/MemberList/MemberList.component';
import { RouterModule } from '@angular/router';
import { appRoute } from './route';
import { MemberCardComponent } from './members/MemberList/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/MemberList/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

export function tokenGetter(){
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [							
    AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxFontAwesomeModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoute),
    JwtModule.forRoot({
      config : {
        tokenGetter : tokenGetter,
        whitelistedDomains :['localhost:5000'],
        blacklistedRoutes : ['localhost:5000/api/auth']
      }
    })

  ],
  providers: [AuthService,
              AlertifyService,
              ErrorInterceptorProvider,
              MemberDetailResolver,
              MemberListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

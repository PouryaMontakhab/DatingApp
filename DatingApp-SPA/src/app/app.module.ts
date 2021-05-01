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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/member-edit.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { listsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessageComponent } from './members/member-message/member-message.component';





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
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      MemberMessageComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgxFontAwesomeModule,
    NgxGalleryModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoute),
    TimeagoModule.forRoot(),
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
              PreventUnsavedChanges,
              MemberDetailResolver,
              MemberListResolver,
              MemberEditResolver,
              listsResolver,
              MessagesResolver
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

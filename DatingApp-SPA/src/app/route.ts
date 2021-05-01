import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./Lists/Lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListComponent } from "./members/MemberList/MemberList.component";
import { MessagesComponent } from "./Messages/Messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChanges } from "./_guards/member-edit.guard";
import { listsResolver } from "./_resolvers/lists.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MessagesResolver } from "./_resolvers/messages.resolver";

export const appRoute : Routes = [
    {path:'' , component : HomeComponent},
    {path : '' , 
    runGuardsAndResolvers :'always' ,
    canActivate : [AuthGuard],
    children : [
        {path:"members" , component : MemberListComponent,
            resolve : {users : MemberListResolver}},
        {path:"members/:id" , component : MemberDetailComponent,
            resolve: {user : MemberDetailResolver}},
        {path:"member/edit" , component : MemberEditComponent,
            resolve: {user : MemberEditResolver},canDeactivate : [PreventUnsavedChanges]},
        {path:"messages" , component : MessagesComponent , resolve : {messages : MessagesResolver}},
        {path:"lists" , component : ListsComponent , resolve :{users : listsResolver}}
    ] },
    {path:"**" , redirectTo : '' , pathMatch:'full'},

]
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./Lists/Lists.component";
import { MemberListComponent } from "./MemberList/MemberList.component";
import { MessagesComponent } from "./Messages/Messages.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoute : Routes = [
    {path:'' , component : HomeComponent},
    {path : '' , 
    runGuardsAndResolvers :'always' ,
    canActivate : [AuthGuard],
    children : [
        {path:"members" , component : MemberListComponent},
        {path:"messages" , component : MessagesComponent},
        {path:"lists" , component : ListsComponent}
    ] },
    {path:"**" , redirectTo : '' , pathMatch:'full'},

]
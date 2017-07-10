import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";

const appRoute = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [
  RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

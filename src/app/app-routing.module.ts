import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { UpdateprofileComponent } from "./updateprofile/updateprofile.component";
import { AddjobComponent } from "./addjob/addjob.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'updateprofile', component: UpdateprofileComponent, canActivate: [AuthGuard] },
  { path: 'addjobs', component: AddjobComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

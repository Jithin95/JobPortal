import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { ContentComponent } from './home/content/content.component';

import { JobdataService } from './services/jobdata.service';
import { ApidataService } from './services/apidata.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { NgxSpinnerModule } from 'ngx-spinner';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AddjobComponent } from './addjob/addjob.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JobupdateComponent } from './jobupdate/jobupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ContentComponent,
    PagenotfoundComponent,
    UpdateprofileComponent,
    AddjobComponent,
    JobdetailComponent,
    JobupdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [JobdataService, ApidataService, AuthGuard,
        {
            provide : HTTP_INTERCEPTORS,
            useClass : TokenInterceptorService,
            multi : true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

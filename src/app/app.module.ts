import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '../app/httpInterceptor/auth.interceptor';
import { LoginComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidenavListComponent } from './nav-bar/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './nav-bar/header/header.component';
import { NavbarService } from './nav-bar/navbar.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule,   
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule, 
    MaterialModule,
    FlexLayoutModule,
    Ng2TelInputModule,
    HttpClientModule

  ],
  declarations: [ AppComponent, SignUpComponent, LoginComponent, NavBarComponent, SidenavListComponent, HeaderComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    NavbarService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

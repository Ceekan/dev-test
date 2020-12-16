import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from 'app/app-routing.module';

import { AppComponent } from 'app/app.component';
import { NavbarComponent } from 'app/layout/navbar/navbar.component';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [AppComponent, NavbarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

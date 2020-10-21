import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {MyHomePageComponent} from './pages/my-home-page';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {RouterModule} from "@angular/router";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InscriptionModalComponent} from "./modal/inscription-modal/inscription-modal.component";
import {HeaderComponent} from "./header/header.component";
import {HomeBodyComponent} from "./home/home-body";
import {ConnexionModalComponent} from "./modal/connexion-modal/connexion-modal.component";
import {ReservationsPageComponent} from "./pages/reservations-page";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MyHomePageComponent,
    InscriptionModalComponent,
    ConnexionModalComponent,
    HeaderComponent,
    HomeBodyComponent,
    ReservationsPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    LoadingBarHttpClientModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ScrollingModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    // FontAwesomeModule,
    ReactiveFormsModule // Import all dependencies
  ],
  providers: [NgbTabsetConfig],
  entryComponents: [InscriptionModalComponent,ConnexionModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

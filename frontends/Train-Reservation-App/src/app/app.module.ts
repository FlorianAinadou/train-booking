import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {MyHomePageComponent} from './pages/my-home-page';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {RouterModule} from '@angular/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InscriptionModalComponent} from './modal/inscription-modal/inscription-modal.component';
import {HeaderComponent} from './header/header.component';
import {HomeBodyComponent} from './home/home-body';
import {ConnexionModalComponent} from './modal/connexion-modal/connexion-modal.component';
import {ReservationsPageComponent} from './pages/reservations-page';
import {ReservationsFilterPageComponent} from './pages/reservations-filter-page';
import {ReservationResultComponent} from './reservation-result/reservations/reservation-result';
import {ReservationResultListComponent} from './reservation-result/reservations/reservation-result-list';
import {ReservationsDisplayPageComponent} from './pages/reservations-display-page';
import {UserService} from '../services/user/user.service';
import {ReservationService} from '../services/reservation/reservation.service';
import {ReservationsTicketPageComponent} from './pages/reservations-ticket-page';
import {ReservationTicketResultComponent} from './reservation-result/reservations/reservation-ticket-result';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {MessagingService} from '../services/messaging/messaging.service';
import {AsyncPipe} from '@angular/common';
import {ServiceWorkerModule} from '@angular/service-worker';
import {PushNotificationService} from "../services/notifications/pushNotification.service";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MyHomePageComponent,
    InscriptionModalComponent,
    ConnexionModalComponent,
    HeaderComponent,
    HomeBodyComponent,
    ReservationsPageComponent,
    ReservationsFilterPageComponent,
    ReservationResultComponent,
    ReservationResultListComponent,
    ReservationsDisplayPageComponent,
    ReservationsTicketPageComponent,
    ReservationTicketResultComponent
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
    ReactiveFormsModule, // Import all dependencies
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [NgbTabsetConfig, UserService, ReservationService, MessagingService, AsyncPipe, PushNotificationService],
  entryComponents: [InscriptionModalComponent, ConnexionModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

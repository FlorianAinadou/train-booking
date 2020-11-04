import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {MyHomePageComponent} from "./pages/my-home-page";
import {HomeBodyComponent} from "./home/home-body";
import {ReservationsPageComponent} from "./pages/reservations-page";
import {ReservationsDisplayPageComponent} from "./pages/reservations-display-page";
import {ReservationsTicketPageComponent} from "./pages/reservations-ticket-page";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'Home', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home', component: MyHomePageComponent,
    children: [
      {path: '', component: HomeBodyComponent},
      // {path: 'home', component: HomeBodyComponent},
      // {path: '', redirectTo: 'home'},
      // {path: 'home/reservations', component: ReservationsFilterPageComponent},
      {path: 'reservations', component: ReservationsPageComponent},
      {path: 'displayReservations', component: ReservationsDisplayPageComponent},
      {path: 'tickets', component: ReservationsTicketPageComponent},
      {path: '**', redirectTo: '/404'},
      {path: '404', component: NotFoundPageComponent},
    ]
  },
  // {path: 'horeservations', component: ReservationsFilterPageComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundPageComponent},
];


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class AppRoutingModule {
}

import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Reservation} from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {Ticket} from "../../../models/ticket";
import {UserService} from "../../../services/user/user.service";
import {CurrencyPipe, DatePipe, DecimalPipe} from "@angular/common";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './reservations-ticket-page.component.html',
  styleUrls: ['./reservations-ticket-page.component.scss'],
  providers: [DatePipe]
})


export class ReservationsTicketPageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  emptyList = true;
  propositions: Ticket[] = [];


  constructor(public reservationService: ReservationService, public userService: UserService, public router: Router,
              private _date: DatePipe) {
    // this.loadReservation();
    this.reservationService.getMyReservationPaidList2();
    this.reservationService.reservation$.subscribe(async (res) => {
      this.propositions = [];
      for (let entry of res) {
        let routes = [];
        let price = 0;
        this.reservationService.getTrainById(entry["trainId"]).subscribe(re => {
          routes = re[0]["routes"];
          price = re[0]["price"];
          let r: Ticket = {
            price: price.toString(),
            seats: entry["placeNumber"],
            id: entry["bookingId"],
            routes: routes,
            name: this.userService.getCurrentUserName(),
            date: this._date.transform(re[0]["date"], 'dd.MM.yyyy HH:mm')
          };

          if (!(this.propositions.find(x =>
            x.id.toString().localeCompare(r.id.toString()) === 0))) {
            this.propositions.push(r);
          }
        }, error => {

        });
      }

      if (res.length > 0) {
        this.emptyList = false;
      }
    });
    document.body.style.backgroundColor = '#fff';
  }

  ngOnInit() {
    // this.reservationService.getMyReservationPaidList2();
  }

  async loadReservation() {
    this.propositions = [];
    this.reservationService.getMyReservationPaidList().subscribe(async res => {
      alert(res.length);
      for (let entry of res) {
        let routes = [];
        let price = 0;
        this.reservationService.getTrainById(entry["trainId"]).subscribe(re => {
          routes = re[0]["routes"];
          price = re[0]["price"];
          let r: Ticket = {
            price: price.toString(),
            seats: entry["placeNumber"],
            id: entry["bookingId"],
            routes: routes,
            name: this.userService.getCurrentUserName(),
            date: this._date.transform(re[0]["date"], 'dd.MM.yyyy HH:mm')
          };
          this.propositions.push(r);
        }, error => {

        });
      }

      if (res.length > 0) {
        this.emptyList = false;
      }
    }, error => {

    });
  }
}

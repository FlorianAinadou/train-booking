import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reservation} from "../../../../models/reservation";
import {Ticket} from "../../../../models/ticket";
// import {Contrat} from '../../../../models/contrat';
// import {ContratService} from '../../../../services/contrat/contrat.service.';

@Component({
  selector: 'app-reservation-ticket-result',
  templateUrl: './reservation-ticket-result.component.html',
  styleUrls: ['./reservation-ticket-result.component.scss']
})

export class ReservationTicketResultComponent implements OnInit,AfterViewInit {

  @Input()
  reservation: Ticket;
  //
  // output
  @Output() OnSelect = new EventEmitter<Reservation>();
  private obj: any;

  img = ["4-49353_fast-train-png-clipart-transparent-trains-png.png", "146-1467979_subway-clipart-maglev-train-maglev-train-transparent-background.png", "images.png", "327-3276254_high-speed-rail-png-download-high-speed-rail.png"];
  i = 0;
  // output
  // @Output() OnSelect = new EventEmitter<Contrat>();


  constructor() {
    this.i = Math.floor(Math.random() * 4) + 1;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  select() {
    console.log("event");
    this.OnSelect.emit(this.reservation);
  }


}

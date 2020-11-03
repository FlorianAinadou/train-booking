import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {Reservation} from "../../../models/reservation";
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-display-page.component.html',
  styleUrls: ['./reservations-display-page..component.scss']
})


export class ReservationsDisplayPageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  emptyList = true;
  propositions: Reservation[] = [];


  constructor(public reservationService: ReservationService, public router: Router) {
    this.loadReservation();
    document.body.style.backgroundColor = '#fff';
  }


  ngOnInit() {

  }

  async loadReservation() {
    // this.reservationService.getTrainById("5f9297120d970f0372d2af47").subscribe( re => {
    //   console.log("train");
    //   console.log(re);
    //   // alert(price);
    // }, error => {
    //
    // });

    this.reservationService.getMyReservationList().subscribe(async res => {
      for (let entry of res) {
        // console.table(entry);
        let routes = [];
        let price = 0;

        this.reservationService.getTrainById(entry["trainId"]).subscribe(re => {
          routes = re[0]["routes"];
          price = re[0]["price"];
          let r: Reservation = {
            price: price.toString(),
            seats: entry["placeNumber"],
            id: entry["bookingId"],
            routes: routes
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

  removeReservation(reservation) {
    this.reservationService.removeReservation(reservation.id).subscribe(re => {
      this.propositions = this.propositions.filter(({id}) => id !== reservation.id);
      if(this.propositions.length == 0){
        this.emptyList = true;
      }
    }, error => {

    });
  }

}

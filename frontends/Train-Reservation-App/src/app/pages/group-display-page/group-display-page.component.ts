import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-group-page',
  templateUrl: './group-display-page.component.html',
  styleUrls: ['./group-display-page.component.scss']
})


export class GroupDisplayPageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  emptyList = true;
  // propositions: Reservation[] = [];


  constructor(public reservationService: ReservationService, public router: Router) {
    document.body.style.backgroundColor = '#fff';
  }


  ngOnInit() {

  }

}

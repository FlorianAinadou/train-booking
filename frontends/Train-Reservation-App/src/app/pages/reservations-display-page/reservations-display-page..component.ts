import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-display-page.component.html',
  styleUrls: ['./reservations-display-page..component.scss']
})


export class ReservationsDisplayPageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;




  constructor(public userService: UserService, public router: Router) {


  }


  ngOnInit() {

  }

}

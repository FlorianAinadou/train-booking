import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {TeamsService} from "../../teams.service";

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
  teams = [];


  constructor(private teamsService: TeamsService ,public reservationService: ReservationService, public router: Router, config: NgbTabsetConfig) {
    document.body.style.backgroundColor = '#fff';

    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
  }


  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teams = this.teamsService.getTeams();
  }
}

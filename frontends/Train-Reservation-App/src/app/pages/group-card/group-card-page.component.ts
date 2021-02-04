import {AfterViewInit, Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
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
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card-page.component.html',
  styleUrls: ['./group-card-page.component.scss']
})


export class GroupCardPageComponent implements OnInit, AfterViewInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  emptyList = true;
  @ViewChild('prog') progress;
  tab = ["a", "b", "c", "d", "e"];
  tof: string[] = ["https://randomuser.me/api/portraits/women/9.jpg"];
  // var nums:number[] = [1,2,3,3]

  private value: number;

  constructor(private teamsService: TeamsService, public reservationService: ReservationService, public router: Router, config: NgbTabsetConfig, private sanitizer: DomSanitizer) {
    document.body.style.backgroundColor = '#fff';
    // customize default values of tabsets used by this component tree


  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.content.nativeElement.classList.add('fade');
    // this.content.nativeElement.classList.add('right');
    // this.overlay.nativeElement.classList.toggle('menu-open');
    // const hamburgerClick = this.renderer.listen(this.hamburger.nativeElement, 'click', (evt) => {
    // console.log('Clicking the button', evt); boolAdmin
    // if (this.changeIcon) {
    //   this.icon.nativeElement.classList.remove('fa-bars');
    this.progress.nativeElement.classList.add('progess2');
    // console.table(this.tof);
    // this.tab.forEach(function (value) {
    //   // console.log(v);
    //   const a = Math.floor((Math.random() * 100) + 1);
    //   alert(a);
    //   this.tof.push("https://randomuser.me/api/portraits/women/" + a.toString() + ".jpg");
    // });
    // this.changeIcon = false;
    // this.effect.nativeElement.classList.toggle('collapsed');
    // this.filterHidden = true;
    // } else {
    //   this.icon.nativeElement.classList.remove('fa-times');
    //   this.icon.nativeElement.classList.add('fa-bars');
    //   this.changeIcon = true;
    //   this.effect.nativeElement.classList.toggle('collapsed');
    //   setTimeout(() => {
    //     this.filterHidden = false;
    //   }, 300);
    // }
    // });
  }
}

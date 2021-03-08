import {AfterViewInit, Component, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";
import {Reservation} from "../../../models/reservation";
import {Groups} from "../../../models/groups";

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
  @Input()
  group: Groups;

  constructor( public reservationService: ReservationService, public router: Router, config: NgbTabsetConfig, private sanitizer: DomSanitizer) {
    document.body.style.backgroundColor = '#fff';
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
    switch (this.group.usersnames.length) {
      case 1:
        this.progress.nativeElement.classList.add('progess1');
        break;
      case 2:
        this.progress.nativeElement.classList.add('progess2');
        break;
      case 3:
        this.progress.nativeElement.classList.add('progess3');
        break;
      case 4:
        this.progress.nativeElement.classList.add('progess4');
        break;
      case 5:
        this.progress.nativeElement.classList.add('progess5');
        break;
      case 6:
        this.progress.nativeElement.classList.add('progess6');
        break;
      case 7:
        this.progress.nativeElement.classList.add('progess7');
        break;
      case 8:
        this.progress.nativeElement.classList.add('progess8');
        break;
      case 9:
        this.progress.nativeElement.classList.add('progess9');
        break;
      case 10:
        this.progress.nativeElement.classList.add('progess10');
        break;
      default:
        break;
    }


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

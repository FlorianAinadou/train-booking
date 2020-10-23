import {AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {Reservation} from "../../../models/reservation";

@Component({
  selector: 'app-reservations-filter-page',
  templateUrl: './reservations-filter-page.component.html',
  styleUrls: ['./reservations-filter-page..component.scss']
})


export class ReservationsFilterPageComponent implements OnInit,AfterViewInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  @ViewChild('imp') imp;
  @ViewChild('l') l;

  propositions: Reservation[] = [];
  display = false;
  text = "Search";

  constructor(public userService: UserService, public router: Router,private renderer: Renderer2) {




  }


  ngOnInit() {

  }


  ngAfterViewInit() {
    // this.content.nativeElement.classList.add('fade');
    // this.content.nativeElement.classList.add('right');
    // this.overlay.nativeElement.classList.toggle('menu-open')
    const hamburgerClick = this.renderer.listen(this.imp.nativeElement, 'focusout', (evt) => {
      // console.log('Clicking the button', evt); boolAdmin
      // alert("a");
      this.imp.nativeElement.classList.add('has-content');

      // if (this.imp.val())
      // this.overlay.nativeElement.classList.toggle('menu-open');
      // this.nav.nativeElement.classList.toggle('menu-open');
      // if (this.changeIcon) {
      //   this.icon.nativeElement.classList.remove('fa-bars');
      //   this.imp.nativeElement.classList.add('has-content');
      //   this.changeIcon = false;
      // } else {
      //   this.icon.nativeElement.classList.remove('fa-times');
      //   this.icon.nativeElement.classList.add('fa-bars');
      //   this.changeIcon = true;
      // }
    });
  }

  search(){
    if(this.text=="Search"){
      let r: Reservation = {
        price: "10",
        seats: "5",
        id: "45555"
      };

      let re: Reservation = {
        price: "19",
        seats: "4",
        id: "45555"
      };

      this.propositions.push(r);
      this.propositions.push(re);
      this.propositions.push(re);
      this.propositions.push(re);

      this.display = true;
      this.l.nativeElement.classList.add('large');
       this.text = "Clear";
    }else {
      this.text = "Search";
      this.propositions = [];
      this.display = false;
      this.l.nativeElement.classList.remove('large');
    }


    // console.table(this.propositions);
  }

  selectReservation(reservation){

  }
}

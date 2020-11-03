import {AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {Reservation} from "../../../models/reservation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-reservations-filter-page',
  templateUrl: './reservations-filter-page.component.html',
  styleUrls: ['./reservations-filter-page..component.scss']
})


export class ReservationsFilterPageComponent implements OnInit, AfterViewInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  @ViewChild('imp') imp;
  @ViewChild('l') l;
  public searchForm: FormGroup;
  formSubmitted = false;

  propositions: Reservation[] = [];
  display = false;
  text = "Search";

  constructor(public userService: UserService, public router: Router, private renderer: Renderer2, public formBuilder: FormBuilder, public reservationService: ReservationService) {
    this.searchForm = this.formBuilder.group({
      d: ['', Validators.required],
      a: ['', Validators.required]
    });
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

  search() {
    this.formSubmitted = true;
    if (this.text == "Search") {
      if (this.searchForm.invalid) {
        return;
      } else {

        const departure = this.searchForm.get('d').value;
        const arrival = this.searchForm.get('a').value;

        this.reservationService.getReservationResult(departure, arrival).subscribe(res => {
          for (let entry of res) {
            // console.table(entry);
            let r: Reservation = {
              price: entry["price"],
              seats: entry["remainingSeats"],
              id: entry["_id"],
              routes: entry["routes"]
            };
            this.propositions.push(r);
          }
          if (res.length > 0) {
            this.display = true;
            this.l.nativeElement.classList.add('large');
            this.text = "Clear";
          } else {
            alert("Aucun trajet n'est disponible pour le moment....😣");
          }
        }, error => {

        });
      }
    } else {
      this.text = "Search";
      this.propositions = [];
      this.display = false;
      this.l.nativeElement.classList.remove('large');
    }


    // console.table(this.propositions);
  }

  get g() {
    return this.searchForm.controls;
  }

  selectReservation(reservation) {
    console.table(reservation);
    this.reservationService.addReservation(reservation.id).subscribe(res => {
      console.log("Id " + res);
    }, error => {

    });
  }
}

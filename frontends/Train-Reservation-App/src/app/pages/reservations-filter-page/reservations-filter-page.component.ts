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
import {Groups} from "../../../models/groups";
import {GroupsService} from "../../../services/groups/groups.service";

@Component({
  selector: 'app-reservations-filter-page',
  templateUrl: './reservations-filter-page.component.html',
  styleUrls: ['./reservations-filter-page.component.scss']
})


export class ReservationsFilterPageComponent implements OnInit, AfterViewInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  @ViewChild('imp') imp;
  @ViewChild('l') l;
  public searchForm: FormGroup;
  formSubmitted = false;
  alert: Alert[] = [];
  alertSuccess: Alert[] = [];

  propositions: Reservation[] = [];
  groupList: Groups[] = [];
  display = false;
  text = "Search";

  constructor(public userService: UserService, public groupService: GroupsService, public router: Router, private renderer: Renderer2, public formBuilder: FormBuilder, public reservationService: ReservationService) {
    this.searchForm = this.formBuilder.group({
      d: ['', Validators.required],
      a: ['', Validators.required]
    });
    this.groupService.getMyGroups().subscribe(res => {
      let compt = 1;
      for (const entry of res) {
        const r: Groups = {
          groupName: entry.groupName,
          id: entry._id,
          usersnames: entry.usersnames,
          travelsNumber: entry.travelsNumber,
          pictures: [],
          title: "Group " + compt.toString()
        };
        r.usersnames.forEach(function (value) {
          const a = Math.floor((Math.random() * 95) + 1);
          //   alert(a);
          r.pictures.push('https://randomuser.me/api/portraits/men/' + a.toString() + '.jpg');
        });
        this.groupList.push(r);
        compt = compt + 1;
      }
    }, error => {

    });
    this.alert.push({'type': 'danger', 'message': null});
    this.alertSuccess.push({'type': 'success', 'message': null});
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
    this.propositions.find(({id}) => id === reservation.id).seats = (+this.propositions.find(({id}) => id === reservation.id).seats - 1).toString();
    if ((+this.propositions.find(({id}) => id === reservation.id).seats === 0)) {
      this.propositions = this.propositions.filter(({id}) => id !== reservation.id);
    }
    this.reservationService.addReservation(reservation.id).subscribe(res => {
      console.log("Id " + res);
    }, error => {

    });
  }

  selectReservationGroup(data) {
    let nb = data.nb;
    let groupId = data.groupId;
    let reservationId = data.reservationId;
    let price = +this.propositions.find(({id}) => id === reservationId).price * this.groupList.find(({id}) => id === groupId).usersnames.length;
    let placesNumber = [];
    let inc = 0;
    this.groupList.find(({id}) => id === groupId).usersnames.forEach(function (value) {
      placesNumber.push(Date.now().toString()+inc.toString());
      inc++;
    });

    this.reservationService.purchaseGroupReservation(reservationId, price, placesNumber, groupId).subscribe(res => {
      if(res){
        // update seats available number
        this.propositions.find(({id}) => id === reservationId).seats = (+this.propositions.find(({id}) => id === reservationId).seats - nb).toString();
        if ((+this.propositions.find(({id}) => id === reservationId).seats === 0)) {
          this.propositions = this.propositions.filter(({id}) => id !== reservationId);
        }
        this.alertSuccess[0].message = "Payement effectué avec succès !!";
        setTimeout(() => {
          this.alertSuccess[0].message = null;
        }, 2000);
      }else{
        this.alert[0].message = "Votre payement a été refusé !!";
        setTimeout(() => {
          this.alert[0].message = null;
        }, 2000);
      }
    }, error => {
      this.alert[0].message = "Votre payement a été refusé !!";
      setTimeout(() => {
        this.alert[0].message = null;
      }, 2000);
    });
    // console.log("ici");
    // this.propositions.find(({id}) => id === reservation.id).seats = (+this.propositions.find(({id}) => id === reservation.id).seats - 1).toString();
    // alert(data.reservationId);
  }
}

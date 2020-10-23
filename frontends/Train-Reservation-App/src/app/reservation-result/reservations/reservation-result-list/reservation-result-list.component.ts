import {Component, OnInit, Renderer2, ViewChild, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {Reservation} from "../../../../models/reservation";
// import {Contrat} from '../../../../models/contrat';
// import {ContratService} from '../../../../services/contrat/contrat.service.';

@Component({
  selector: 'app-reservation-result-list',
  templateUrl: './reservation-result-list.component.html',
  styleUrls: ['./reservation-result-list.component.scss']
})

export class ReservationResultListComponent implements OnInit, AfterViewInit {

  // numbers: number[] = [];
  //
  // // @Input()
  // reservationsList: Reservation[] = [];
  // @ViewChild('hamburger') hamburger;
  // @ViewChild('icon') icon;
  // @ViewChild('effect') effect;
  // // public contratSelected: Contrat;
  // changeIcon = false;
  // filterHidden = true;
  // n:number;
  // // output
  // display = true;


  constructor(private renderer: Renderer2) {
    // document.body.style.backgroundColor = '#fff';
    // this.contratService.getContrat();
    // this.contratService.contrat$.subscribe((contrat) => {
    //   this.contractList = contrat;
    //   console.log('Ma liste ' + this.contractList.length);
    // });
    // let r: Reservation = {
    //   price: "10",
    //   seats: "5",
    //   id: "45555"
    // };
    //
    // let re: Reservation = {
    //   price: "19",
    //   seats: "4",
    //   id: "45555"
    // };
    //
    // this.reservationsList.push(r);
    // this.reservationsList.push(re);
    // this.reservationsList.push(re);
    // // this.reservationsList.push(re);
    // // this.reservationsList.push(re);
    // // this.reservationsList.push(re);
    //
    // this.display = true;
  }

  ngOnInit() {
    document.body.style.backgroundColor = 'darkgrey';
    // ### Ouvrir le filtre par défaut
  }


  ngAfterViewInit() {
    // const hamburgerClick = this.renderer.listen(this.hamburger.nativeElement, 'click', (evt) => {
    //   if (this.changeIcon) {
    //     this.icon.nativeElement.classList.remove('fa-bars');
    //     this.icon.nativeElement.classList.add('fa-times');
    //     this.changeIcon = false;
    //     this.effect.nativeElement.classList.toggle('collapsed');
    //     this.filterHidden = true;
    //   } else {
    //     this.icon.nativeElement.classList.remove('fa-times');
    //     this.icon.nativeElement.classList.add('fa-bars');
    //     this.changeIcon = true;
    //     this.effect.nativeElement.classList.toggle('collapsed');
    //     setTimeout(() => {
    //       this.filterHidden = false;
    //     }, 300);
    //   }
    // });
    // this.display = true;
  }


  selectReservation(reservation): void {
    // this.contratSelected = contrat;
  }

  contractClosed(): void {
    // this.contratSelected = undefined;
  }

  increment(){
    alert("a");
  }
}

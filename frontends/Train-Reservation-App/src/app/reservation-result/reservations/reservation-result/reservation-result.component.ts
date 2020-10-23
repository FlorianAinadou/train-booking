import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reservation} from "../../../../models/reservation";
// import {Contrat} from '../../../../models/contrat';
// import {ContratService} from '../../../../services/contrat/contrat.service.';

@Component({
  selector: 'app-reservation-result',
  templateUrl: './reservation-result.component.html',
  styleUrls: ['./reservation-result.component.scss']
})

export class ReservationResultComponent implements OnInit,AfterViewInit {

  @Input()
  reservation: Reservation;
  //
  // output
  @Output() OnSelect = new EventEmitter<Reservation>();
  private obj: any;

  // output
  // @Output() OnSelect = new EventEmitter<Contrat>();


  constructor() {
    // document.body.style.backgroundColor = '#fff';
    // this.contratService.getContrat();
    // for (let index = 0; index < 40; index++) {
    //   this.numbers.push(index);
    // }
    // console.table(this.reservation);
    // this.reservation = {
    //   price: "19",
    //   seats: "4",
    //   id: "45555"
    // };

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  // ### Fonction pour archiver/Desarchiver
  archived() {
    // console.log('ARCHIVE');
    // const archivedValue = this.contrat.archived;
    // this.contrat.archived = !archivedValue;
    // this.contrat.validation = 2;
    // const myContract = this.cleanContract();
    // // ### Fin nettoyage
    // this.contractService.updateContrat(this.contrat.id, myContract);
  }


  // ### Création d'un nouvel objet contrat puis nettoyage des valeurs attachés
  cleanContract() {
    // const contract = Object.assign({}, this.obj, this.contrat);
    // delete contract.etudiant;
    // delete contract.universite_etranger;
    // delete contract.universite_origine;
    // delete contract.programme_etranger_Tab;
    // delete contract.programme_origine_Tab;
    // delete contract.responsable_origine;
    // delete contract.responsable_Etranger;
    // // console.log(contract);
    // return contract;
  }

  // ### Selection d'un contrat
  select() {
    // this.OnSelect.emit(this.contrat);
  }

  // ### Validation / Echec d'un contrat
  successOrFailure(validationValue) {
    // const archivedValue = this.contrat.archived;
    // this.contrat.archived = !archivedValue;
    // this.contrat.validation = validationValue;
    // const myContract = this.cleanContract();
    // // ### Fin nettoyage
    // this.contractService.updateContrat(this.contrat.id, myContract);
  }

}

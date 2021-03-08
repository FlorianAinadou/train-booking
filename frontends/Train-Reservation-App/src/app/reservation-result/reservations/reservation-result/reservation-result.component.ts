import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reservation} from "../../../../models/reservation";
import {Groups} from "../../../../models/groups";
import {GroupsService} from "../../../../services/groups/groups.service";
// import {Contrat} from '../../../../models/contrat';
// import {ContratService} from '../../../../services/contrat/contrat.service.';

@Component({
  selector: 'app-reservation-result',
  templateUrl: './reservation-result.component.html',
  styleUrls: ['./reservation-result.component.scss']
})

export class ReservationResultComponent implements OnInit, AfterViewInit {

  @Input()
  reservation: Reservation;
  //
  // output
  @Output() OnSelect = new EventEmitter<Reservation>();
  @Output() OnSelectReservationGroup = new EventEmitter<{ reservationId: string, groupId: string , nb: number}>();
  private obj: any;

  groupList: Groups[] = [];
  groupS: string;

  // output
  // @Output() OnSelect = new EventEmitter<Contrat>();


  constructor(public groupService: GroupsService) {
    // document.body.style.backgroundColor = '#fff';
    // this.contratService.getContrat();
    this.groupS = '';
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
        // tslint:disable-next-line:only-arrow-functions
        r.usersnames.forEach(function (value) {
          const a = Math.floor((Math.random() * 100) + 1);
          //   alert(a);
          r.pictures.push('https://randomuser.me/api/portraits/men/' + a.toString() + '.jpg');
        });
        this.groupList.push(r);
        compt = compt + 1;
      }
    }, error => {

    });

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
    if (this.groupS.length !== 0 && this.groupList.find(({groupName}) => groupName === this.groupS)) {
      if (+this.reservation.seats < this.groupList.find(({groupName}) => groupName === this.groupS).usersnames.length){
        alert("Nombre de places insuffisantes 😣");
      }else {
        this.OnSelectReservationGroup.emit({reservationId: this.reservation.id,
          groupId: this.groupList.find(({groupName}) => groupName === this.groupS).id,
          nb: this.groupList.find(({groupName}) => groupName === this.groupS).usersnames.length });
        this.groupS = '';
      }
    }else{
      this.OnSelect.emit(this.reservation);
    }
    // console.log("event");
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

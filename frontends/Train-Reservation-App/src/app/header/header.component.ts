import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {InscriptionModalComponent} from '../modal/inscription-modal/inscription-modal.component';
import {Subscription} from "rxjs";

// import {ConnexionModalComponent} from '../modal/connexion-modal/connexion-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {


  // public inscriptionForm: FormGroup;
  @Input() userConnected: boolean;
  @Input() userConnectedName: string;
  @Input() authentificationFailedHome = false;
  // output
  @Output() OnConnect = new EventEmitter<string[]>();
  @Output() OnDeconnexion = new EventEmitter<boolean>();
  modalReferenceConnexion: any;
  modalReferenceInscription: any;
  connexionSubmitted = false;

  constructor(private renderer: Renderer2, public formBuilder: FormBuilder,
              private router: Router, private modalService: NgbModal, public userService: UserService) {

    console.log('HEADER ******** Connecté ' + this.userConnected + '  Name  ' + this.userConnectedName);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('Connecté ' + this.userConnected + '  Name  ' + this.userConnectedName + '  animation ' + this.authentificationFailedHome);
    // // Auth réussie
    // if (this.userConnected) {
    //   if (this.modalReferenceConnexion) {
    //     this.modalReferenceConnexion.close();
    //   }
    // }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }


  // Modal de l'inscription
  openInscription() {
    this.modalReferenceInscription = this.modalService.open(InscriptionModalComponent);
    // this.modalReferenceInscription.componentInstance.OnConnect.subscribe(event => {
    //   this.OnConnect.emit(event);
    // });
  }

  /* Fin Script MoDAl */

  deconnexion() {
    // window.scrollTo(0, 0);
    this.OnDeconnexion.emit(true);
  }

  redirect(){
    this.userService.redirectHomePage();
  }

  ngOnDestroy() {

  }

}

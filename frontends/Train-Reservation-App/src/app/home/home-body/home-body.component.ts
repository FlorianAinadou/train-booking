import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../services/user/user.service";
import {ConnexionModalComponent} from "../../modal/connexion-modal/connexion-modal.component";
import { EventEmitter } from '@angular/core';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss']
})

export class HomeBodyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() userConnected: boolean;
  @Input() userConnectedName: string;
  @Input() authentificationFailedHome = false;
  modalReferenceConnexion: any;
  @Output() OnConnect = new EventEmitter<string[]>();
  subscription: Subscription;


  constructor(private renderer: Renderer2, public formBuilder: FormBuilder,
              private router: Router, private modalService: NgbModal, public userService: UserService) {
    this.userConnected = this.userService.getAuth();
    // alert("REP "+this.userConnected);
    if(this.userConnected){
      this.userConnectedName = this.userService.getCurrentUserName();
    }
    this.subscription = this.userService.getData().subscribe(x => {
       if(x=="deconnected"){
         this.userConnected = false;
         this.userConnectedName = "";
       }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Auth réussie
    if (this.userConnected) {
      if (this.modalReferenceConnexion) {
        this.modalReferenceConnexion.close();
      }
    }

  }

  connected(name){
    console.log('called from parent');
    if (this.modalReferenceConnexion) {
      this.modalReferenceConnexion.close();
    }
    this.userConnected = true;
    this.userConnectedName = name;
  }


  openConnexion() {
    this.modalReferenceConnexion = this.modalService.open(ConnexionModalComponent);
    this.modalReferenceConnexion.componentInstance.OnConnect.subscribe(event => {
      this.OnConnect.emit(event);
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}

import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../services/user/user.service";
import {ConnexionModalComponent} from "../../modal/connexion-modal/connexion-modal.component";
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss']
})

export class HomeBodyComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() userConnected: boolean;
  @Input() userConnectedName: string;
  @Input() authentificationFailedHome = false;
  modalReferenceConnexion: any;
  @Output() OnConnect = new EventEmitter<string[]>();

  constructor(private renderer: Renderer2, public formBuilder: FormBuilder,
              private router: Router, private modalService: NgbModal, public userService: UserService) {
    this.userConnected = false;
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

  openConnexion() {
    this.modalReferenceConnexion = this.modalService.open(ConnexionModalComponent);
    this.modalReferenceConnexion.componentInstance.OnConnect.subscribe(event => {
      this.OnConnect.emit(event);
    });
  }

  ngAfterViewInit() {

  }

}

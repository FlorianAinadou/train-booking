import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-connexion-modal',
  templateUrl: './connexion-modal.component.html',
  styleUrls: ['./connexion-modal.component.scss']
})

export class ConnexionModalComponent implements OnInit, OnDestroy {

  public connexionForm: FormGroup;
  public authentificationFailedHomeC = false;
  // output
  @Output() OnConnect = new EventEmitter<string[]>();
  connexionSubmitted = false;

  constructor(public formBuilder: FormBuilder, public activeModal: NgbActiveModal, public userService: UserService) {

    // Formulaire de connexion
    this.connexionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  /* Se connecter */
  connexion() {
    this.connexionSubmitted = true;
    // stop here if form is invalid
    if (this.connexionForm.invalid) {
      return;
    } else {
      const userToCreate: User = this.connexionForm.getRawValue() as User;
      const details = [];
      console.table(userToCreate);
      details.push(userToCreate.email);
      details.push(userToCreate.password);
      this.OnConnect.emit(details);
    }
  }

  get f() {
    return this.connexionForm.controls;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // console.log('Destruction');
    this.connexionForm.reset();
    this.connexionSubmitted = false;
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {NgbActiveModal, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inscription-modal',
  templateUrl: './inscription-modal.component.html',
  styleUrls: ['./inscription-modal.component.scss']
})

export class InscriptionModalComponent implements OnInit, OnDestroy {


  @ViewChild('md') select;
  @ViewChild('close') close;
  public inscriptionFormOne: FormGroup;
  public inscriptionFormTwo: FormGroup;

  // output
  @Output() OnConnect = new EventEmitter<string[]>();
  inscriptionOneSubmitted = false;
  inscriptionTwoSubmitted = false;
  currentJustify: string;
  currentType: string;
  passedOne: boolean;
  passedTwo: boolean;

  // Pourcentage
  public progressValue;


  constructor(config: NgbTabsetConfig, public formBuilder: FormBuilder,
              public activeModal: NgbActiveModal, public userService: UserService, configA: NgbProgressbarConfig,
  ) {

    this.currentJustify = 'center';
    this.currentType = 'pills';
    this.passedOne = false;
    this.passedTwo = true;
    this.progressValue = 2;
    // customize default values of progress bars used by this component tree
    configA.max = 100;
    configA.striped = true;
    configA.animated = true;
    configA.type = 'success';
    configA.height = '20px';


    // Formulaire d'inscription 1
    this.inscriptionFormOne = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    // Formulaire d'inscription 2
    this.inscriptionFormTwo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      nat: ['', Validators.required],
      dateF: ['', Validators.required]
    });
  }

  /*TraitementForm1*/
  inscriptionStepOne() {
    this.inscriptionOneSubmitted = true;
    // stop here if form is invalid
    if (this.inscriptionFormOne.invalid) {
      return;
    } else {
      const ps = this.inscriptionFormOne.get('password').value;
      const cps = this.inscriptionFormOne.get('confirmPassword').value;
      if (!(cps.toString().localeCompare(ps.toString()) === 0)) {
        alert('Les mots de passe ne sont pas identiques !');
      } else {
        this.progressValue = 50;
        this.passedTwo = false;
        const el: HTMLElement = this.select.nativeElement as HTMLElement;
        setTimeout(() => {
          el.click();
        }, 200);
        this.passedOne = true;
      }
    }
  }

  /*TraitementForm2*/
  inscriptionTwo() {
    this.inscriptionTwoSubmitted = true;

    // stop here if form is invalid
    if (this.inscriptionFormTwo.invalid) {
      return;
    } else {

      const em = this.inscriptionFormTwo.get('email').value;
      const sex = this.inscriptionFormTwo.get('sex').value;
      const nat = this.inscriptionFormTwo.get('nat').value;
      const dateF = this.inscriptionFormTwo.get('dateF').value;
      let dateS = '';
      if (dateF['month'] > 9) {
        if (dateF['day'] > 9) {
          dateS = dateS.concat(dateF['year'].toString(), '-', dateF['month'].toString(), '-', dateF['day'].toString());
        } else {
          dateS = dateS.concat(dateF['year'].toString(), '-', dateF['month'].toString(), '-0', dateF['day'].toString());
        }
      } else {
        if (dateF['day'] > 9) {
          dateS = dateS.concat(dateF['year'].toString(), '-0', dateF['month'].toString(), '-', dateF['day'].toString());
        } else {
          dateS = dateS.concat(dateF['year'].toString(), '-0', dateF['month'].toString(), '-0', dateF['day'].toString());
        }
      }
      // console.log(dateS);
      // console.log(dateF['year']);
      const lastName = this.inscriptionFormOne.get('lastName').value;
      const firstName = this.inscriptionFormOne.get('firstName').value;
      const ps = this.inscriptionFormOne.get('password').value;
      const cps = this.inscriptionFormOne.get('confirmPassword').value;

      const dat = Date.now();
      const myUser = {
        'email': em,
        'password': cps,
        'id_user': dat,
        'prenom': firstName,
        'sexe': sex,
        'nom': lastName,
        'dateNaissance': dateS,
        'nationalite': nat
      };
      this.userService.addUser(myUser);
      console.log("GO se connecter !");
      this.progressValue = 100;

      const details = [];
      details.push(em);
      details.push(ps);
      setTimeout(() => {
        const el: HTMLElement = this.close.nativeElement as HTMLElement;
        console.log("GO se connecter !");
        el.click();
        // this.OnConnect.emit(details);
      }, 500);
    }
  }


  ngOnInit() {
    this.inscriptionFormOne.reset();
    this.inscriptionFormTwo.reset();
    this.inscriptionOneSubmitted = false;
    this.inscriptionTwoSubmitted = false;
    this.passedOne = false;
    this.passedTwo = true;
  }

  // convenience getter for easy access to form fields

  get g() {
    return this.inscriptionFormOne.controls;
  }

  get s() {
    return this.inscriptionFormTwo.controls;
  }

  ngOnDestroy() {
    // const el: HTMLElement = this.close.nativeElement as HTMLElement;
    // el.click();
  }

}

import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";

@Component({
  selector: 'app-my-home-page',
  templateUrl: './my-home-page.component.html',
  styleUrls: ['./my-home-page.component.scss']
})


export class MyHomePageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  public currentUser: string;
  public userConnected;
  public authentificationFailed;
  alert: Alert[] = [];

  isShow: boolean;
  topPosToStartShowing = 100;


  constructor(public userService: UserService, public router: Router) {
    // library.add(fas, far);
    // library.add(faFilm);
    document.body.style.backgroundColor = '#fff';
    this.alert.push({'type': 'danger', 'message': null});
  }

  connectMe(details: string[]): void {
    this.userConnected = true;
    this.currentUser = "Paul Koffi";
    // window.scrollTo(0, 0);
    // this.userService.getUser(details[0], details[1]);
    // this.userService.user$.subscribe((user) => {
    //   if (user) {
    //     this.userConnected = true;
    //     this.currentUser = user.name;
    //     window.scrollTo(0, 0);
    //   }
    // });
    // this.alert[0].message = "L'authentification a échoué, veuillez réessayer !!";
    // setTimeout(() => {
    //   this.alert[0].message = null;
    // }, 2000);

    console.log(this.currentUser);
    console.log("oco");
  }

  deconnectMe(rep: boolean): void {
    this.userConnected = false;
    this.currentUser = null;
    // this.userService.deconnected();
    console.log("deco");
  }

  ngOnInit() {

  }

}

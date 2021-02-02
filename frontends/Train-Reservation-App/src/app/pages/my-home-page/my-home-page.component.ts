import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {Alert} from "../../../models/alert";
import {MessagingService} from "../../../services/messaging/messaging.service";
import { SwPush } from '@angular/service-worker';
import {PushNotificationService} from "../../../services/notifications/pushNotification.service";

const VAPID_PUBLIC = 'BNOJyTgwrEwK9lbetRcougxkRgLpPs1DX0YCfA5ZzXu4z9p_Et5EnvMja7MGfCqyFCY4FnFnJVICM4bMUcnrxWg';


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
  message;
  isShow: boolean;
  topPosToStartShowing = 100;


  constructor(public userService: UserService, public router: Router, public messagingService: MessagingService, swPush: SwPush, pushService: PushNotificationService) {
    // library.add(fas, far);
    // library.add(faFilm);
    // document.body.style.backgroundColor = '#fff';
    this.checkScroll();

    this.alert.push({'type': 'danger', 'message': null});
    this.userConnected = this.userService.getAuth();
    // alert("REP "+this.userConnected);
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
    swPush.messages.subscribe((message) => {
      console.log(message);
      alert("ok");
    });

    swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });
  }

  async connectMe(details: string[],componentReference): Promise<void> {
    this.userService.getUserConnect(details[0], details[1]).subscribe(res => {
          this.userConnected = true;
          this.currentUser = res["firstName"].concat(" ",res["lastName"].toString());
          console.table(res);
          this.userService.decodeToken(res["token"],details[0],this.currentUser);
          componentReference.connected(this.currentUser);
    }, error => {
          this.alert[0].message = "L'authentification a échoué, veuillez réessayer !!";
          setTimeout(() => {
            this.alert[0].message = null;
          }, 2000);
    });
  }

  deconnectMe(rep: boolean): void {
    this.userConnected = false;
    this.currentUser = null;
    this.userService.deconnected();
    this.userService.sendData("deconnected");
  }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  onActivate(componentReference) {
    console.log(componentReference);
    // componentReference.anyFunction();
    componentReference.OnConnect.subscribe(async (data) => {
      // Will receive the data from child here
       console.log("SUB");
       await this.connectMe(data,componentReference);
    })
  }

  scrollToElement($element): void {
    // console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //console.log('[scroll]', scrollPosition);
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

}

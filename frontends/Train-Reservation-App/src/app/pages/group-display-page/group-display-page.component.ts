import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user/user.service';
import {Alert} from '../../../models/alert';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Reservation} from '../../../models/reservation';
import {Groups} from '../../../models/groups';
import {GroupsService} from '../../../services/groups/groups.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-display-page.component.html',
  styleUrls: ['./group-display-page.component.scss']
})


export class GroupDisplayPageComponent implements OnInit {
  // @ViewChild('map')
  // public mapElement: HomeMapComponent;

  emptyList = true;
  groupList: Groups[] = [];


  constructor(public groupService: GroupsService, public router: Router) {
    document.body.style.backgroundColor = '#fff';
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
}

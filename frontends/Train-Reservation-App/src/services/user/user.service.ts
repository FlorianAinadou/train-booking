import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = ' http://localhost:9000/api/user/';
  private user = null;

  public user$: BehaviorSubject<User> = new BehaviorSubject(this.user);
  public authentification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) {

  }

  public deconnected() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserId');
    // this.router.navigate(['/']);
    // console.log(localStorage.getItem('currentUserEmail'));
    // this.http.get<User>(this.userUrl + 'deconnected' + '/' + 'deconnected').subscribe(s => {
    //   this.user = null;
    //   this.user$.next(null);
    //   this.router.navigate(['/']);
    // });
  }

  public addUser(task) {
    alert('GO se connecter !"');
    this.http.post(this.userUrl + 'signup', task).subscribe(s => {
      console.log(s);
    });
  }


  public getUser(email, password) {
    const myUser = {
      'mail': email,
      'password': password
    };
    this.http.post(this.userUrl + 'login', myUser).subscribe(s => {
      console.table("resp "+s);
      // this.user = s;
      // this.user$.next(s);
      // Stocker en mémoire
      // if (s) {
        // alert('CONNECTE');
        // this.authentification$.next(false);
        // localStorage.setItem('currentUserEmail', s.email);
        // localStorage.setItem('currentUserName', s.name);
        // localStorage.setItem('currentUserId', s.id_user.toString());
        // this.router.navigate(['/home/user']);
      // } else {
      //   alert('Echec de l"authentification ! 🔑📌');
      //   this.authentification$.next(true);
      // }
      // console.log('rep =  ', s);
    });
  }

  public getCurrentUser() {
    // const email = this.getCurrent();
    // this.http.get<User>(this.userUrl + 'byEmail/' + email).subscribe(s => {
    //   this.user = s;
    //   this.user$.next(s);
    //   // console.log('Rep USER ' + s);
    // });
  }

  //
  getCurrent() {
    return localStorage.getItem('currentUserEmail');
  }

}

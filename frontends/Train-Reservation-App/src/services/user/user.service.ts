import {Injectable} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = ' http://localhost:9000/api/user/';
  // private user = null;
  private user: User = {};
  public user$: AsyncSubject<User> = new AsyncSubject();
  public authentification$: AsyncSubject<boolean> = new AsyncSubject();
  private connected = false;


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


  public async getUser(email, password) {
    const myUser = {
      'mail': email,
      'password': password
    };
    await this.http.post(this.userUrl + 'login', myUser).subscribe(s => {
      // const newUser: User = {};
      // newUser.email = email;
      this.connected = true;
      // this.user = newUser;
      // console.table("resp " + s);
      // const fakeUser: User = {};

      // fakeUser.name = "NONAME13";
      // this.user = fakeUser;
      // this.user$.next(fakeUser);
      // this.authentification$.next(true);

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
    }, e => {
      alert("failure");
      // this.authentification$.next(false);
      // const fakeUser: User = {};
      // fakeUser.name = "NONAME12";
      // this.user = fakeUser;
      // this.user$.next(fakeUser);
    });

    return this.connected;
  }

  getUserConnect(email, password): Observable<any> {
    const myUser = {
      'mail': email,
      'password': password
    };
    return this.http.post<any>(this.userUrl + 'login', myUser)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  decodeToken(myRawToken){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(myRawToken);
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken);
    console.log(myRawToken);
    console.log(decodedToken);
    console.log(expirationDate);
    console.log(isExpired);
  }

  public resetAuthentification() {
    this.authentification$.next(true);
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  //
  getCurrent() {
    return localStorage.getItem('currentUserEmail');
  }

  getAuth() {
    return this.connected;
  }

}

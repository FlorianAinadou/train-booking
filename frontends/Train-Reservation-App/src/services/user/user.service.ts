import {Injectable} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = ' http://paulkoffi.com:9000/api/user/';
  // private user = null;
  private user: User = {};
  public user$: AsyncSubject<User> = new AsyncSubject();
  public authentification$: AsyncSubject<boolean> = new AsyncSubject();
  private connected = false;
  private subject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {

  }

  public deconnected() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserToken');
    this.connected = false;
    this.redirectHomePage();
  }

  public addUser(task) {
    alert('GO se connecter !"');
    this.http.post(this.userUrl + 'signup', task).subscribe(s => {
      console.log(s);
    });
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

  decodeToken(myRawToken, mail, name) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(myRawToken);
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken);
    this.connected = true;
    // console.log(myRawToken);
    // console.log(decodedToken);
    // console.log(expirationDate);
    // console.log(isExpired);
    if (!isExpired) {
      localStorage.setItem('currentUserEmail', mail);
      localStorage.setItem('currentUserName', name);
      localStorage.setItem('currentUserToken', decodedToken);
    }
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


  getCurrentUser() {
    return JSON.stringify({
      name: localStorage.getItem('currentUserName'),
      mail: localStorage.getItem('currentUserEmail')
    });
  }

  getCurrentUserName() {
    return localStorage.getItem('currentUserName');
  }

  getAuth() {
    // alert(localStorage.getItem("currentUserEmail"));
    return localStorage.getItem("currentUserEmail") !== null;
  }

  redirectHomePage() {
    this.router.navigate(['/']);
  }

  sendData(message: string) {
    this.subject.next(message);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}

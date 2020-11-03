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
export class ReservationService {

  private userUrl = ' http://localhost:9000/trainSelector/';
  private reservationUrl = ' http://localhost:9000/booking/';


  constructor(private http: HttpClient, private router: Router) {

  }



  addReservation(trainId): Observable<any> {
    const myReservation = {
      'trainId': trainId,
      'userMail': this.getCurrentUserMail(),
      'placeNumber' : Date.now().toString()
    };
    console.table(myReservation);
    return this.http.post<any>(this.reservationUrl + 'addReservation', myReservation)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
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

  getReservationResult(departure, arrival): Observable<any> {
    return this.http.get<any>(this.userUrl + departure + '/' + arrival)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  getTrainById(id): Observable<any> {
    return this.http.get<any>(this.userUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  getMyReservationList(): Observable<any> {
    return this.http.get<any>(this.reservationUrl + 'getBookingByMail/' + this.getCurrentUserMail())
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
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

  getCurrentUserMail() {
    return localStorage.getItem("currentUserEmail");
  }

}

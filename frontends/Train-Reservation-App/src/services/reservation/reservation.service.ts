import {Injectable} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {JwtHelperService} from "@auth0/angular-jwt";
import {catchError, retry} from "rxjs/operators";
import {Ticket} from "../../models/ticket";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private userUrl = 'http://localhost:9000/trainSelector/';
  private reservationUrl = 'http://localhost:9000/booking/';
  private paymentUrl = 'http://localhost:9000/payment/';

  // private userUrl = ' http://paulkoffi.com:9000/trainSelector/';
  // private reservationUrl = ' http://paulkoffi.com:9000/booking/';
  // private paymentUrl = ' http://paulkoffi.com:9000/payment/';

  private reservationsList: Ticket[] = [];
  public reservation$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.reservationsList);


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

  getMyReservationPaidList(): Observable<any> {
    return this.http.get<any>(this.reservationUrl + 'getPaidBookingByMail/' + this.getCurrentUserMail())
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  public getMyReservationPaidList2() {
    this.http.get<Ticket[]>(this.reservationUrl + 'getPaidBookingByMail/' + this.getCurrentUserMail()).subscribe(s => {
      // alert(s);
      this.reservationsList = s;
      this.reservation$.next(s);
      // console.log('rep =  ', s);
    });
  }

  removeReservation(id): Observable<any> {
    return this.http.delete<any>(this.reservationUrl + 'removeBookingByBookingId/'+id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  purchaseReservation(price,id): Observable<any> {
    const myReservation = {
      'bookingId': id,
      'userMail': this.getCurrentUserMail(),
      'price' : price
    };
    console.table(myReservation);
    return this.http.post<any>(this.paymentUrl + 'payReservationWeb', myReservation)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  purchaseGroupReservation(trainId, price, placesNumber, groupId): Observable<any> {
    const myReservation = {
      'trainId': trainId,
      'customer': this.getCurrentUserMail(),
      'price' : price,
      'placesNumber' : placesNumber,
      'groupId' : groupId
    };
    console.table(myReservation);
    return this.http.post<any>(this.paymentUrl + 'paygroup', myReservation)
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

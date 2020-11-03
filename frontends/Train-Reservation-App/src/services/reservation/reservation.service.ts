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

  constructor(private http: HttpClient, private router: Router) {

  }


  getReservationResult(departure, arrival): Observable<any> {
    return this.http.get<any>(this.userUrl + departure + '/' + arrival)
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

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from "rxjs/operators";
import {throwError} from "rxjs";

const SERVER_URL = 'http://paulkoffi.com:3000/subscription';

@Injectable()
export class PushNotificationService {

  private userSubUrl = ' http://paulkoffi.com:9000/api/user/subs';

  constructor(private http: HttpClient) {
  }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription);
  }

  public sendSubscriptionToTheServer2(subscription: PushSubscription) {
    console.log("ici");
    console.table(subscription);
    const r = {
      sub: subscription,
      mail: localStorage.getItem('currentUserEmail')
    };
    return this.http.post<any>(this.userSubUrl, r)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

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

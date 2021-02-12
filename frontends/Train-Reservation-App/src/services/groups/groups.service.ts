import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class GroupsService {

  private groupsUrl = ' http://paulkoffi.com:9000/groups/';

  constructor(private http: HttpClient) {
  }

  getMyGroups(): Observable<any> {
    return this.http.get<any>(this.groupsUrl + this.getCurrentUserMail())
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

  getCurrentUserMail() {
    return localStorage.getItem("currentUserEmail");
  }
}

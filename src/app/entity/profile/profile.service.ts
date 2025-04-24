import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.apiUrl

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(public readonly http: HttpClient) {}

  update(user: any): Observable<any> {
    return this.http
      .put(`${this.url}profile/${user._id}`, user, { headers: this.headers })
      .pipe(catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('Here')
    console.log(error)

    const errorResponse = {
      status: error.status,
      type: 'error',
      message: error.error.message || error.message
    }

    return throwError(() => errorResponse)
  }
}

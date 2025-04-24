import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { EntityService } from '../entity.service'
import { Exhibition } from './exhibition.model'

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService extends EntityService<Exhibition> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'exhibition')
  }

  public getVisitedByFriends(id:string, options?: any): Observable<Exhibition[] | null> {
    const endpoint = `${this.url}user/${id}/recommendations/visited-by-friends`
    console.log(`list ${this.endpoint}`)
    return this.http
      .get<Exhibition[]>(endpoint, { ...options })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  public getRecommended(id:string, options?: any): Observable<Exhibition[] | null> {
    const endpoint = `${this.url}user/${id}/recommendations/not-bought`
    console.log(`list ${this.endpoint}`)
    return this.http
      .get<Exhibition[]>(endpoint, { ...options })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  public getMostRecent(options?: any): Observable<Exhibition[] | null> {
    const endpoint = `${this.url}${this.endpoint}/recent`
    console.log(`list ${this.endpoint}`)
    return this.http
      .get<Exhibition[]>(endpoint, { ...options })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    const errorResponse = {
      status: error.status,
      type: 'error',
      message: error.error.message || error.message
    }

    return throwError(() => errorResponse)
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from 'src/environments/environment'
import { EntityService } from '../entity.service'
import { Ticket } from './ticket.model'

@Injectable({
  providedIn: 'root'
})
export class TicketService extends EntityService<Ticket> {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(http: HttpClient, private authService: AuthService) {
    super(http, environment.apiUrl, 'ticket')
  }

  buyTicket(info: any, options?: any): Observable<any> {
    return this.http.post(`${this.url}ticket`, info, { ...options }).pipe(catchError(this.handleError))
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

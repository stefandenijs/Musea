import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { EntityService } from '../entity.service'
import { Gender, User, UserRole } from './user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<User> {
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'user')
  }

  sendFriendRequest(id: string, receiverId: string, options?: any): Observable<any> {
    return this.http
      .post(`${this.url}request/${receiverId}`, { senderId: id }, { ...options })
      .pipe(catchError(this.handleError))
  }

  acceptRequest(id: string, reqId: string, options?: any): Observable<any> {
    return this.http
      .put(`${this.url}request/${id}/accept/${reqId}`, {}, { ...options })
      .pipe(catchError(this.handleError))
  }

  refuseRequest(id: string, reqId: string, options?: any): Observable<any> {
    return this.http
      .delete(`${this.url}request/${id}/refuse/${reqId}`, { ...options })
      .pipe(catchError(this.handleError))
  }

  removeFriend(id: string, friendId: string, options?: any): Observable<any> {
    return this.http
      .delete(`${this.url}request/${id}/friend/${friendId}`, { ...options })
      .pipe(catchError(this.handleError))
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

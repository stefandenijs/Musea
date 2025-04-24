import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, concatMap, map, mergeMap, Observable, of, switchMap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from '../entity/user/user.model'
import { UserService } from '../entity/user/user.service'
import { Router } from '@angular/router'
import { AlertService } from '../shared/alert.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined)
  public token$ = new BehaviorSubject<String | undefined>(undefined)

  private readonly TOKEN = 'currentuser'

  private url = environment.apiUrl

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    public readonly http: HttpClient,
    public jwtHelper: JwtHelperService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage()

    if (token === null || token === undefined) {
      return false
    }

    return !this.jwtHelper.isTokenExpired(token.token)
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token)
  }

  login(email: string, password: string): Observable<any> {
    console.log(`login at ${this.url}login`)

    return this.http
      .post(`${this.url}authentication/login`, { email, password }, { headers: this.headers })
      .pipe(
        map(async (response: any) => {
          const token = { ...response }
          this.saveTokenToLocalStorage(token)
          this.token$.next(token)
          console.log(this.token$.getValue())
          this.getLoggedInUser().subscribe({next: (user) => {
            this.currentUser$.next(user)
          }})
          return of(token)
        }, catchError(this.handleError))
      )
  }

  getLoggedInUser(): Observable<any> {
    console.log(`login at ${this.url}profile`)

    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getTokenFromLocalStorage().token
    })
    return this.http.get<User>(`${this.url}profile`, { headers: newHeaders }).pipe(
      map((user: any) => {
        const logUser = user
        console.log(logUser)
        this.currentUser$.next(logUser)
        return logUser
      }, catchError(this.handleError))
    )
  }

  register(user: any): Observable<any> {
    console.log(`Register at ${this.url}register`)

    return this.http.post(`${this.url}authentication/register`, user, { headers: this.headers }).pipe(
      map((response: any) => {
        const token = { ...response }
        this.saveTokenToLocalStorage(token)
        this.token$.next(token)
        this.getLoggedInUser().subscribe({next: (user) => {
          this.currentUser$.next(user)
        }})
        return of(token)
      }, catchError(this.handleError))
    )
  }

  registerAdmin(user: any): Observable<any> {
    console.log(`Register at ${this.url}register`)

    return this.http.post(`${this.url}authentication/register`, user, { headers: this.headers }).pipe(
      map((response: any) => {
        return of(undefined)
      }, catchError(this.handleError))
    )
  }

  logOut(): void {
    this.router
      .navigate(['/login'])
      .then((success) => {
        if (success) {
          console.log('logout - removing local user info')
          this.alertService.success('Succesvol uitgelogd')
          localStorage.removeItem(this.TOKEN)
          this.currentUser$.next(undefined)
        } else {
          console.log('navigate result:', success)
        }
      })
      .catch((error) => console.log('not logged out!'))
  }

  getTokenFromLocalStorage(): any {
    const token = JSON.parse(localStorage.getItem(this.TOKEN)!)
    return token
  }

  private saveTokenToLocalStorage(token: string): void {
    localStorage.setItem(this.TOKEN, JSON.stringify(token))
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('Here')
    console.log(error)

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message
    }

    return throwError(() => errorResponse)
  }
}

import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-profile-friend-requests',
  templateUrl: './profile-friend-requests.component.html',
  styles: []
})
export class ProfileFriendRequestsComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  logSub!: Subscription
  subAcptReq!: Subscription
  subRefReq!: Subscription
  logSubReq!: Subscription

  httpOptions: any

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (this.authService.isAuthenticated()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getTokenFromLocalStorage().token
        })
      }
    }
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
  }

  ngOnDestroy(): void {
    if (this.logSub) {
      this.logSub.unsubscribe()
    }
    if (this.logSubReq) {
      this.logSubReq.unsubscribe()
    }
    if (this.subAcptReq) {
      this.subAcptReq.unsubscribe()
    }
    if (this.subRefReq) {
      this.subRefReq.unsubscribe()
    }
  }

  acceptRequest(logId: string, reqId: string): void {
    this.subAcptReq = this.userService.acceptRequest(logId, reqId, this.httpOptions).subscribe({
      next: () => {
        this.alertService.success('Verzoek geaccepteerd'), this.router.navigate(['profile'])
        this.authService.getLoggedInUser()
      },
      error: (err) => {
        console.log(err)
        this.alertService.error('Kon verzoek niet verwerken. Probeer het later opnieuw.')
      }
    })
  }

  refuseRequest(logId: string, reqId: string): void {
    this.subRefReq = this.userService.refuseRequest(logId, reqId, this.httpOptions).subscribe({
      next: () => {
        this.logSubReq = this.loggedInUser$.subscribe({next: (user) => {
          user!.friendRequests = user!.friendRequests.filter((r) => r._id !== reqId)
        }}) 
        this.alertService.success('Verzoek geweigerd')
      },
      error: (err) => {
        console.log(err)
        this.alertService.error('Kon verzoek niet verwerken. Probeer het later opnieuw.')
      }
    })
  }
}

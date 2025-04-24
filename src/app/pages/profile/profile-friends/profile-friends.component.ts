import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styles: []
})
export class ProfileFriendsComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  subRemvFriend!: Subscription
  logSub!: Subscription

  httpOptions: any

  constructor(
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
    if (this.subRemvFriend) {
      this.subRemvFriend.unsubscribe()
    }
  }

  removeFriend(logId: string, friendId: string): void {
    this.subRemvFriend = this.userService.removeFriend(logId, friendId, this.httpOptions).subscribe({
      next: () => {
        this.logSub = this.loggedInUser$.subscribe({
          next: (user) => {
            user!.friends = user!.friends.filter((u) => u._id !== friendId)
          }
        })
        this.alertService.success('Vriend verwijderd')
      },
      error: (err) => {
        console.log(err)
        this.alertService.error('Kon vriend niet verwijderen. Probeer het later opnieuw.')
      }
    })
  }
}

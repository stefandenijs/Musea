import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { DataService } from 'src/app/entity/data.service'
import { User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  userId: string | null = null
  user: User | null = null
  loading: boolean = false
  deleting: boolean = false
  isFriend: boolean = false
  subRead!: Subscription
  subDelete!: Subscription
  subFriend!: Subscription
  subLog!: Subscription

  httpOptions: any

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private dataService: DataService,
    private alertService: AlertService,
    private router: Router
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
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId')
      if (this.userId) {
        this.loading = true
        this.subRead = this.userService.read(this.userId).subscribe({
          next: (user) => {
            this.user = user
            this.dataService.setData(user)
            console.log(`User: ${this.user}`)
            this.loading = false
            if (this.loggedInUser$ && user) {
              this.subLog = this.loggedInUser$.subscribe({
                next: (user) => {
                  this.isFriend = user?.friends.some((x) => x._id === this.user?._id)!
                }
              })
            }
          },
          error: (err) => {
            console.log(err)
            this.loading = false
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subRead) {
      this.subRead.unsubscribe()
    }
    if (this.subDelete) {
      this.subDelete.unsubscribe()
    }
    if (this.subFriend) {
      this.subFriend.unsubscribe()
    }
    if (this.dataService.data) {
      this.dataService.setData(undefined)
    }
  }

  deleteUser(): void {
    if (this.user) {
      this.deleting = true
      this.subDelete = this.userService.delete(this.user._id!, this.httpOptions).subscribe({
        next: () => {
          this.alertService.success('Gebruiker succesvol verwijderd')
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error: (err) => {
          this.alertService.error('Kan gebruiker niet verwijderen. Probeer het later opnieuw')
          this.deleting = false
          console.log(err)
        }
      })
    }
  }

  sendRequest(senderId: string): void {
    this.subFriend = this.userService.sendFriendRequest(senderId, this.user?._id!, this.httpOptions).subscribe({
      next: () => this.alertService.success('Verzoek verzonden'),
      error: (err) => {
        if (err.status === 422) {
          this.alertService.error('Gebruiker heeft al een verzoek of is al een vriend.')
        } else {
          this.alertService.error('Verzoek kon niet verzonden worden. Probeer het later opnieuw.')
        }
        console.log(err)
      }
    })
  }
}

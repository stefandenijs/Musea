import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Exhibition } from 'src/app/entity/exhibition/exhibition.model'
import { ExhibitionService } from 'src/app/entity/exhibition/exhibition.service'
import { User } from 'src/app/entity/user/user.model'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  museumId: string = ''
  runningMode: string = ''
  apiUrl: string = ''
  version: string = ''
  recommended: Exhibition[] | null = null
  visitedByFriends: Exhibition[] | null = null
  mostRecent: Exhibition[] | null = null
  subRec!: Subscription
  subRecExh!: Subscription
  subVisFriend!: Subscription
  logSub!: Subscription

  httpOptions: any

  constructor(private exhibitionController: ExhibitionService, private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getTokenFromLocalStorage().token
        })
      }
    }
  }

  ngOnInit() {
    this.loggedInUser$ = this.authService.currentUser$
    this.runningMode = environment.production ? 'production' : 'development'
    this.apiUrl = environment.apiUrl
    this.version = environment.version
    if (this.authService.isAuthenticated()) {
      this.logSub = this.loggedInUser$.subscribe({
        next: (user) => {
          this.subRecExh = this.exhibitionController.getRecommended(user!._id!, this.httpOptions).subscribe({
            next: (recommended) => {
              this.recommended = recommended
            },
            error: (err) => {
              console.log(err)
            }
          })
          this.subVisFriend = this.exhibitionController.getVisitedByFriends(user!._id!, this.httpOptions).subscribe({
            next: (visitedByFriends) => {
              this.visitedByFriends = visitedByFriends
            },
            error: (err) => {
              console.log(err)
            }
          })
        }
      })
    }

    this.subRec = this.exhibitionController.getMostRecent().subscribe({
      next: (recent) => {
        this.mostRecent = recent
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.logSub) {
      this.logSub.unsubscribe()
    }
    if (this.subRec) {
      this.subRec.unsubscribe()
    }
    if (this.subRecExh) {
      this.subRecExh.unsubscribe()
    }
    if (this.subVisFriend) {
      this.subVisFriend.unsubscribe()
    }
  }
}

import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Museum } from 'src/app/entity/museum/museum.model'
import { MuseumService } from 'src/app/entity/museum/museum.service'
import { User } from 'src/app/entity/user/user.model'

@Component({
  selector: 'app-museum-list',
  templateUrl: './museum-list.component.html',
  styles: []
})
export class MuseumListComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined = undefined
  museums: Museum[] | null = []
  loading: boolean = false
  subscription!: Subscription

  constructor(private museumService: MuseumService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
    this.loading = true
    this.subscription = this.museumService.list(undefined).subscribe({
      next: (museums) => {
        this.museums = museums
        console.log(`Museums: ${this.museums}`)
        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

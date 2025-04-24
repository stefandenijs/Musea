import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>;
  users: User[] | null = []
  loading: boolean = false
  subscription!: Subscription

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
    this.loading = true
    this.subscription = this.userService.list(undefined).subscribe({
      next: (users) => {
        this.users = users
        console.log(`Users: ${this.users}`)
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

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { DataService } from 'src/app/entity/data.service'

import { User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  userId: string | null = null
  user: User | null = null
  loading: boolean = false
  deleting: boolean = false
  subscriptionDelete!: Subscription

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
    this.user = this.dataService.getData()
  }

  ngOnDestroy(): void {
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe()
    }
  }

  deleteUser(): void {
    if (this.user) {
      this.deleting = true
      this.subscriptionDelete = this.userService.delete(this.user._id!).subscribe({
        next: () => this.router.navigate(['..'], { relativeTo: this.route }),
        error: (err) => {
          this.deleting = false
          console.log(err)
        }
      })
    }
  }
}

import { Component, Input, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { User } from 'src/app/entity/user/user.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent {
  loggedInUser$: Observable<User | undefined> | undefined = undefined;
  sub!: Subscription

  @Input() title: string = ''
  isNavbarCollapsed = true

  constructor(private authService: AuthService) {}

  ngOnInit(): void {  
    console.log(`Logged in: ${this.loggedInUser$}`)
    if (!this.loggedInUser$) {
      if (this.authService.isAuthenticated()) {
        this.sub = this.authService.getLoggedInUser().subscribe({next: () => {
          this.loggedInUser$ = this.authService.currentUser$
        }})
      } else {
        this.loggedInUser$ = this.authService.currentUser$
      }
    }
  }

  ngOnDestroy(): void {
  }

  logOut(): void {
    this.authService.logOut()
  }
}

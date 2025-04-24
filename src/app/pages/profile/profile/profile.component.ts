import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { User } from 'src/app/entity/user/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
  }

  ngOnDestroy(): void {}
}

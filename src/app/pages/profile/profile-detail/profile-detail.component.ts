import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/entity/user/user.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styles: [
  ]
})
export class ProfileDetailComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/entity/data.service';
import { User } from 'src/app/entity/user/user.model';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styles: [
  ]
})
export class UserFriendsComponent implements OnInit {
  user: User | null = null

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = this.dataService.getData()
  }
}

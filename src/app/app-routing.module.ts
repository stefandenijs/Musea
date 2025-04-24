import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RoleGuardService as RoleGuard } from './auth/role-guard.service'
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { LayoutComponent } from './core/layout/layout.component'
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component'
import { AboutComponent } from './pages/about/about.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { MuseumDetailComponent } from './pages/museum/museum-detail/museum-detail.component'
import { MuseumEditComponent } from './pages/museum/museum-edit/museum-edit.component'
import { MuseumListComponent } from './pages/museum/museum-list/museum-list.component'
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component'
import { UserEditComponent } from './pages/user/user-edit/user-edit.component'
import { UserListComponent } from './pages/user/user-list/user-list.component'
import { ProfileComponent } from './pages/profile/profile/profile.component'
import { ProfileDetailComponent } from './pages/profile/profile-detail/profile-detail.component'
import { ProfileFriendsComponent } from './pages/profile/profile-friends/profile-friends.component'
import { ProfileDetailEditComponent } from './pages/profile/profile-detail-edit/profile-detail-edit.component'
import { ExhibitionListComponent } from './pages/exhibition/exhibition-list/exhibition-list.component'
import { ExhibitionEditComponent } from './pages/exhibition/exhibition-edit/exhibition-edit.component'
import { ExhibitionDetailComponent } from './pages/exhibition/exhibition-detail/exhibition-detail.component'
import { ProfileTicketsComponent } from './pages/profile/profile-tickets/profile-tickets.component'
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component'
import { UserFriendsComponent } from './pages/user/user-friends/user-friends.component'
import { UserTicketsComponent } from './pages/user/user-tickets/user-tickets.component'
import { ProfileFriendRequestsComponent } from './pages/profile/profile-friend-requests/profile-friend-requests.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
      { path: 'login', pathMatch: 'full', component: LoginComponent },
      { path: 'register', pathMatch: 'full', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: '', component: ProfileDetailComponent},
        {path: 'details', pathMatch: 'full', component: ProfileDetailComponent},
        {path: 'details/edit', pathMatch: 'full', component: ProfileDetailEditComponent},
        {path: 'friends', pathMatch: 'full', component: ProfileFriendsComponent},
        
        {path: 'tickets', pathMatch: 'full', component: ProfileTicketsComponent},
        {path: 'requests', pathMatch: 'full', component: ProfileFriendRequestsComponent}
      ] },
      { path: 'museums', pathMatch: 'full', component: MuseumListComponent},
      { path: 'museums/new', pathMatch: 'full', component: MuseumEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin', 'staff']}},
      { path: 'museums/:museumId', pathMatch: 'full', component: MuseumDetailComponent },
      { path: 'museums/:museumId/edit', pathMatch: 'full', component: MuseumEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin', 'staff']}},
      { path: 'museums/:museumId/exhibitions/new', pathMatch: 'full', component: ExhibitionEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin', 'staff']}},
      { path: 'museums/:museumId/exhibitions/:exhibitionId', pathMatch: 'full', component: ExhibitionDetailComponent},
      { path: 'museums/:museumId/exhibitions/:exhibitionId/edit', pathMatch: 'full', component: ExhibitionEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin', 'staff']}},
      { path: 'exhibitions', pathMatch: 'full', component: ExhibitionListComponent},
      { path: 'users', pathMatch: 'full', component: UserListComponent},
      { path: 'users/new', pathMatch: 'full', component: UserEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin']}},
      { path: 'users/:userId', component: UserProfileComponent, children: [
        {path: '', component: UserDetailComponent},
        {path: 'details', pathMatch: 'full', component: UserDetailComponent},
        {path: 'details/edit', pathMatch: 'full', component: UserEditComponent},
        {path: 'friends', pathMatch: 'full', component: UserFriendsComponent},
        {path: 'tickets', pathMatch: 'full', component: UserTicketsComponent,},
      ] },
      { path: 'users/:userId/edit', pathMatch: 'full', component: UserEditComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin', 'staff']}},
      { path: 'about', pathMatch: 'full', component: AboutComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

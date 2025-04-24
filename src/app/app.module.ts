import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './core/dashboard/dashboard.component'
import { NavbarComponent } from './core/navbar/navbar.component'
import { LayoutComponent } from './core/layout/layout.component'
import { FooterComponent } from './core/footer/footer.component'
import { AboutComponent } from './pages/about/about.component'
import { UsecaseComponent } from './pages/about/usecases/usecase.component'
import { UserListComponent } from './pages/user/user-list/user-list.component'
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component'
import { UserEditComponent } from './pages/user/user-edit/user-edit.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { MuseumListComponent } from './pages/museum/museum-list/museum-list.component'
import { MuseumDetailComponent } from './pages/museum/museum-detail/museum-detail.component'
import { MuseumEditComponent } from './pages/museum/museum-edit/museum-edit.component'
import { HttpClientModule } from '@angular/common/http'
import { SpinnerComponent } from './core/spinner/spinner.component'
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'
import { ProfileComponent } from './pages/profile/profile/profile.component'
import { ProfileDetailComponent } from './pages/profile/profile-detail/profile-detail.component'
import { ProfileFriendsComponent } from './pages/profile/profile-friends/profile-friends.component'
import { ProfileDetailEditComponent } from './pages/profile/profile-detail-edit/profile-detail-edit.component'
import { ExhibitionListComponent } from './pages/exhibition/exhibition-list/exhibition-list.component'
import { ExhibitionEditComponent } from './pages/exhibition/exhibition-edit/exhibition-edit.component'
import { ExhibitionDetailComponent } from './pages/exhibition/exhibition-detail/exhibition-detail.component'
import { ProfileTicketsComponent } from './pages/profile/profile-tickets/profile-tickets.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserFriendsComponent } from './pages/user/user-friends/user-friends.component';
import { UserTicketsComponent } from './pages/user/user-tickets/user-tickets.component'
import { AlertComponent } from './core/alert/alert/alert.component';

import { registerLocaleData } from '@angular/common'
import localeNl from '@angular/common/locales/nl'
import localeNlExtra from '@angular/common/locales/extra/nl';
import { ProfileFriendRequestsComponent } from './pages/profile/profile-friend-requests/profile-friend-requests.component';

registerLocaleData(localeNl, 'nl-NL', localeNlExtra)

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    AboutComponent,
    UsecaseComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    MuseumListComponent,
    MuseumDetailComponent,
    MuseumEditComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileDetailComponent,
    ProfileFriendsComponent,
    ProfileDetailEditComponent,
    ExhibitionListComponent,
    ExhibitionEditComponent,
    ExhibitionDetailComponent,
    ProfileTicketsComponent,
    UserProfileComponent,
    UserFriendsComponent,
    UserTicketsComponent,
    AlertComponent,
    ProfileFriendRequestsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, {provide: LOCALE_ID, useValue: "nl-NL"}],
  bootstrap: [AppComponent]
})
export class AppModule {}

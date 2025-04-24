import { HttpClientModule } from '@angular/common/http'
import { Directive, HostListener, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { of, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component'
import { Gender, User, UserRole } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'

import { UserListComponent } from './user-list.component'

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any
  navigatedTo: any = null
  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams
  }
}

const users: User[] = [
  {
    _id: 'mongo_id',
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'user@host.com',
    gender: Gender.male,
    birthDate: new Date(),
    role: UserRole.general,
    friends: [],
    friendRequests: [],
  }
]

describe('UserListComponent', () => {
  let component: UserListComponent
  let fixture: ComponentFixture<UserListComponent>

  let userServiceSpy: any
  let authServiceSpy: any
  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['list'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [UserListComponent, RouterLinkStubDirective],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(UserListComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', (done) => {
    userServiceSpy.list.and.returnValue(of(users))
    fixture.detectChanges()

    component.subscription = new Subscription()

    expect(component).toBeTruthy()
    expect(component.users).toEqual(users)
    done()
  })
})

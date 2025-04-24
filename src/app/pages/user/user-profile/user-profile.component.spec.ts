import { HttpClientModule } from '@angular/common/http'
import { Directive, HostListener, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component'
import { DataService } from 'src/app/entity/data.service'
import { Gender, User, UserRole } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'

import { UserProfileComponent } from './user-profile.component'

const expectedUser: User = {
  _id: 'mongo_id',
  firstName: 'Firstname',
  lastName: 'Lastname',
  email: 'user@host.com',
  gender: Gender.male,
  birthDate: new Date(),
  role: UserRole.general,
  friends: [],
  friendRequests: []
}

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

describe('UserProfileComponent', () => {
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>

  let userServiceSpy: any
  let authServiceSpy: any
  let dataServiceSpy: any
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['read'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'isAuthenticated'])
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData', 'setData'])

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [UserProfileComponent, SpinnerComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                userId: 'mongo_id'
              })
            ),
            snapshot: new ActivatedRouteSnapshot()
          }
        },
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', (done: DoneFn) => {
    userServiceSpy.read.and.returnValue(of(expectedUser))
    fixture.detectChanges()

    component.subRead = new Subscription()
    component.subLog = new Subscription()
    component.subDelete = new Subscription()
    component.subFriend = new Subscription()

    expect(component).toBeTruthy()
    expect(component.user).toEqual(expectedUser)
    done()
  })
})

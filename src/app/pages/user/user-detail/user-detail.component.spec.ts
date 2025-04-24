import { HttpClientModule } from '@angular/common/http'
import { Directive, HostListener, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { DataService } from 'src/app/entity/data.service'
import { Gender, User, UserRole } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'

import { UserDetailComponent } from './user-detail.component'

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

const expectedUser: User = {
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

describe('UserDetailComponent', () => {
  let component: UserDetailComponent
  let fixture: ComponentFixture<UserDetailComponent>

  let userServiceSpy: any
  let authServiceSpy: any
  let dataServiceSpy: any
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['read'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register'])
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData'])

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [UserDetailComponent, RouterLinkStubDirective],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                userId: '619bdb5e3b174a700c923da3'
              })
            )
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(UserDetailComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', (done) => {
    userServiceSpy.read.and.returnValue(of(expectedUser))
    fixture.detectChanges()

    component.user = expectedUser

    component.subscriptionDelete = new Subscription()

    expect(component).toBeTruthy()
    expect(component.user).toEqual(expectedUser)
    done()
  })
})

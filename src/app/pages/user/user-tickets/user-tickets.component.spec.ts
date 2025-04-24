import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { DataService } from 'src/app/entity/data.service'
import { TicketService } from 'src/app/entity/ticket/ticket.service'
import { Gender, User, UserRole } from 'src/app/entity/user/user.model'

import { UserTicketsComponent } from './user-tickets.component'

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

describe('UserTicketsComponent', () => {
  let component: UserTicketsComponent
  let fixture: ComponentFixture<UserTicketsComponent>


  let authServiceSpy: any
  let ticketServiceSpy: any
  let dataServiceSpy: any
  beforeEach(async () => {
    ticketServiceSpy = jasmine.createSpyObj('TicketService', ['list'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'isAuthenticated'], {currentUser$: of(expectedUser)})
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData'])

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserTicketsComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TicketService, useValue: ticketServiceSpy },
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

    fixture = TestBed.createComponent(UserTicketsComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    ticketServiceSpy.list.and.returnValue(of({}))
    fixture.detectChanges()

    component.loggedInUser$ = of(expectedUser);

    component.subscriptionUser = new Subscription()
    component.subscriptionTickets = new Subscription()
    component.subscriptionRefundTicket = new Subscription()

    expect(component).toBeTruthy()
  })
})

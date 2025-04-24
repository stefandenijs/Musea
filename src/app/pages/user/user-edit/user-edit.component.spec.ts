import { DatePipe } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'

import { UserEditComponent } from './user-edit.component'

describe('UserEditComponent', () => {
  let component: UserEditComponent
  let fixture: ComponentFixture<UserEditComponent>

  let authServiceSpy: any
  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register', 'isAuthenticated'])

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [UserEditComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

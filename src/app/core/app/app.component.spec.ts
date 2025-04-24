import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { AboutComponent } from 'src/app/pages/about/about.component'
import { UsecaseComponent } from 'src/app/pages/about/usecases/usecase.component'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/auth/auth.service'

describe('AppComponent', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>
  let authServiceSpy: any

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule],
      providers: [{ provide: HttpClient, useValue: httpSpy },{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [AppComponent, DashboardComponent, NavbarComponent, AboutComponent, UsecaseComponent]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'Musea'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Musea')
  })
})

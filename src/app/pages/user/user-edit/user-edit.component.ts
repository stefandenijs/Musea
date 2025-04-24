import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { User, Gender, GenderLabel, UserRole } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Subscription } from 'rxjs'
import { notInFuture } from 'src/app/shared/not-in-future.validator'
import { AuthService } from 'src/app/auth/auth.service'
import { AlertService } from 'src/app/shared/alert.service'
import { HttpHeaders } from '@angular/common/http'
import { DataService } from 'src/app/entity/data.service'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {
  userId: string | null = null
  user: User | undefined = undefined
  submitted: boolean = false
  saving: boolean = false
  subscriptionRead!: Subscription
  subscriptionCreateUpdate!: Subscription
  error: String | undefined

  public GenderLabel = GenderLabel
  public genders = Object.values(Gender)

  form!: FormGroup

  httpOptions: any

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {
    if (this.authService.isAuthenticated()) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getTokenFromLocalStorage().token
        })
      }
    }
  }

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.paramMap.subscribe((params) => {
        this.userId = params.get('userId')
      })
    } else {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('userId')
      })
    }

    if (this.userId != null) {
      this.user = this.dataService.getData()
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', [Validators.required]],
        birthDate: ['', [Validators.required, notInFuture]]
      })

      console.log(this.userId)

      this.form.patchValue({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        gender: this.user?.gender,
        birthDate: this.datePipe.transform(this.user?.birthDate, 'yyyy-MM-dd')
      })
    } else {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        gender: ['', [Validators.required]],
        birthDate: ['', [Validators.required, notInFuture]]
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionRead) {
      this.subscriptionRead.unsubscribe()
    }
    if (this.subscriptionCreateUpdate) {
      this.subscriptionCreateUpdate.unsubscribe()
    }
  }

  onSubmit(form: FormGroup) {
    this.submitted = true
    if (this.form.valid) {
      console.log(form.value)
      this.saving = true
      if (this.userId != null) {
        this.subscriptionCreateUpdate = this.userService
          .update({ _id: this.userId, ...this.form.value }, this.httpOptions)
          .subscribe({
            next: () => {
              this.alertService.success('Gebruiker gewijzigd')
              this.router.navigate(['users'])
            },
            error: (err) => {
              this.saving = false
              console.log(err)
              if (err.status === 409) {
                this.alertService.error('Email al in gebruik')
                this.error = `Het email ${this.form.value.email} is al in gebruik.`
                console.log(this.error)
              } else if (err.status === 500) {
                this.alertService.error('Gebruiker kon niet gewijzigd worden. Probeer het later opnieuw.')
              }
            }
          })
      } else {
        this.subscriptionCreateUpdate = this.authService
          .registerAdmin({ ...this.form.value, role: UserRole.general })
          .subscribe({
            next: () => {
              this.alertService.success('Gebruiker toegevoegd')
              this.router.navigate(['/users'])
            },
            error: (err) => {
              this.saving = false
              console.log(err)
              if (err.status === 409) {
                this.alertService.error('Email al in gebruik')
                this.error = `Het email ${this.form.value.email} is al in gebruik.`
                console.log(this.error)
              } else if (err.status === 500) {
                this.alertService.error('Gebruiker kon niet gewijzigd worden. Probeer het later opnieuw.')
              }
            }
          })
      }
      this.submitted = false
    } else {
      return
    }
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Gender, GenderLabel, UserRole } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { AlertService } from 'src/app/shared/alert.service'
import { notInFuture } from 'src/app/shared/not-in-future.validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false
  saving: boolean = false

  public GenderLabel = GenderLabel
  public genders = Object.values(Gender)

  form!: FormGroup
  subscription!: Subscription
  error: String | undefined

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required, notInFuture]]
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSubmit(form: FormGroup): void {
    this.submitted = true
    if (this.form.valid) {
      console.log(form.value)
      this.saving = true
      this.subscription = this.authService
        .register({ ...this.form.value, role: UserRole.general })
        .subscribe({
          next: () => {
            this.alertService.success('Account succesvol aangemaakt.')
            this.router.navigate(['/users'])
          },
          error: (err) => {
            console.log(`Error: ${err.status} ${err.message}`)
            console.log(err)
            if (err.status === 409) {
              this.error = `Het email ${this.form.value.email} is al in gebruik.`
            }
            this.saving = false
          }
        })
      this.submitted = false
    } else {
      return
    }
  }

  back(): void {
    this.router.navigate(['/'])
  }
}

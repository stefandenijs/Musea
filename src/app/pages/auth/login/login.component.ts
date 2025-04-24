import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  submitted: boolean = false
  loading: boolean = false

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
      password: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid) {
      this.loading = true
      const email = this.form.value.email
      const password = this.form.value.password

      this.subscription = this.authService.login(email, password).subscribe({
        next: () => {
          this.alertService.success("Succesvol ingelogd")
          this.router.navigate(['/'])
          this.loading = false
        },
        error: (err) => {
          console.log(`Error: ${err.status} ${err.message}`)
          console.log(err)
          if (err.status === 401) {
            this.alertService.error("Login informatie klopt niet")
            this.error = 'Login informatie klopt niet'
          } else if (err.status === 404) {
            this.alertService.error("Geen account bestaat op dit email")
            this.error = 'Geen account bestaat op dit email'
          } else {
            this.alertService.error("Login kon niet worden verwerkt. Probeer het later opnieuw.")
          }
          this.loading = false
        }
      })
      this.submitted = false
    } else {
      return
    }
  }
}

import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { ProfileService } from 'src/app/entity/profile/profile.service'
import { Gender, GenderLabel, User } from 'src/app/entity/user/user.model'
import { UserService } from 'src/app/entity/user/user.service'
import { AlertService } from 'src/app/shared/alert.service'
import { notInFuture } from 'src/app/shared/not-in-future.validator'

@Component({
  selector: 'app-profile-detail-edit',
  templateUrl: './profile-detail-edit.component.html',
  styles: []
})
export class ProfileDetailEditComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  user!: User
  submitted: boolean = false
  saving: boolean = false
  subscription!: Subscription
  subscriptionCreateUpdate!: Subscription
  error: String | undefined

  public GenderLabel = GenderLabel
  public genders = Object.values(Gender)

  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required, notInFuture]]
    })

    this.subscription = this.loggedInUser$.subscribe((user) => {
      console.log(user)
      this.user = user!
      this.form.patchValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        gender: user?.gender,
        birthDate: this.datePipe.transform(user?.birthDate, 'yyyy-MM-dd')
      })
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
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
      if (this.user != null) {
        this.subscriptionCreateUpdate = this.profileService
          .update({ _id: this.user._id, ...this.form.value })
          .subscribe({
            next: () => {
              this.alertService.success('Gegevens succesvol gewijzigd')
              this.authService.getLoggedInUser()
              this.router.navigate(['/profile/details'])
            },
            error: (err) => {
              this.saving = false
              console.log(err.status)
              if (err.status === 409) {
                this.alertService.error('Email is al in gebruik')
                this.error = `Het email ${this.form.value.email} is al in gebruik.`
                console.log(this.error)
              } else if (err.status) {
                this.alertService.error('Gegevens konden niet gewijzigd worden. Probeer het opnieuw later.')
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

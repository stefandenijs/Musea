import { DatePipe } from '@angular/common'
import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Exhibition } from 'src/app/entity/exhibition/exhibition.model'
import { ExhibitionService } from 'src/app/entity/exhibition/exhibition.service'
import { AlertService } from 'src/app/shared/alert.service'
import { validateEndDate } from 'src/app/shared/end-date.validator'
import { validateEndTime } from 'src/app/shared/end-time.validator'

@Component({
  selector: 'app-exhibition-edit',
  templateUrl: './exhibition-edit.component.html',
  styles: []
})
export class ExhibitionEditComponent implements OnInit {
  museumId: string | null = null
  exhibitionId: string | null = null
  exhibition: Exhibition | undefined = undefined
  submitted: boolean = false
  saving: boolean = false
  subscriptionRead!: Subscription
  subscriptionCreateUpdate!: Subscription
  error: String | undefined

  form!: FormGroup

  httpOptions: any

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exhibitionService: ExhibitionService,
    private alertService: AlertService,
    private authService: AuthService,
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
    this.route.paramMap.subscribe((params) => {
      this.museumId = params.get('museumId')
      this.exhibitionId = params.get('exhibitionId')
    })

    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        theme: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0)]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        dayStartTime: ['', [Validators.required]],
        dayEndTime: ['', [Validators.required]],
        imgUrl: ['', [Validators.required]]
      },
      { validators: [validateEndDate, validateEndTime] }
    )

    if (this.exhibitionId != null) {
      console.log(this.museumId)
      this.subscriptionRead = this.exhibitionService.read(this.exhibitionId).subscribe((exhibition) => {
        this.exhibition = exhibition
        console.log(this.exhibition.description)
        this.form.setValue({
          name: this.exhibition.name,
          description: this.exhibition.description,
          theme: this.exhibition.theme,
          price: this.exhibition.price,
          startDate: this.datePipe.transform(this.exhibition.startDate, 'yyyy-MM-dd'),
          endDate: this.datePipe.transform(this.exhibition.endDate, 'yyyy-MM-dd'),
          dayStartTime: this.exhibition.dayStartTime,
          dayEndTime: this.exhibition.dayEndTime,
          imgUrl: this.exhibition.imgUrl
        })
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
      if (this.exhibitionId != null) {
        this.subscriptionRead = this.exhibitionService
          .update({ _id: this.exhibitionId, ...this.form.value }, this.httpOptions)
          .subscribe({
            next: () => {
              this.alertService.success('Tentoonstelling gewijzigd')
              this.router.navigate([
                '/museums',
                this.exhibition?.museum?._id,
                'exhibitions',
                this.exhibitionId
              ])
            },
            error: (err) => {
              console.log(err)
              this.saving = false
              if (err.status === 409) {
                this.alertService.error('Naam is al in gebruik')
                this.error = `De naam ${this.form.value.name} is al in gebruik.`
                console.log(this.error)
              } else if (err.status === 500) {
                this.alertService.error('Museum kon niet gewijzigd worden. Probeer het later opnieuw.')
              }
            }
          })
      } else {
        this.subscriptionRead = this.exhibitionService
          .create({ ...this.form.value, museum: this.museumId }, this.httpOptions)
          .subscribe({
            next: () => {
              this.alertService.success('Tentoonstelling toegevoegd')
              this.router.navigate(['../..'])
            },
            error: (err) => {
              console.log(err)
              this.saving = false
              if (err.status === 409) {
                this.alertService.error('Naam is al in gebruik')
                this.error = `De naam ${this.form.value.name} is al in gebruik.`
                console.log(this.error)
              } else if (err.status === 500) {
                this.alertService.error('Museum kon niet gewijzigd worden. Probeer het later opnieuw.')
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
    this.router.navigate(['../..'], { relativeTo: this.route })
  }
}

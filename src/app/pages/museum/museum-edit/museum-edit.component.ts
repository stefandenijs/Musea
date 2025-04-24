import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Museum } from 'src/app/entity/museum/museum.model'
import { MuseumService } from 'src/app/entity/museum/museum.service'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-museum-edit',
  templateUrl: './museum-edit.component.html',
  styles: []
})
export class MuseumEditComponent implements OnInit {
  museumId: string | null = null
  museum: Museum | undefined = undefined
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
    private museumService: MuseumService,
    private alertService: AlertService,
    private authService: AuthService
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
    })

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)]],
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]]
    })

    if (this.museumId != null) {
      console.log(this.museumId)
      this.subscriptionRead = this.museumService.read(this.museumId).subscribe((museum) => {
        this.museum = museum
        console.log(this.museum.description)
        this.form.setValue({
          name: this.museum.name,
          description: this.museum.description,
          city: this.museum.city,
          street: this.museum.street,
          streetNumber: this.museum.streetNumber,
          postalCode: this.museum.postalCode,
          phoneNumber: this.museum.phoneNumber,
          website: this.museum.website,
          imgUrl: this.museum.imgUrl
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
      if (this.museumId != null) {
        this.subscriptionRead = this.museumService
          .update({ _id: this.museumId, ...this.form.value }, this.httpOptions)
          .subscribe({
            next: () => {
              this.alertService.success('Museum gewijzigd')
              this.router.navigate(['/museums', this.museumId])
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
        this.subscriptionRead = this.museumService.create({ ...this.form.value }, this.httpOptions).subscribe({
          next: () => {
            this.alertService.success('Museum toegevoegd')
            this.router.navigate(['/museums'])
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
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}

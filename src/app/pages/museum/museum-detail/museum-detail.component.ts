import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Exhibition } from 'src/app/entity/exhibition/exhibition.model'
import { ExhibitionService } from 'src/app/entity/exhibition/exhibition.service'
import { Museum } from 'src/app/entity/museum/museum.model'
import { MuseumService } from 'src/app/entity/museum/museum.service'
import { User } from 'src/app/entity/user/user.model'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-museum-detail',
  templateUrl: './museum-detail.component.html',
  styles: []
})
export class MuseumDetailComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined = undefined
  exhibitions: Exhibition[] | null = null
  museumId: string | null = null
  museum: Museum | null = null
  loading: boolean = false
  exhLoading: boolean = false
  deleting: boolean = false
  subscriptionRead!: Subscription
  subscriptionExhibitionRead!: Subscription
  subscriptionDelete!: Subscription

  httpOptions: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private museumService: MuseumService,
    private exhibitionService: ExhibitionService,
    private authService: AuthService,
    private alertService: AlertService
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
    this.loggedInUser$ = this.authService.currentUser$
    this.route.paramMap.subscribe((params) => {
      this.museumId = params.get('museumId')
      console.log(this.museumId)
      if (this.museumId) {
        this.loading = true
        this.subscriptionRead = this.museumService.read(this.museumId).subscribe({
          next: (museum) => {
            this.exhLoading = true
            this.museum = museum
            console.log(`Museum: ${this.museum}`)
            this.subscriptionExhibitionRead = this.exhibitionService.list({ museum: museum._id }).subscribe({
              next: (exhibitions) => {
                console.log(exhibitions)
                this.exhibitions = exhibitions
                this.exhLoading = false
              },
              error: (err) => {
                console.log(err)
                this.exhLoading = false
              }
            })
            this.loading = false
          },
          error: (err) => {
            console.log(err)
            this.loading = false
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionRead) {
      this.subscriptionRead.unsubscribe()
    }
    if (this.subscriptionExhibitionRead) {
      this.subscriptionExhibitionRead.unsubscribe()
    }
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe()
    }
  }

  deleteMuseum(): void {
    if (this.museum) {
      this.deleting = true
      this.subscriptionDelete = this.museumService.delete(this.museum._id!, this.httpOptions).subscribe({
        next: () => {
          this.alertService.success('Museum succesvol verwijderd')
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error: (err) => {
          this.alertService.error('Kan museum niet verwijderen. Probeer het later opnieuw')
          this.deleting = false
          console.log(err)
        }
      })
    }
  }
}

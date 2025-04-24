import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Exhibition } from 'src/app/entity/exhibition/exhibition.model'
import { ExhibitionService } from 'src/app/entity/exhibition/exhibition.service'
import { TicketStatus } from 'src/app/entity/ticket/ticket.model'
import { TicketService } from 'src/app/entity/ticket/ticket.service'
import { User } from 'src/app/entity/user/user.model'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styles: []
})
export class ExhibitionDetailComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined = undefined
  museumId: string | null = null
  exhibitionId: string | null = null
  exhibition: Exhibition | null = null
  loading: boolean = false
  deleting: boolean = false

  userSub!: Subscription
  subscription!: Subscription
  subscriptionDelete!: Subscription
  subscriptionTicket!: Subscription

  httpOptions: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exhibitionService: ExhibitionService,
    private authService: AuthService,
    private ticketService: TicketService,
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
      this.exhibitionId = params.get('exhibitionId')
      if (this.museumId && this.exhibitionId) {
        this.loading = true
        this.subscription = this.exhibitionService.read(this.exhibitionId).subscribe({
          next: (exhibition) => {
            this.exhibition = exhibition
            console.log(`Exhibition: ${this.exhibition}`)
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
    if (this.userSub) {
      this.userSub.unsubscribe()
    }
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe()
    }
    if (this.subscriptionTicket) {
      this.subscriptionTicket.unsubscribe()
    }
  }

  delete(): void {
    if (this.exhibition) {
      this.deleting = true
      this.subscriptionDelete = this.exhibitionService.delete(this.exhibition._id!, this.httpOptions).subscribe({
        next: () => {
          this.alertService.success('Tentoonstelling verwijderd')
          this.router.navigate(['../..'], { relativeTo: this.route })
        },
        error: (err) => {
          this.alertService.success('Tentoonstelling kon niet verwijderd worden. Probeer het later opnieuw')
          this.deleting = false
          console.log(err)
        }
      })
    }
  }

  buyTicket(): void {
    this.userSub = this.loggedInUser$!.subscribe({
      next: (user) => {
        const usr = user
        this.subscriptionTicket = this.ticketService
          .buyTicket({
            status: TicketStatus.completed,
            user: usr!._id,
            exhibition: this.exhibition?._id,
            priceAtPurchase: this.exhibition?.price
          }, this.httpOptions)
          .subscribe({
            next: () => {
              this.alertService.success('Ticket aankoop succesvol afgerond.')
            },
            error: (err) => {
              this.alertService.error('Ticket aankoop kon niet afgerond worden. Probeer het later opniuew.')
              console.log(err)
            }
          })
      },
      error: (err) => console.log(err)
    })
  }
}

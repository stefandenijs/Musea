import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Ticket, TicketStatus } from 'src/app/entity/ticket/ticket.model'
import { TicketService } from 'src/app/entity/ticket/ticket.service'
import { User } from 'src/app/entity/user/user.model'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-profile-tickets',
  templateUrl: './profile-tickets.component.html',
  styles: []
})
export class ProfileTicketsComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  tickets: Ticket[] | null = null
  saving: boolean = false
  subscriptionUser!: Subscription
  subscriptionTickets!: Subscription
  subscriptionRefundTicket!: Subscription

  httpOptions: any

  constructor(
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
    this.subscriptionUser = this.loggedInUser$.subscribe({
      next: (usr) => {
        this.subscriptionTickets = this.ticketService.list({ user: usr?._id }, this.httpOptions).subscribe({
          next: (tickets) => {
            this.tickets = tickets
          },
          error: (err) => console.log(err)
        })
      },
      error: (err) => console.log(err)
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe()
    }
    if (this.subscriptionTickets) {
      this.subscriptionTickets.unsubscribe()
    }
    if (this.subscriptionRefundTicket) {
      this.subscriptionRefundTicket.unsubscribe()
    }
  }

  refundTicket(ticket: Ticket): void {
    ticket.status = TicketStatus.refunded
    this.saving = true
    this.subscriptionRefundTicket = this.ticketService.update(ticket, this.httpOptions).subscribe({
      next: () => {
        this.alertService.success('Ticket succesvol geretourneerd')
        this.saving = false
      },
      error: (err) => {
        this.alertService.error('Kon ticket niet retourneren. Probeer het later opnieuw')
        this.saving = false
        console.log(err)
      }
    })
  }
}

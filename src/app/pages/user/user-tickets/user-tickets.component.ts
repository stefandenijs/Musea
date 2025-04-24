import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { DataService } from 'src/app/entity/data.service'
import { Ticket, TicketStatus } from 'src/app/entity/ticket/ticket.model'
import { TicketService } from 'src/app/entity/ticket/ticket.service'
import { User } from 'src/app/entity/user/user.model'
import { AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styles: []
})
export class UserTicketsComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>
  user: User | null = null
  tickets: Ticket[] | null = null
  saving: boolean = false
  cancelling: boolean = false
  subscriptionUser!: Subscription
  subscriptionTickets!: Subscription
  subscriptionRefundTicket!: Subscription

  httpOptions: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ticketService: TicketService,
    private dataService: DataService,
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
    this.user = this.dataService.getData()
    this.loggedInUser$ = this.authService.currentUser$
    this.subscriptionUser = this.loggedInUser$.subscribe({
      next: (usr) => {
        if (!this.authService.isAuthenticated() || (usr?.role !== 'admin' && usr?.role !== 'staff')) {
          this.router.navigate(['..'], { relativeTo: this.route })
        } else {
          this.subscriptionTickets = this.ticketService
            .list({ user: this.user?._id }, this.httpOptions)
            .subscribe({
              next: (tickets) => {
                this.tickets = tickets
              },
              error: (err) => console.log(err)
            })
        }
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
        this.saving = false
        this.alertService.success('Ticket succesvol geretourneerd')
      },
      error: (err) => {
        this.alertService.error('Kon ticket niet retourneren. Probeer het later opnieuw')
        this.saving = false
        console.log(err)
      }
    })
  }

  cancelTicket(ticket: Ticket): void {
    ticket.status = TicketStatus.cancelled
    this.saving = true
    this.subscriptionRefundTicket = this.ticketService.update(ticket, this.httpOptions).subscribe({
      next: () => {
        this.saving = false
        this.alertService.success('Ticket succesvol geretourneerd')
      },
      error: (err) => {
        this.alertService.error('Kon ticket niet retourneren. Probeer het later opnieuw')
        this.saving = false
        console.log(err)
      }
    })
  }
}

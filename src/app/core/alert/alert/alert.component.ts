import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Alert, AlertService } from 'src/app/shared/alert.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {
  alert: Alert | null = null
  staticAlertClosed = true
  subscription!: Subscription

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe((alert) => {
      this.alert = alert
      this.staticAlertClosed = false
      setTimeout(() => (this.staticAlertClosed = true), 6000)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

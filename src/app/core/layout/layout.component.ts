import { Component } from '@angular/core'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
    `
      .container {
        margin-top: 80px;
      }
    `
  ]
})
export class LayoutComponent {
  title = 'Musea'
}

import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Exhibition } from 'src/app/entity/exhibition/exhibition.model'
import { ExhibitionService } from 'src/app/entity/exhibition/exhibition.service'

@Component({
  selector: 'app-exhibition-list',
  templateUrl: './exhibition-list.component.html',
  styles: []
})
export class ExhibitionListComponent implements OnInit {
  exhibitions: Exhibition[] | null = []
  loading: boolean = false
  subscription!: Subscription

  constructor(private exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.loading = true
    this.subscription = this.exhibitionService.list(undefined).subscribe({
      next: (exhibitions) => {
        this.exhibitions = exhibitions
        console.log(`Exhibitions: ${this.exhibitions}`)
        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      }
    })}
}

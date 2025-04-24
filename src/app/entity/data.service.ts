import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { User } from './user/user.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data: any

  constructor() {}

  getData(): any {
    return this.data
  }

  setData(data: any): void {
    this.data = data
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { EntityService } from '../entity.service'
import { Museum } from './museum.model'

@Injectable({
  providedIn: 'root'
})
export class MuseumService extends EntityService<Museum> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl, 'museum')
  }
}

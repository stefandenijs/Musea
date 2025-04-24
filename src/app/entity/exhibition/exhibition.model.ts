import { Entity } from '../entity.model'
import { Museum } from '../museum/museum.model'

export class Exhibition extends Entity {
  name: string = ''
  description: string = ''
  theme: string = ''
  price: number = 0
  startDate: Date | null = null
  endDate: Date | null = null
  dayStartTime: Date | null = null
  dayEndTime: Date | null = null
  imgUrl: string = ''
  museum: Museum | null = null

  constructor(_id: string) {
    super(_id)
  }
}

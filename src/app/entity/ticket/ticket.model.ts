import { Entity } from '../entity.model'
import { Exhibition } from '../exhibition/exhibition.model'

export enum TicketStatus {
  completed = 'Afgerond',
  cancelled = 'Geannuleerd',
  refunded = 'Geretourneerd'
}

export class Ticket extends Entity {
  dateOfPurchase: Date | null = null
  status: TicketStatus | null = null
  priceAtPurchase: number = 0
  exhibition: Exhibition | null = null

  constructor(_id: string) {
    super(_id)
  }
}

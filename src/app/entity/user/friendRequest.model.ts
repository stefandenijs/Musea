import { Entity } from '../entity.model'
import { User } from './user.model'

export class FriendRequest extends Entity {
  sender: User | null = null

  constructor(_id: string) {
    super(_id)
  }
}

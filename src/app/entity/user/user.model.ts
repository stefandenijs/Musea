import { Entity } from '../entity.model'
import { Museum } from '../museum/museum.model'
import { FriendRequest } from './friendRequest.model'

export enum UserRole {
  admin = 'admin',
  staff = 'staff',
  general = 'general'
}

export enum Gender {
  male = 'Man',
  female = 'Vrouw',
  other = 'Anders'
}

export const GenderLabel: Record<Gender, string> = {
  [Gender.male]: 'Man',
  [Gender.female]: 'Vrouw',
  [Gender.other]: 'Anders'
}

export class User extends Entity {
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  gender: Gender | null = null
  birthDate: Date | null = null
  role: UserRole = UserRole.general
  friendRequests: FriendRequest[] = []
  friends: User[] = []

  constructor(_id: string) {
    super(_id)
  }
}

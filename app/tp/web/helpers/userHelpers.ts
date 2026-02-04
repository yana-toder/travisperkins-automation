import {User} from '../types/User'

export function getFullName(user: User): string {
  return `${user.firstName} ${user.surname}`
}

export function generateValidPassword(): string {
  return 'Qa1!test1'
}

import {User} from '../types/User'

export async function generateUser(): Promise<User> {
  const {faker} = await import('@faker-js/faker')
  return {
    fullName: faker.person.fullName(),
    emailAddress: faker.internet.email(),
    mobileNumber: `07${faker.number.int({
      min: 100000000,
      max: 999999999,
    })}`,
  }
}

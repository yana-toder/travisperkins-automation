import {generateValidPassword} from '../helpers/userHelpers'
import {User} from '../types/User'

export async function generateCheckoutUser(): Promise<User> {
  const {faker} = await import('@faker-js/faker')
  return {
    firstName: faker.person.firstName(),
    surname: faker.person.lastName(),
    emailAddress: faker.internet.email(),
    mobileNumber: `07${faker.number.int({
      min: 100000000,
      max: 999999999,
    })}`,
  }
}

export async function generateRegistrationUser(): Promise<User> {
  const {faker} = await import('@faker-js/faker')

  return {
    firstName: faker.person.firstName(),
    surname: faker.person.lastName(),
    password: generateValidPassword(),
    emailAddress: faker.internet.email(),
    mobileNumber: `07${faker.number.int({
      min: 100000000,
      max: 999999999,
    })}`,
  }
}

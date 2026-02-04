export type User = {
  firstName: string
  surname: string
  password?: string
  emailAddress: string
  mobileNumber: string
  address?: Address
}
export type Address = {
  line1: string
  line2?: string
  town: string
  postalCode: string
}

export type RegisteredUser = User & {
  password: string
  address: Address
}

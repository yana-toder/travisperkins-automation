export type User = {
  firstName: string
  surname: string
  password?: string
  emailAddress: string
  mobileNumber: string
  address: {
    line1: string
    line2?: string
    town: string
    postalCode: string
  }
}

import {test} from './fixtures'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'

test('user can register', async ({guestApp}) => {
  const user = await generateRegistrationUser()
  await guestApp.home.open()
  await guestApp.home.isLoaded()

  await guestApp.registration.goToActivateAccount()
  await guestApp.registration.isLoaded()

  await guestApp.registration.goToCreateAccount()
  await guestApp.registration.createAccountIsLoaded()

  await guestApp.registration.clickOnCreateAccount()

  await guestApp.registration.fillUserDetails(user)

  await guestApp.registration.fillTradeForm()
  await guestApp.registration.submitRegistration()
})

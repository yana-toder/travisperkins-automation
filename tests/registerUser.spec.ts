import {test, expect} from './fixtures'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'
import {Application} from '../app/tp/web/Application'

test('user can register', async ({guestPage}) => {
  const app = new Application(guestPage)
  const user = await generateRegistrationUser()

  await app.home.open()
  await app.home.isLoaded()

  await app.registration.goToActivateAccount()
  await app.registration.isLoaded()

  await app.registration.goToCreateAccount()
  await app.registration.createAccountIsLoaded()

  await app.registration.clickOnCreateAccount()

  await app.registration.fillUserDetails(user)

  await app.registration.fillTradeForm()
  await app.registration.submitRegistration()
})

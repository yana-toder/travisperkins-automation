import {test, expect} from './fixtures'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'

test('user can register', async ({app}) => {
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
  await app.registration.login(user)

  console.log(user)
})

import {test} from './fixtures'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'
import {registerUserViaApi} from '../app/tp/api/registration.api'

test('registered user can checkout hire product', async ({app, request}) => {
  const user = await generateRegistrationUser()

  await registerUserViaApi(request, user)
  await app.login.goToLogin()
  await app.login.waitForIframe()
  await app.login.fillCredentials(user)
  await app.login.submit()
  await app.login.expectUserLoggedIn(user)
})

import {test} from './fixtures'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'
import {registerUserViaApi} from '../app/tp/api/registration.api'

test('registered user can checkout hire product', async ({app, request}) => {
  const user = await generateRegistrationUser()
  console.log(user)

  await registerUserViaApi(request, user)
  await app.registration.goToLogin()
  await app.registration.fillLoginForm(user)
  await app.registration.submitLogin()
})

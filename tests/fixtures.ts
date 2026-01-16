import {test as base} from '@playwright/test'
import {Application} from '../app/tp/web/Application'
import {User} from '../app/tp/web/types/User'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'
import {registerUserViaApi} from '../app/tp/api/registration.api'

type Fixtures = {
  app: Application
  registeredUser: User
}

export const test = base.extend<Fixtures>({
  app: async ({page}, use) => {
    const app = new Application(page)
    await app.home.open()
    await use(app)
  },
  registeredUser: async ({request, app}, use) => {
    const user = await generateRegistrationUser()
    await registerUserViaApi(request, user)
    await app.login.goToLogin()
    await app.login.waitForIframe()
    await app.login.fillCredentials(user)
    await app.login.submit()
    await app.login.expectUserLoggedIn(user)
    await use(user)
  },
})

export {expect} from '@playwright/test'

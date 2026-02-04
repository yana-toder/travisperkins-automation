import {test} from '@playwright/test'
import {generateRegistrationUser} from '../app/tp/web/utils/user.factory'
import {registerUserViaApi} from '../app/tp/api/registration.api'
import {Application} from '../app/tp/web/Application'
import fs from 'fs'

test('register and login user', async ({browser, request}) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/cookies.json',
  })
  const page = await context.newPage()
  const app = new Application(page)

  const user = await generateRegistrationUser()
  await registerUserViaApi(request, user)
  await app.login.goToLogin()
  await app.login.waitForIframe()
  await app.login.fillCredentials(user)
  await app.login.submit()
  await app.login.expectUserLoggedIn(user)

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  })

  fs.mkdirSync('playwright/.auth', {recursive: true})
  fs.writeFileSync(
    'playwright/.auth/user-data.json',
    JSON.stringify(user, null, 2),
  )
})

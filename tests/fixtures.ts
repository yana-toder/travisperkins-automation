import {test as base, Page, BrowserContext} from '@playwright/test'
import {Application} from '../app/tp/web/Application'

//type OpenPageFixture = {
//  app: Application
//}

//export const open = base.extend<OpenPageFixture>({
//  app: async ({page}, use) => {
//    const app = new Application(page)
//    await app.home.open()
//    await use(app)
//  },
//})

type AuthFixtures = {
  guestApp: Application
  authenticatedApp: Application
}

export const test = base.extend<AuthFixtures>({
  guestApp: async ({browser}, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/cookies.json',
    })
    const page = await context.newPage()
    const app = new Application(page)
    await app.home.open()
    await use(app)

    await context.close()
  },

  authenticatedApp: async ({browser}, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/user.json',
    })
    const page = await context.newPage()
    const app = new Application(page)
    await app.home.open()
    await use(app)

    await context.close()
  },
})

export {expect} from '@playwright/test'

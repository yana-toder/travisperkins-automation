import {test as base} from '@playwright/test'
import {Application} from '../app/tp/web/Application'

type Fixtures = {
  app: Application
}

export const test = base.extend<Fixtures>({
  app: async ({page}, use) => {
    const app = new Application(page)

    await app.home.open()

    await use(app)
  },
})

export {expect} from '@playwright/test'

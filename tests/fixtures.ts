import {HomePage} from '../app/tp/web/pages/HomePage'
import {test as base} from '@playwright/test'

type Fixtures = {
  homePage: HomePage
}

export const test = base.extend<Fixtures>({
  homePage: async ({page}, use) => {
    const home = new HomePage(page)

    await home.open()

    await use(home)
  },
})

export {expect} from '@playwright/test'

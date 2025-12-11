import {HomePage} from '../app/tp/web/pages/HomePage'
import {test as base} from '@playwright/test'

type Fixtures = {
  homePage: HomePage
}

export const test = base.extend<Fixtures>({
  homePage: async ({page}, use) => {
    const home = new HomePage(page)

    await home.open()

    await home.acceptCookies()

    const targetPostalCode = 'NN5 5JR'

    await home.deliveryPopup.fillDeliveryPopup(targetPostalCode)

    await use(home)
  },
})

export {expect} from '@playwright/test'

import {test as setup, expect} from '@playwright/test'
import path from 'path'

const cookiesFile = path.join(__dirname, '../playwright/.auth/cookies.json')

setup('setup: accept cookies and close address modal', async ({page}) => {
  await page.goto('/')

  await page.click('#onetrust-accept-btn-handler')

  const deliveryPopup = page.getByTestId('delivery-address-popup')
  const targetPostalCode = 'NN5 5JR'

  await deliveryPopup
    .getByTestId('input-post-code')
    .getByTestId('input-component')
    .fill(targetPostalCode)

  await page
    .getByTestId('address-item')
    .filter({hasText: targetPostalCode})
    .click()

  await page.getByTestId('apply-delivery-address').click()

  await page.context().storageState({
    path: cookiesFile,
  })
})

import {test as setup, expect} from '@playwright/test'
import path from 'path'

const cookiesFile = path.join(__dirname, '../tests/fixtures.ts')

setup('setup: accept cookies and close address modal', async ({page}) => {
  await page.goto('/')

  // Accept cookies
  await page.click('#onetrust-accept-btn-handler')

  //
  const deliveryPopup = page.getByTestId('delivery-address-popup')
  await deliveryPopup.waitFor({state: 'visible', timeout: 5000})

  const targetPostalCode = 'NN5 5JR'

  // Enter value in popup
  await deliveryPopup
    .getByTestId('input-post-code')
    .getByTestId('input-component')
    .fill(targetPostalCode)

  //Select address
  await page
    .getByTestId('address-item')
    .filter({hasText: targetPostalCode})
    .click()

  // Apply
  await page.getByTestId('apply-delivery-address').click()

  // Save state
  await page.context().storageState({
    path: cookiesFile,
  })
})

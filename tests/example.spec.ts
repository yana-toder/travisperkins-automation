import {test, expect} from '@playwright/test'

const searchValue = 'garden'

test('add product to quote list flow', async ({page}) => {
  await page.goto('/')

  await page.locator('[id="onetrust-accept-btn-handler"]').click()

  await page.locator('data-test-id=close-button').click()

  await page.locator('data-test-id=input-component').fill(searchValue)

  await page.locator('data-test-id=suggested-search').first().click()

  await expect(page.locator('h1')).toContainText(searchValue)

  //go to the product page and comparing title

  const productTitleOnCard = await page
    .locator('data-test-id=product-card-title')
    .innerText()

  await page.locator('data-test-id=product').click()

  const productTitleOnPage = await page
    .locator('data-test-id=product-name')
    .innerText()

  expect((await productTitleOnCard).trim()).toEqual(
    (await productTitleOnPage).trim()
  )

  //add product to the quote list
  await page.locator('data-test-id=add-to-quote-list').click()

  expect(page.locator('data-test-id=quote-list-button')).toBeVisible()

  await page.locator('data-test-id=quote-list-button').click()

  // verify product appears in quote list
  await expect(page.locator('data-test-id=product-name')).toContainText(
    productTitleOnPage
  )
})

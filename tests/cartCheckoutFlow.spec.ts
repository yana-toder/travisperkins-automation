import {test, expect} from '@playwright/test'
import {HomePage} from '../app/tp/web/pages/HomePage'
import {SearchResultPage} from '../app/tp/web/pages/SearchResultPage'

test('cart checkout flow', async ({page}) => {
  const homePage = new HomePage(page)
  const searchResultPage = new SearchResultPage(page)

  await homePage.open()
  await homePage.isLoaded()

  // search flow
  const targetQuery = 'screw'
  await homePage.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitle = await searchResultPage.openProductFromList()
  await searchResultPage.isLoaded()
  await searchResultPage.verifyProductTitleOnPDP(productTitle)

  //add to collection
  const productDetailContainer = page.getByTestId('product-detail')
  await expect(
    productDetailContainer.getByTestId('add-to-collection-btn')
  ).toBeVisible()
  const productPriceOnPDP = await page.getByTestId('main-price').innerText()
  const priceValue = productPriceOnPDP.match(/\d+([.,]\d{2})?/)![0]
  await productDetailContainer.getByTestId('add-to-collection-btn').click()

  //fill collection branch
  const targetPostalCode = 'NN5 5JR'
  await page
    .getByTestId('location-input-wr')
    .getByTestId('input-component')
    .fill(targetPostalCode)
  await page
    .getByTestId('address-item')
    .filter({hasText: targetPostalCode})
    .click()

  await page.getByTestId('branch-details-wrapper').first().click()

  //add to collect

  await productDetailContainer.getByTestId('add-to-collection-btn').click()

  await expect(page.getByTestId('add-to-basket-popup-wrapper')).toBeVisible()

  await expect(
    page.getByTestId('add-to-basket-popup-wrapper').getByTestId('product-name')
  ).toContainText(productTitle)
  await expect(
    page.getByTestId('add-to-basket-popup-wrapper').getByTestId('product-price')
  ).toContainText(priceValue)

  //go to basket
  await page.getByTestId('go-to-basket-button').click()
  await expect(page.getByTestId('basket-page-wr')).toBeVisible()
  await expect(
    page.getByTestId('mini-basket-icon').getByTestId('miniBasket-basket-count')
  ).toBeVisible()
  await expect(
    page.getByTestId('product-info').getByTestId('product-name')
  ).toContainText(productTitle)
  await expect(page.getByTestId('product-info').locator('h5')).toContainText(
    priceValue
  )
})

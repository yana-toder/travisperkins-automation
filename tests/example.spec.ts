import {test, expect} from './fixtures'

import {SearchResultPage} from '../app/tp/web/pages/SearchResultPage'

const targetQuery = 'screw'

test('add product to quote list flow', async ({page, homePage}) => {
  //const homePage = new HomePage(page)
  const searchResultPage = new SearchResultPage(page)

  await homePage.isLoaded()

  // close address
  //  const targetPostalCode = 'NN5 5JR'

  //  await homePage.deliveryPopup.fillDeliveryPopup(targetPostalCode)

  // search flow
  await homePage.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitleOnCard = await searchResultPage.openProductFromList()
  await searchResultPage.isLoaded()
  await searchResultPage.verifyProductTitleOnPDP(productTitleOnCard)

  //add product to the quote list
  await searchResultPage.addForCollectionFirstProduct()
  await searchResultPage.addVariantToQuote.isLoaded()

  //open quote list
  await searchResultPage.addVariantToQuote.openQuoteList(page)
  await searchResultPage.verifyProductTitleOnQuoteList(productTitleOnCard)

  //remove product from quote list
  await searchResultPage.removeProductFromQuoteList()
})

test('check menu list', async ({page}) => {
  await page.goto('/')

  // accepted all
  await page.locator('[id="onetrust-accept-btn-handler"]').click()
  // close address
  await page.getByTestId('close-button').click()

  let expectedMenuItems = [
    'Building Materials',
    'Timber & Sheet Materials',
    'Gardens & Landscaping',
    'Doors, Windows & Joinery',
    'Decorating & Interiors',
    'Plumbing',
    'Heating',
    'Bathrooms',
    'Electrical & Lighting',
    'Fixings & Adhesives',
    'Tools & Workwear',
    'Benchmarx Kitchens',
    'Hire',
    'Deals',
  ]

  // loaded menu
  const menuLinks = page.getByTestId('header-nav-menu')

  //check each menu item
  for (const item of expectedMenuItems)
    await expect(menuLinks.filter({hasText: item})).toBeVisible()
})

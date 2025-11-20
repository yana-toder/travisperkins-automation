import {test, expect, Page} from '@playwright/test'

const searchValue = 'garden'

test('add product to quote list flow', async ({page}) => {
  await page.goto('/')

  // accepted all
  await page.locator('[id="onetrust-accept-btn-handler"]').click()
  // close address
  await page.getByTestId('close-button').click()

  // search flow
  await searchProduct(page, searchValue)

  //open product and compare titles
  const productTitleOnCard = await openProductFromList(page)
  await verifyProductTitle(page, productTitleOnCard)

  //add product to the quote list
  await addToQuoteList(page)

  //open quote list
  await openQuoteList(page)
  await verifyProductTitle(page, productTitleOnCard)

  //remove product from quote list
  await page.getByTestId('remove-button').click()
  await expect(page.getByTestId('empty-quote-list')).toContainText(
    'Your quote list is empty'
  )
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

// functions

async function searchProduct(page: Page, searchValue: string) {
  await page.getByTestId('input-component').fill(searchValue)
  await page.getByTestId('suggested-search').first().click()
  await expect(page.locator('h1')).toContainText(searchValue)
}

async function openProductFromList(page: Page) {
  const title = await page.getByTestId('product-card-title').innerText()
  await page.getByTestId('product').click()
  return title.trim()
}

async function verifyProductTitle(page: Page, title: string) {
  await expect(page.getByTestId('product-name')).toContainText(title)
}

async function addToQuoteList(page: Page) {
  await page.getByTestId('add-to-quote-list').click()
  await expect(page.getByTestId('quote-list-button')).toBeVisible()
}

async function openQuoteList(page: Page) {
  await page.getByTestId('quote-list-button').click()
}

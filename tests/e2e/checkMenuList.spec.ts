import test, {expect} from '@playwright/test'

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

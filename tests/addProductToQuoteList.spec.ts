import {test} from './fixtures'

const targetQuery = 'screw'

test('add product to quote list flow', async ({guestApp}) => {
  await guestApp.home.open()
  await guestApp.home.isLoaded()

  // search flow
  await guestApp.home.searchWrapper.searchProduct(targetQuery)

  const productTitleOnCard = await guestApp.searchResult.getFirstProductTitle()
  await guestApp.searchResult.openFirstProduct()
  await guestApp.searchResult.verifyProductTitleOnPDP(productTitleOnCard)

  //add product to the quote list
  await guestApp.searchResult.addForCollection()
  await guestApp.searchResult.addVariantToQuote.isLoaded()

  //open quote list
  await guestApp.searchResult.addVariantToQuote.openQuoteList()
  await guestApp.searchResult.verifyProductTitleOnQuoteList(productTitleOnCard)

  //remove product from quote list
  await guestApp.searchResult.removeProductFromQuoteList()
})

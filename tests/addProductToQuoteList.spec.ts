import {test} from './fixtures'

const targetQuery = 'screw'

test('add product to quote list flow', async ({guestApp}) => {
  await guestApp.home.isLoaded()

  // search flow
  await guestApp.home.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitleOnCard = await guestApp.searchResult.openProductFromList()
  await guestApp.searchResult.isLoaded()
  await guestApp.searchResult.verifyProductTitleOnPDP(productTitleOnCard)

  //add product to the quote list
  await guestApp.searchResult.addForCollectionFirstProduct()
  await guestApp.searchResult.addVariantToQuote.isLoaded()

  //open quote list
  await guestApp.searchResult.addVariantToQuote.openQuoteList()
  await guestApp.searchResult.verifyProductTitleOnQuoteList(productTitleOnCard)

  //remove product from quote list
  await guestApp.searchResult.removeProductFromQuoteList()
})

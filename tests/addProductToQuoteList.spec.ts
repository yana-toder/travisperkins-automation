import {test} from './fixtures'

const targetQuery = 'screw'

test('add product to quote list flow', async ({app}) => {
  await app.home.isLoaded()

  // search flow
  await app.home.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitleOnCard = await app.searchResult.openProductFromList()
  await app.searchResult.isLoaded()
  await app.searchResult.verifyProductTitleOnPDP(productTitleOnCard)

  //add product to the quote list
  await app.searchResult.addForCollectionFirstProduct()
  await app.searchResult.addVariantToQuote.isLoaded()

  //open quote list
  await app.searchResult.addVariantToQuote.openQuoteList()
  await app.searchResult.verifyProductTitleOnQuoteList(productTitleOnCard)

  //remove product from quote list
  await app.searchResult.removeProductFromQuoteList()
})

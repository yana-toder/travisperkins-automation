import {test, expect} from '../fixtures'

import {SearchResultPage} from '../../app/tp/web/pages/SearchResultPage'

const targetQuery = 'screw'

test('add product to quote list', async ({page, homePage}) => {
  //const homePage = new HomePage(page)
  const searchResultPage = new SearchResultPage(page)

  await homePage.isLoaded()

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

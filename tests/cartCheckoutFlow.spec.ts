import {test, expect} from '@playwright/test'
import {HomePage} from '../app/tp/web/pages/HomePage'
import {SearchResultPage} from '../app/tp/web/pages/SearchResultPage'
import {ProductPage} from '../app/tp/web/pages/ProductPage'
import {AddToCollectionPopup} from '../app/tp/web/components/AddToCollectionPopup'
import {CartPage} from '../app/tp/web/pages/CartPage'
import {CollectionBranchPopup} from '../app/tp/web/components/CollectionBranchPopup'
import {CheckoutPage} from '../app/tp/web/pages/CheckoutPage'
import {generateUser} from '../app/tp/web/utils/user.factory'

test('cart checkout flow', async ({page}) => {
  const homePage = new HomePage(page)
  const searchResultPage = new SearchResultPage(page)
  const productPage = new ProductPage(page)
  const addToCollectionPopup = new AddToCollectionPopup(page)
  const cartPage = new CartPage(page)
  const collectionBranchPopup = new CollectionBranchPopup(page)
  const checkoutPage = new CheckoutPage(page)
  const user = await generateUser()

  //open web
  await homePage.open()
  await homePage.isLoaded()

  // search flow
  const targetQuery = 'screw'
  await homePage.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitle = await searchResultPage.openProductFromList()
  await searchResultPage.isLoaded()
  await searchResultPage.verifyProductTitleOnPDP(productTitle)

  //loaded product page
  await productPage.isLoaded()

  //get price
  const priceValue = await productPage.getProductPriceValue()
  await productPage.addToCollection()

  //fill collection branch
  const targetPostalCode = 'NN5 5JR'
  await collectionBranchPopup.fillCollectionBranchPopup(targetPostalCode)

  //add to collection
  await addToCollectionPopup.openPopup()
  await addToCollectionPopup.isLoaded()

  //check product title in popup
  const productTitleInPopup = await addToCollectionPopup.getProductTitle()
  expect(productTitleInPopup).toContain(productTitle)

  //check product price in popup
  const priceValueInPopup = await addToCollectionPopup.getProductPriceValue()
  expect(priceValueInPopup).toContain(priceValue)

  //go to cart
  await cartPage.open()
  await cartPage.isLoaded()

  //check product title on cart page
  const productTitleOnCartPage = await cartPage.getProductTitle()
  expect(productTitleOnCartPage).toContain(productTitle)

  //check product price on cart page
  const priceValueOnCartPage = await cartPage.getProductPriceValue()
  expect(priceValueOnCartPage).toContain(priceValue)

  // go to checkout page
  await cartPage.goToCheckout()

  //loaded checkout page
  await checkoutPage.isLoaded()

  //fill user data
  await checkoutPage.fillUserDetails(user)

  //check filled user data
  await checkoutPage.verifyUserDetailsFilled(user)

  //save user data
  await checkoutPage.saveUserData()

  //check contact info
  await checkoutPage.getContactCardInfo(user)
  const {title, price} = await checkoutPage.getProductSummary()
  expect(title).toContain(productTitle)
  expect(price).toContain(priceValue)
  await checkoutPage.verifyCollectionBranchAddress(targetPostalCode)
})

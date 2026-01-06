import {test, expect} from '@playwright/test'
import {Application} from '../app/tp/web/Application'
import {AddToCollectionPopup} from '../app/tp/web/components/AddToCollectionPopup'
import {CollectionBranchPopup} from '../app/tp/web/components/CollectionBranchPopup'
import {generateUser} from '../app/tp/web/utils/user.factory'

test('cart checkout flow', async ({page}) => {
  const app = new Application(page)
  const addToCollectionPopup = new AddToCollectionPopup(page)
  const collectionBranchPopup = new CollectionBranchPopup(page)
  const user = await generateUser()

  //open web
  await app.home.open()
  await app.home.isLoaded()

  // search flow
  const targetQuery = 'screw'
  await app.home.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitle = await app.searchResult.openProductFromList()
  await app.searchResult.isLoaded()
  await app.searchResult.verifyProductTitleOnPDP(productTitle)

  //loaded product page
  await app.product.isLoaded()

  //get price
  const priceValue = await app.product.getProductPriceValue()
  await app.product.addToCollection()

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
  await app.cart.open()
  await app.cart.isLoaded()

  //check product title on cart page
  const productTitleOnCartPage = await app.cart.getProductTitle()
  expect(productTitleOnCartPage).toContain(productTitle)

  //check product price on cart page
  const priceValueOnCartPage = await app.cart.getProductPriceValue()
  expect(priceValueOnCartPage).toContain(priceValue)

  // go to checkout page
  await app.cart.goToCheckout()

  //loaded checkout page
  await app.checkout.isLoaded()

  //fill user data
  await app.checkout.fillUserDetails(user)

  //check filled user data
  await app.checkout.verifyUserDetailsFilled(user)

  //save user data
  await app.checkout.saveUserData()

  //check contact info
  await app.checkout.getContactCardInfo(user)
  const {title, price} = await app.checkout.getProductSummary()
  expect(title).toContain(productTitle)
  expect(price).toContain(priceValue)
  await app.checkout.verifyCollectionBranchAddress(targetPostalCode)
})

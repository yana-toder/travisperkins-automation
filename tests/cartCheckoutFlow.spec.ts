import {test, expect} from './fixtures'
import {generateCheckoutUser} from '../app/tp/web/utils/user.factory'

test('cart checkout flow', async ({guestApp}) => {
  const user = await generateCheckoutUser()

  //open web
  await guestApp.home.open()
  await guestApp.home.isLoaded()

  // search flow
  const targetQuery = 'screw'
  await guestApp.home.searchWrapper.searchProduct(targetQuery)

  //open product and compare titles
  const productTitle = await guestApp.searchResult.openProductFromList()
  await guestApp.searchResult.isLoaded()
  await guestApp.searchResult.verifyProductTitleOnPDP(productTitle)

  //loaded product page
  await guestApp.product.isLoaded()

  //get price
  const priceValue = await guestApp.product.getProductPriceValue()
  await guestApp.product.addToCollection()

  //fill collection branch
  const targetPostalCode = 'NN5 5JR'
  await guestApp.collectionBranchPopup.fillCollectionBranchPopup(
    targetPostalCode,
  )

  //add to collection
  await guestApp.addToCollectionPopup.openPopup()
  await guestApp.addToCollectionPopup.isLoaded()

  //check product title in popup
  const productTitleInPopup =
    await guestApp.addToCollectionPopup.getProductTitle()
  expect(productTitleInPopup).toContain(productTitle)

  //check product price in popup
  const priceValueInPopup =
    await guestApp.addToCollectionPopup.getProductPriceValue()
  expect(priceValueInPopup).toContain(priceValue)

  //go to cart
  await guestApp.cart.open()
  await guestApp.cart.isLoaded()

  //check product title on cart page
  const productTitleOnCartPage = await guestApp.cart.getProductTitle()
  expect(productTitleOnCartPage).toContain(productTitle)

  //check product price on cart page
  const priceValueOnCartPage = await guestApp.cart.getProductPriceValue()
  expect(priceValueOnCartPage).toContain(priceValue)

  // go to checkout page
  await guestApp.cart.goToCheckout()

  //loaded checkout page
  await guestApp.checkout.isLoaded()

  //fill user data
  await guestApp.checkout.fillUserDetails(user)

  //check filled user data
  await guestApp.checkout.verifyUserDetailsFilled(user)

  //save user data
  await guestApp.checkout.saveUserData()

  //check contact info
  await guestApp.checkout.getContactCardInfo(user)
  const {title, price} = await guestApp.checkout.getProductSummary()
  expect(title).toContain(productTitle)
  expect(price).toContain(priceValue)
  await guestApp.checkout.verifyCollectionBranchAddress(targetPostalCode)
})

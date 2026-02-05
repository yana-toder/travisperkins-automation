import {getFullName} from '../app/tp/web/helpers/userHelpers'
import {getCurrentUser} from '../app/tp/web/utils/currentUser'
import {test} from './fixtures'

test('registered user can checkout hire product', async ({
  authenticatedApp,
}) => {
  const targetPostalCode = 'NN5 5JR'
  const user = getCurrentUser()
  if (!user.address) {
    throw new Error('Registered user must have address')
  }
  const {
    emailAddress,
    mobileNumber,
    address: {line1, town, postalCode},
  } = user

  await authenticatedApp.home.open()
  await authenticatedApp.home.isLoaded()

  await authenticatedApp.hire.open()
  await authenticatedApp.hire.goToProduct()
  const productTitle = await authenticatedApp.hire.getProductTitle()
  const priceValue = await authenticatedApp.hire.getProductPriceValuePerDay()

  await authenticatedApp.hire.addForHire()

  await authenticatedApp.collectionBranchPopup.fillCollectionBranchPopup(
    targetPostalCode,
  )
  await authenticatedApp.hire.addForHire()

  await authenticatedApp.hire.verifyBasketPopup(productTitle, priceValue)
  await authenticatedApp.hire.selectHireDate(3)
  // await authenticatedApp.hire.checkSelectedDate()
  await authenticatedApp.hire.addToDelivery()
  await authenticatedApp.hire.verifyDeliveryPopup(productTitle, priceValue)
  await authenticatedApp.hire.goToHire()
  await authenticatedApp.hireCart.isLoaded()
  await authenticatedApp.hireCart.verifyProductInfo(productTitle, priceValue)
  await authenticatedApp.hireCart.submit()
  await authenticatedApp.hireCheckout.isLoaded()
  await authenticatedApp.hireCheckout.verifyUserNameAndEmail(
    getFullName(user),
    emailAddress.toLowerCase(),
  )
  await authenticatedApp.hireCheckout.fillUserInfo(
    mobileNumber,
    line1,
    town,
    postalCode,
  )
  await authenticatedApp.hireCheckout.verifyUserInfoFilled(
    mobileNumber,
    line1,
    town,
    postalCode,
  )

  await authenticatedApp.hireCheckout.saveInfo()
  await authenticatedApp.hireCheckout.submitOrder()
})

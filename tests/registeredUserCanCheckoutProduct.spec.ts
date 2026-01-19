import {getFullName} from '../app/tp/web/helpers/userHelpers'
import {test} from './fixtures'

test('registered user can checkout hire product', async ({
  app,
  registeredUser,
}) => {
  const targetPostalCode = 'NN5 5JR'
  const {
    firstName,
    surname,
    password = '',
    emailAddress,
    mobileNumber,
    address: {line1, line2, town, postalCode},
  } = registeredUser
  console.log(registeredUser)

  await app.hire.open()
  await app.hire.goToProduct()
  const productTitle = await app.hire.getProductTitle()
  const priceValue = await app.hire.getProductPriceValuePerDay()
  await app.hire.addForHire(targetPostalCode)
  await app.hire.verifyBasketPopup(productTitle, priceValue)
  await app.hire.selectHireDate(3)
  await app.hire.checkSelectedDate()
  await app.hire.addToDelivery()
  await app.hire.verifyDeliveryPopup(productTitle, priceValue)
  await app.hire.goToHire()
  await app.hireCart.isLoaded()
  await app.hireCart.verifyProductInfo(productTitle, priceValue)
  await app.hireCart.submit()
  await app.hireCheckout.isLoaded()
  await app.hireCheckout.verifyUserNameAndEmail(
    getFullName(registeredUser),
    emailAddress.toLowerCase(),
  )
  await app.hireCheckout.fillUserInfo(mobileNumber, line1, town, postalCode)
  await app.hireCheckout.verifyUserInfoFilled(
    mobileNumber,
    line1,
    town,
    postalCode,
  )

  await app.hireCheckout.saveInfo()
  await app.hireCheckout.submitOrder()
})

import {test} from './fixtures'

test('registered user can checkout hire product', async ({
  app,
  registeredUser,
}) => {
  const targetPostalCode = 'NN5 5JR'

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
})

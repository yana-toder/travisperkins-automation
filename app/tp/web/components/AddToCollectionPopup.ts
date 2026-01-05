import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class AddToCollectionPopup {
  constructor(private page: Page) {}

  async openPopup() {
    await this.page
      .getByTestId('product-detail')
      .getByTestId('add-to-collection-btn')
      .click()
  }

  async isLoaded() {
    await expect(
      this.page.getByTestId('add-to-basket-popup-wrapper')
    ).toBeVisible()
  }

  async getProductTitle(): Promise<string> {
    return await this.page
      .getByTestId('add-to-basket-popup-wrapper')
      .getByTestId('product-name')
      .innerText()
  }

  async getProductPriceValue(): Promise<string> {
    const productPrice = await this.page
      .getByTestId('add-to-basket-popup-wrapper')
      .getByTestId('product-price')
      .innerText()
    return extractPriceValue(productPrice)
  }
}

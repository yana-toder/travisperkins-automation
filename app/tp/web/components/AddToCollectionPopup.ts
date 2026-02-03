import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class AddToCollectionPopup {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async openPopup() {
    await this.page
      .getByTestId('product')
      .getByTestId('add-to-collection-btn')
      .first()
      .click()
  }

  async isLoaded() {
    await expect(
      this.page.getByTestId('add-to-basket-popup-wrapper'),
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

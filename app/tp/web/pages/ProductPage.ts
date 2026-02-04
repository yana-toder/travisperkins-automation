import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class ProductPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async isLoaded(): Promise<void> {
    await expect(
      this.page
        .getByTestId('product')
        .getByTestId('add-to-collection-btn')
        .first(),
    ).toBeVisible()
  }

  async getProductPriceValue(): Promise<string> {
    const productPrice = await this.page
      .getByTestId('main-price')
      .first()
      .innerText()
    return extractPriceValue(productPrice)
  }

  async addToCollection(): Promise<void> {
    await this.page
      .getByTestId('product')
      .getByTestId('add-to-collection-btn')
      .first()
      .click()
  }

  async getProductTitleInBasket(): Promise<string> {
    return this.page
      .getByTestId('product-info')
      .getByTestId('product-name')
      .innerText()
  }
}

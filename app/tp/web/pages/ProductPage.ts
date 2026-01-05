import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class ProductPage {
  constructor(private page: Page) {}

  async isLoaded(): Promise<void> {
    await expect(
      this.page
        .getByTestId('product-detail')
        .getByTestId('add-to-collection-btn')
    ).toBeVisible()
  }

  async getProductPriceValue(): Promise<string> {
    const productPrice = await this.page.getByTestId('main-price').innerText()
    return extractPriceValue(productPrice)
  }

  async addToCollection(): Promise<void> {
    await this.page
      .getByTestId('product-detail')
      .getByTestId('add-to-collection-btn')
      .click()
  }

  async getProductTitleInBasket(): Promise<string> {
    return this.page
      .getByTestId('product-info')
      .getByTestId('product-name')
      .innerText()
  }
}

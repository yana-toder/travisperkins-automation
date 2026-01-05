import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class CartPage {
  constructor(private page: Page) {}

  async open(): Promise<void> {
    await this.page.getByTestId('go-to-basket-button').click()
  }

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('basket-page-wr')).toBeVisible()
    await expect(
      this.page
        .getByTestId('mini-basket-icon')
        .getByTestId('miniBasket-basket-count')
    ).toBeVisible()
  }

  async getProductTitle(): Promise<string> {
    return this.page
      .getByTestId('product-info')
      .getByTestId('product-name')
      .innerText()
  }

  async getProductPriceValue(): Promise<string> {
    const productPrice = await this.page
      .getByTestId('product-info')
      .locator('h5')
      .innerText()
    return extractPriceValue(productPrice)
  }
}

import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class HireCartPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async isLoaded() {
    await expect(this.page.getByTestId('basket-card')).toBeVisible()
  }

  async verifyProductInfo(productTitle: string, productPrice: string) {
    await expect(this.page.getByTestId('basket-card-name')).toContainText(
      productTitle,
    )
    const priceValue = await this.page
      .getByTestId('hire-basket-price-period')
      .innerText()
    const price = extractPriceValue(priceValue)

    expect(price).toBe(productPrice)
  }

  async submit() {
    await this.page.getByTestId('btn-submit').click()
  }
}

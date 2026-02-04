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

  async verifyProductInfo(productTitle: string) {
    await expect(this.page.getByTestId('basket-card-name')).toContainText(
      productTitle,
    )
    const price = await this.page
      .getByTestId('hire-basket-price-period')
      .innerText()
    return extractPriceValue(price)
  }

  async submit() {
    await this.page.getByTestId('btn-submit').click()
  }
}

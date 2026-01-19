import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'

export class HireCartPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.getByTestId('basket-card')).toBeVisible()
  }

  async verifyProductInfo(productTitle: string, priceValue: string) {
    await expect(this.page.getByTestId('basket-card-name')).toContainText(
      productTitle
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

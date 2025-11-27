import {expect, Page} from '@playwright/test'

export class AddVariantToQuote {
  constructor(private page: Page) {}

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('product-detail')).toBeVisible()
  }

  async openQuoteList(page: Page) {
    await page.getByTestId('quote-list-button').click()
  }
}

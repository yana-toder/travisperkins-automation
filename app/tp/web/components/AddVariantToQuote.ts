import {expect, Page} from '@playwright/test'

export class AddVariantToQuote {
  constructor(private page: Page) {}

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('product-detail')).toBeVisible()
  }

  async openQuoteList(): Promise<void> {
    await this.page.getByTestId('quote-list-button').click()
  }
}

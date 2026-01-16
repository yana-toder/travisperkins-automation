import {expect, Page} from '@playwright/test'

export class HireCartPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.getByTestId('basket-card')).toBeVisible()
  }
}

import {expect, Page} from '@playwright/test'

export class ProductListPage {
  constructor(private page: Page) {}

  async expectLoadedWith(query: string) {
    await expect(this.page.locator('h1')).toContainText(query)
  }
}

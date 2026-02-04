import {expect, Page} from '@playwright/test'

export class ProductListPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async expectLoadedWith(query: string) {
    await expect(this.page.locator('h1')).toContainText(query)
  }
}

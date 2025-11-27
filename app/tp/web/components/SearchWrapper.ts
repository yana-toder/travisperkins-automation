import {expect, Page} from '@playwright/test'

export class SearchWrapper {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.getByTestId('header-search-button')).toBeVisible()
  }

  async searchProduct(searchValue: string) {
    await this.page
      .getByTestId('header-search-button')
      .getByTestId('input-component')
      .fill(searchValue)
    await this.page.getByTestId('suggested-search').first().click()
    await expect(this.page.locator('h1')).toContainText(searchValue)
  }
}

import {expect, Page} from '@playwright/test'

export class SearchWrapper {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.getByTestId('header-search-button')).toBeVisible()
  }

  async openSearch() {
    await this.page.getByTestId('header-search-button').click()
  }

  async typeSearchValue(searchValue: string) {
    await this.page.getByTestId('input-component').fill(searchValue)
  }

  async submitSearch() {
    await this.page.getByTestId('suggested-search').first().click()
  }

  async searchProduct(searchValue: string) {
    await this.openSearch()
    await this.typeSearchValue(searchValue)
    await this.submitSearch()
  }
}

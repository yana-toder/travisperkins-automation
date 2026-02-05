import {expect, Page} from '@playwright/test'
import {AddVariantToQuote} from '../components/AddVariantToQuote'

export class SearchResultPage {
  readonly addVariantToQuote: AddVariantToQuote
  readonly page: Page
  constructor(page: Page) {
    this.page = page
    this.addVariantToQuote = new AddVariantToQuote(this.page)
  }

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('plp-list')).toBeVisible()
    await expect(
      this.page.getByTestId('product-card-image').first(),
    ).toBeVisible()
  }
  async getFirstProductTitle() {
    const title = await this.page
      .getByTestId('product-card-title')
      .first()
      .innerText()
    return title.trim()
  }

  async openFirstProduct() {
    await this.page
      .getByTestId('plp-list')
      .getByTestId('product-card-image')
      .first()
      .click()
  }

  async verifyProductTitleOnPDP(title: string) {
    await expect(
      this.page.getByTestId('product-name').locator('h1'),
    ).toContainText(title)
  }

  async verifyProductTitleOnQuoteList(title: string) {
    await expect(
      this.page.getByTestId('item-value').getByTestId('product-name'),
    ).toContainText(title)
  }

  async addForCollection() {
    await this.page.getByTestId('add-to-quote-list').click()
    await expect(this.page.getByTestId('count-item')).toBeVisible()
  }
  async removeProductFromQuoteList() {
    await this.page.getByTestId('remove-button').click()
    await expect(this.page.getByTestId('empty-quote-list')).toContainText(
      'Your quote list is empty',
    )
  }
}

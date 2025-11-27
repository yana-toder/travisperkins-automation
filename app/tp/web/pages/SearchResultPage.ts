import {expect, Page} from '@playwright/test'
import {AddVariantToQuote} from '../components/AddVariantToQuote'

export class SearchResultPage {
  readonly addVariantToQuote: AddVariantToQuote

  constructor(private page: Page) {
    this.addVariantToQuote = new AddVariantToQuote(this.page)
  }

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('pdp-wrapper')).toBeVisible()
    await expect(
      this.page.getByTestId('product-image-main').first()
    ).toBeVisible()
  }
  async openProductFromList() {
    const title = await this.page
      .getByTestId('product-card-title')
      .first()
      .innerText()
    await this.page.getByTestId('product').first().click()
    return title.trim()
  }

  async verifyProductTitleOnPDP(title: string) {
    await expect(
      this.page.getByTestId('pdp-wrapper').getByTestId('product-name').first()
    ).toContainText(title)
  }

  async verifyProductTitleOnQuoteList(title: string) {
    await expect(
      this.page.getByTestId('item-value').getByTestId('product-name')
    ).toContainText(title)
  }

  async addForCollectionFirstProduct() {
    await this.page.getByTestId('add-to-quote-list').click()
    await expect(this.page.getByTestId('quote-list-button')).toBeVisible()
  }
  async removeProductFromQuoteList() {
    await this.page.getByTestId('remove-button').click()
    await expect(this.page.getByTestId('empty-quote-list')).toContainText(
      'Your quote list is empty'
    )
  }
}

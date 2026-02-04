import {Page} from '@playwright/test'

export class CollectionBranchPopup {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async fillCollectionBranchPopup(targetPostalCode: string) {
    await this.page
      .getByTestId('location-input-wr')
      .getByTestId('input-component')
      .fill(targetPostalCode)

    await this.page
      .getByTestId('address-item')
      .filter({hasText: targetPostalCode})
      .click()

    await this.page.getByTestId('branch-details-wrapper').first().click()
  }
}

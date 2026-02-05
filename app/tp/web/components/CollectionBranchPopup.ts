import {Page} from '@playwright/test'

export class CollectionBranchPopup {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async fillCollectionBranchPopup(targetPostalCode: string) {
    const popup = this.page.getByTestId('location-input-wr')
    if ((await popup.count()) === 0) {
      return
    }

    await popup.getByTestId('input-component').fill(targetPostalCode)

    await this.page
      .getByTestId('address-item')
      .filter({hasText: targetPostalCode})
      .click()

    await this.page.getByTestId('branch-details-wrapper').first().click()
  }
}

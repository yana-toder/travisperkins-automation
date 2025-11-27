import {Page} from '@playwright/test'

export class DeliveryPopup {
  constructor(private page: Page) {}

  async fillDeliveryPopup(targetPostalCode: string) {
    await this.page
      .getByTestId('delivery-address-popup')
      .getByTestId('input-post-code')
      .getByTestId('input-component')
      .fill(targetPostalCode)

    await this.page
      .getByTestId('address-item')
      .filter({hasText: targetPostalCode})
      .click()
    await this.page.getByTestId('apply-delivery-address').click()
  }
}

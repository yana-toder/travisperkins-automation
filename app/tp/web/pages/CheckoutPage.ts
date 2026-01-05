import {expect, Page} from '@playwright/test'

export class CheckoutPage {
  constructor(private page: Page) {}

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('step-title')).toBeVisible()
    await expect(this.page.getByTestId('contact-information')).toBeVisible()
  }

  //save generated data
  private user!: {
    fullName: string
    emailAddress: string
    mobileNumber: string
  }

  async fillCustomerDetails(): Promise<void> {
    const {faker} = await import('@faker-js/faker')
    const mobileNumber = `07${faker.number.int({
      min: 100000000,
      max: 999999999,
    })}`
    this.user = {
      fullName: faker.person.fullName(),
      emailAddress: faker.internet.email(),
      mobileNumber: mobileNumber,
    }

    await this.page
      .getByTestId('contact-info-name')
      .getByTestId('input-text-field')
      .fill(this.user.fullName)
    await this.page
      .getByTestId('contact-info-email')
      .getByTestId('input-text-field')
      .fill(this.user.emailAddress)

    await this.page
      .getByTestId('contact-info-phone')
      .getByTestId('input-text-field')
      .fill(this.user.mobileNumber)
  }

  async verifyUserDetailsFilled(): Promise<void> {
    await expect(
      this.page.getByTestId('contact-info-name').getByTestId('input-text-field')
    ).toHaveValue(this.user.fullName)

    await expect(
      this.page
        .getByTestId('contact-info-email')
        .getByTestId('input-text-field')
    ).toHaveValue(this.user.emailAddress)

    await expect(
      this.page
        .getByTestId('contact-info-phone')
        .getByTestId('input-text-field')
    ).toHaveValue(this.user.mobileNumber)
  }

  async saveUserData(): Promise<void> {
    await this.page.getByTestId('contact-save-button').click()

    await expect(this.page.getByTestId('card-full-name')).toContainText(
      this.user.fullName
    )
    await expect(this.page.getByTestId('card-email')).toContainText(
      this.user.emailAddress
    )
    await expect(this.page.getByTestId('card-phone')).toContainText(
      this.user.mobileNumber
    )
  }

  async getProductSummary(): Promise<{title: string; price: string}> {
    const title = await this.page.getByTestId('name-checkout-new').innerText()
    const price = await this.page
      .getByTestId('line-total-inc-vat')
      .locator('h3', {hasText: /\d/})
      .innerText()

    return {title, price}
  }

  async verifyCollectionBranchAddress(targetPostalCode: string): Promise<void> {
    await expect(
      this.page
        .getByTestId('saved-delivery-address')
        .locator('[class*="AddressCard__PostcodeWrap"]')
        .locator('span')
    ).toContainText(targetPostalCode)
  }
}

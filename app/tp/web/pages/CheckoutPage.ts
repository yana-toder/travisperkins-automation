import {expect, Page} from '@playwright/test'
import {User} from '../types/User'
import {getFullName} from '../helpers/userHelpers'
export class CheckoutPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('step-title')).toBeVisible()
    await expect(this.page.getByTestId('contact-information')).toBeVisible()
  }

  private getContactInput(testId: string) {
    return this.page.getByTestId(testId).getByTestId('input-text-field')
  }

  async fillUserDetails(user: User): Promise<void> {
    await this.getContactInput('contact-info-name').fill(getFullName(user))
    await this.getContactInput('contact-info-email').fill(user.emailAddress)
    await this.getContactInput('contact-info-phone').fill(user.mobileNumber)
  }

  async verifyUserDetailsFilled(user: User): Promise<void> {
    await expect(this.getContactInput('contact-info-name')).toHaveValue(
      getFullName(user),
    )

    await expect(this.getContactInput('contact-info-email')).toHaveValue(
      user.emailAddress,
    )

    await expect(this.getContactInput('contact-info-phone')).toHaveValue(
      user.mobileNumber,
    )
  }

  async saveUserData() {
    await this.page.getByTestId('contact-save-button').click()
  }

  async getContactCardInfo(user: User): Promise<void> {
    await expect(this.page.getByTestId('card-full-name')).toContainText(
      getFullName(user),
    )
    await expect(this.page.getByTestId('card-email')).toContainText(
      user.emailAddress,
    )
    await expect(this.page.getByTestId('card-phone')).toContainText(
      user.mobileNumber,
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
        .locator('span'),
    ).toContainText(targetPostalCode)
  }
}

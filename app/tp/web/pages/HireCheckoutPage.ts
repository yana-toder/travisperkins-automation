import {expect, Page} from '@playwright/test'

export class HireCheckoutPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async isLoaded() {
    await expect(this.page.getByTestId('step-item-switch-1')).toBeVisible()
  }

  async verifyUserNameAndEmail(userName: string, email: string) {
    await expect(this.page.getByTestId('user-name-text')).toContainText(
      userName,
    )
    await expect(this.page.getByTestId('user-email-text')).toContainText(email)
  }

  async fillUserInfo(
    mobileNumber: string,
    line1: string,
    town: string,
    postalCode: string,
  ) {
    await this.page
      .getByTestId('contact-info-phone')
      .locator('input')
      .fill(mobileNumber)

    await this.page.getByTestId('line1-input').locator('input').fill(line1)
    await this.page.getByTestId('town-input').locator('input').fill(town)
    await this.page
      .getByTestId('postcode-input')
      .locator('input')
      .fill(postalCode)
  }

  async verifyUserInfoFilled(
    mobileNumber: string,
    line1: string,
    town: string,
    postalCode: string,
  ) {
    await expect(
      this.page.getByTestId('contact-info-phone').locator('input'),
    ).toHaveValue(mobileNumber)

    await expect(
      this.page.getByTestId('line1-input').locator('input'),
    ).toHaveValue(line1)

    await expect(
      this.page.getByTestId('town-input').locator('input'),
    ).toHaveValue(town)

    await expect(
      this.page.getByTestId('postcode-input').locator('input'),
    ).toHaveValue(postalCode)
  }

  async saveInfo() {
    await this.page.getByTestId('save-address-button').click()
    await this.page
      .locator('[class*="CheckboxWrapper"]')
      .getByTestId('checkbox')
      .check()
    await expect(this.page.getByTestId('btn-submit')).toBeVisible()
  }

  async placeOrder() {
    const submitButton = this.page.getByTestId('btn-submit')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
  }

  async agreeCheckout() {
    const checkbox = this.page
      .locator('[class*="CheckBoxWrapper"]')
      .getByTestId('checkbox')

    await expect(checkbox).toBeVisible()
    await checkbox.check()
    await expect(checkbox).toBeChecked()
    await expect(this.page.getByTestId('btn-submit')).toBeEnabled()
  }

  async submitOrder() {
    await this.placeOrder()
    await this.agreeCheckout()
    await this.placeOrder()
    await this.success()
  }
  async success() {
    await expect(this.page.locator('h1')).toContainText(
      'Thanks for your hire enquiry',
    )
  }
}

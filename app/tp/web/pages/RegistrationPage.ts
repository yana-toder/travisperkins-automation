import {expect, Page} from '@playwright/test'
import {User} from '../types/User'

export class RegistrationPage {
  constructor(private page: Page) {}

  async goToActivateAccount() {
    await this.page.getByTestId('header-account-button').click()
  }

  async isLoaded(): Promise<void> {
    await expect(
      this.page.getByTestId('sub-header-wrapper').locator('h1')
    ).toBeVisible()
  }

  async goToCreateAccount() {
    await this.page
      .getByTestId('login-banner-container')
      .getByText("I don't have an account", {exact: true})
      .click()
  }

  async createAccountIsLoaded() {
    await expect(this.page.getByTestId('static-page-title')).toBeVisible()
  }

  async clickOnCreateAccount() {
    await this.page.getByTestId('account-link-cash').click()
  }

  async fillUserDetails(user: User): Promise<void> {
    const targetPostalCode = 'NN5 5JR'
    await this.page
      .getByTestId('first-name-input')
      .locator('input')
      .fill(user.firstName)

    await this.page
      .getByTestId('surname-input')
      .locator('input')
      .fill(user.surname)

    await this.page
      .getByTestId('email-input')
      .locator('input')
      .fill(user.emailAddress)

    if (user.password) {
      await this.page
        .getByTestId('password-input')
        .locator('input')
        .fill(user.password)
    }

    await this.page
      .getByTestId('mobile-number-input')
      .locator('input')
      .fill(user.mobileNumber)

    await this.page
      .getByPlaceholder('Enter postcode or street')
      .fill(targetPostalCode)
    await this.page
      .getByTestId('address-item-textwrapper')
      .filter({hasText: targetPostalCode})
      .first()
      .click()
  }

  async fillTradeForm() {
    await this.page.getByTestId('action-field').locator('[for="15C"]').click()
    await this.page.getByTestId('usesToolhire-field').first().click()
    await this.page.getByTestId('usesKitechenFitting-field').first().click()
    await this.page
      .getByTestId('trade-professional-marketing-preferences')
      .first()
      .click()
  }

  async submitRegistration(): Promise<void> {
    await expect(this.page.getByTestId('create-account-button')).toBeVisible()
    await this.page.getByTestId('create-account-button').click()
    await expect(
      this.page
        .getByTestId('sub-header-trade-professional-wrapper')
        .locator('h1', {hasText: 'Registration successful'})
    ).toBeVisible()
  }

  async openLogin() {
    await this.page.locator('button', {hasText: 'Log In'}).click()
  }

  async fillLoginForm(user: User): Promise<void> {
    const frame = this.page
      .locator('[data-test-id="oauth-iframe"]')
      .contentFrame()
    await frame.getByRole('textbox', {name: 'Email'}).fill(user.emailAddress)
    if (user.password) {
      await frame.getByRole('textbox', {name: 'Password'}).fill(user.password)
    }
  }
  async submitLogin(): Promise<void> {
    const frame = this.page.frameLocator('[data-test-id="oauth-iframe"]')

    await expect(frame.getByRole('button', {name: 'Log in'})).toBeVisible()
    await frame.getByRole('button', {name: 'Log in'}).click()
  }

  async login(user: User): Promise<void> {
    await this.openLogin()
    await this.fillLoginForm(user)
    await this.submitLogin()
  }
  //for api login
  async goToLogin() {
    await this.page.goto('https://www.travisperkins.co.uk/login')
  }
}

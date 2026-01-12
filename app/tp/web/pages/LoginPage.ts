import {expect, Page, Frame} from '@playwright/test'
import {User} from '../types/User'

export class LoginPage {
  constructor(private page: Page) {}

  private get authFrame() {
    return this.page.frameLocator('[data-test-id="oauth-iframe"]')
  }
  async open() {
    await this.page.locator('button', {hasText: 'Log In'}).click()
  }

  async waitForIframe(): Promise<void> {
    await expect(
      this.authFrame.getByRole('textbox', {name: 'Email'})
    ).toBeVisible()
  }

  async fillCredentials(user: User): Promise<void> {
    await this.authFrame
      .getByRole('textbox', {name: 'Email'})
      .fill(user.emailAddress)
    if (user.password) {
      await this.authFrame
        .getByRole('textbox', {name: 'Password'})
        .fill(user.password)
    }
  }

  async submit(): Promise<void> {
    await expect(
      this.authFrame.getByRole('button', {name: 'Log in'})
    ).toBeVisible()
    await this.authFrame.getByRole('button', {name: 'Log in'}).click()
  }

  async login(user: User): Promise<void> {
    await this.open()
    await this.fillCredentials(user)
    await this.submit()
  }
  //for api login
  async goToLogin() {
    await this.page.goto('https://www.travisperkins.co.uk/login')
  }

  async expectUserLoggedIn(user: User): Promise<void> {
    await expect(
      this.page.getByTestId('header-account-button').getByTestId('link-title')
    ).toHaveText(`${user.firstName} ${user.surname}`)
  }
}

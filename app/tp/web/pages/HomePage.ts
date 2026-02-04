import {expect, Page} from '@playwright/test'
import {SearchWrapper} from '../components/SearchWrapper'
import {DeliveryPopup} from '../components/DeliveryPopup'

export class HomePage {
  readonly searchWrapper: SearchWrapper
  readonly deliveryPopup: DeliveryPopup
  readonly page: Page

  constructor(page: Page) {
    this.page = page
    this.searchWrapper = new SearchWrapper(this.page)
    this.deliveryPopup = new DeliveryPopup(this.page)
  }
  async isLoaded(): Promise<void> {
    await expect(this.page.getByTestId('header-top-bar')).toBeVisible()
    await expect(this.page.getByTestId('homepage-main')).toBeVisible()
  }

  async open() {
    await this.page.goto('/')
  }

  async acceptCookies() {
    await this.page.locator('#onetrust-accept-btn-handler').click()
  }
}

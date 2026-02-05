import {expect, Page} from '@playwright/test'
import {extractPriceValue} from '../utils/price.utils'
import {CollectionBranchPopup} from '../components/CollectionBranchPopup'
import {DatePicker} from '../components/DatePicker'
import {AddToCollectionPopup} from '../components/AddToCollectionPopup'

export class HirePage {
  private collectionBranchPopup: CollectionBranchPopup
  private addToCollectionPopup: AddToCollectionPopup
  readonly datePicker: DatePicker

  constructor(private page: Page) {
    this.collectionBranchPopup = new CollectionBranchPopup(page)
    this.addToCollectionPopup = new AddToCollectionPopup(page)
    this.datePicker = new DatePicker(page)
  }

  async open() {
    await expect(this.page.getByTestId('nav-menu-bar')).toBeVisible()
    await expect(
      this.page
        .getByTestId('nav-menu-bar')
        .getByRole('link', {name: 'Hire', exact: true}),
    ).toBeVisible()
    await this.page.getByRole('link', {name: 'Hire', exact: true}).click()
    await expect(this.page.locator('h1', {hasText: 'Tool Hire'})).toBeVisible()
  }

  async goToProduct() {
    await expect(
      this.page
        .getByTestId('configurable-row')
        .locator('a[href*="breaking-drilling-and-fixing-hire"]'),
    ).toBeVisible()
    await this.page
      .getByTestId('configurable-row')
      .locator('a[href*="breaking-drilling-and-fixing-hire"]')
      .click()
    await expect(this.page.getByTestId('listing-header-title')).toBeVisible()
  }

  async getProductTitle(): Promise<string> {
    return await this.page
      .getByTestId('product')
      .first()
      .getByTestId('product-card-title')
      .innerText()
  }

  async getProductPriceValuePerDay(): Promise<string> {
    const productPrice = await this.page
      .getByTestId('product')
      .first()
      .getByTestId('primary-price')
      .innerText()
    return extractPriceValue(productPrice)
  }

  async addForHire() {
    await this.page
      .getByTestId('product')
      .first()
      .getByTestId('add-for-hire-button')
      .click()

    await expect(
      this.page.getByTestId('add-to-basket-popup-wrapper'),
    ).toBeVisible()
  }

  async verifyBasketPopup(productTitle: string, priceValue: string) {
    await expect(this.page.getByTestId('product-name')).toContainText(
      productTitle,
    )
    await expect(this.page.getByTestId('product-actual-price')).toContainText(
      priceValue,
    )
  }

  async selectHireDate(rentalDays: number) {
    await this.datePicker.selectFromDate()
    await this.datePicker.selectToDate(rentalDays)
  }

  async checkSelectedDate() {
    await this.datePicker.checkSelectedDate()
  }

  async addToDelivery() {
    await this.page.getByTestId('add-for-delivery-button').click()
    await expect(
      this.page.getByTestId('add-to-basket-popup-wrapper'),
    ).toBeVisible()
    await expect(this.page.getByTestId('add-product-info')).toContainText(
      'Items added to Hire basket for delivery',
    )
  }

  async verifyDeliveryPopup(productTitle: string, priceValue: string) {
    //need to change name of component
    const actualTitle = await this.addToCollectionPopup.getProductTitle()
    const actualPrice = await this.addToCollectionPopup.getProductPriceValue()

    await expect(actualTitle).toBe(productTitle)
    await expect(actualPrice).toBe(priceValue)
  }

  async goToHire() {
    await this.page.getByTestId('go-to-hire-basket-button').click()
  }
}

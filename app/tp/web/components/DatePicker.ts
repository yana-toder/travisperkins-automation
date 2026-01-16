import {expect, Page} from '@playwright/test'
import {parseAriaLabelToDate} from '../helpers/dateHelpers'
import {formatDateForUI} from '../helpers/dateHelpers'
export class DatePicker {
  constructor(private page: Page) {}

  public fromDate!: Date
  public toDate!: Date

  private get dateButtonInput() {
    return this.page.getByTestId('dateButtonInput')
  }
  private get datePicker() {
    return this.page.locator('[aria-label="Choose Date"]')
  }
  private get availableDays() {
    return this.datePicker.locator(
      '.react-datepicker__day[aria-disabled="false"]'
    )
  }

  async selectFromDate() {
    await this.dateButtonInput.locator('span', {hasText: 'from'}).click()

    await expect(this.datePicker).toBeVisible()

    const fromDate = await this.availableDays.first()
    const ariaLabel = await fromDate.getAttribute('aria-label')
    if (!ariaLabel) throw new Error('from aria-label is null')

    this.fromDate = parseAriaLabelToDate(ariaLabel)
    await fromDate.click()
  }

  async selectToDate(rentalDays: number) {
    const minToDate = new Date(this.fromDate)
    minToDate.setDate(minToDate.getDate() + rentalDays)

    await this.dateButtonInput.locator('span', {hasText: 'to'}).click()
    await expect(this.datePicker).toBeVisible()

    const count = await this.availableDays.count()
    for (let i = 0; i < count; i++) {
      const day = this.availableDays.nth(i)
      const ariaLabel = await day.getAttribute('aria-label')
      if (!ariaLabel) continue

      const dayDate = parseAriaLabelToDate(ariaLabel)

      if (dayDate >= minToDate) {
        this.toDate = dayDate
        await day.click()
        return
      }
    }
  }

  async checkSelectedDate(): Promise<void> {
    const fromText = formatDateForUI(this.fromDate)
    const toText = formatDateForUI(this.toDate)

    await expect(
      this.dateButtonInput.locator('span', {hasText: fromText})
    ).toBeVisible()

    await expect(
      this.dateButtonInput.locator('span', {hasText: toText})
    ).toBeVisible()
  }
}

import {Page} from '@playwright/test'
import {HomePage} from './pages/HomePage'
import {SearchResultPage} from './pages/SearchResultPage'
import {ProductPage} from './pages/ProductPage'
import {CartPage} from './pages/CartPage'
import {CheckoutPage} from './pages/CheckoutPage'

export class Application {
  readonly home: HomePage
  readonly searchResult: SearchResultPage
  readonly product: ProductPage
  readonly cart: CartPage
  readonly checkout: CheckoutPage

  constructor(private page: Page) {
    this.home = new HomePage(page)
    this.searchResult = new SearchResultPage(page)
    this.product = new ProductPage(page)
    this.cart = new CartPage(page)
    this.checkout = new CheckoutPage(page)
  }
}

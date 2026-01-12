import {Page} from '@playwright/test'
import {HomePage} from './pages/HomePage'
import {SearchResultPage} from './pages/SearchResultPage'
import {ProductPage} from './pages/ProductPage'
import {CartPage} from './pages/CartPage'
import {CheckoutPage} from './pages/CheckoutPage'
import {AddToCollectionPopup} from './components/AddToCollectionPopup'
import {CollectionBranchPopup} from './components/CollectionBranchPopup'
import {RegistrationPage} from './pages/RegistrationPage'
import {LoginPage} from './pages/LoginPage'
export class Application {
  readonly home: HomePage
  readonly searchResult: SearchResultPage
  readonly product: ProductPage
  readonly cart: CartPage
  readonly checkout: CheckoutPage
  readonly addToCollectionPopup: AddToCollectionPopup
  readonly collectionBranchPopup: CollectionBranchPopup
  readonly registration: RegistrationPage
  readonly login: LoginPage

  constructor(private page: Page) {
    this.home = new HomePage(page)
    this.searchResult = new SearchResultPage(page)
    this.product = new ProductPage(page)
    this.cart = new CartPage(page)
    this.checkout = new CheckoutPage(page)
    this.addToCollectionPopup = new AddToCollectionPopup(page)
    this.collectionBranchPopup = new CollectionBranchPopup(page)
    this.registration = new RegistrationPage(page)
    this.login = new LoginPage(page)
  }
}

import {APIRequestContext, expect} from '@playwright/test'
import {RegisteredUser} from '../web/types/User'

export async function registerUserViaApi(
  request: APIRequestContext,
  user: RegisteredUser,
): Promise<void> {
  const response = await request.post(
    '/graphql?op=tpplcTradeProfessionalAccountApplicationSubmit',
    {
      headers: {
        'content-type': 'application/json',
        'x-tp-brand-id': 'tp',
        'x-data-consumer-name': 'TP-WEB',
      },
      data: {
        operationName: 'tpplcTradeProfessionalAccountApplicationSubmit',
        query: `
        mutation tpplcTradeProfessionalAccountApplicationSubmit(
          $input: TpplcTradeProfessionalAccountApplicationSubmitInput!
        ) {
          tpplcTradeProfessionalAccountApplicationSubmit(input: $input) {
            id
          }
        }
      `,
        variables: {
          input: {
            brandId: 'tp',
            firstName: user.firstName,
            surname: user.surname,
            email: user.emailAddress,
            password: user.password,
            mobile: user.mobileNumber,
            tradingName: `${user.firstName} ${user.surname}`,
            tradeTypeCode: '15C',
            localBranch: '9216',
            usesToolhire: true,
            usesKitchenFitting: false,
            contactPreferences: ['EMAIL'],
            address: {
              line1: user.address.line1,
              line2: user.address.line2 ?? '',
              town: user.address.town,
              postalCode: user.address.postalCode,
            },
            registeredCompanyNumber: '',
          },
        },
      },
    },
  )

  expect(response.ok()).toBeTruthy()

  const body = await response.json()
  expect(
    body.data.tpplcTradeProfessionalAccountApplicationSubmit.id,
  ).toBeTruthy()
}

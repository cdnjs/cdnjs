/**
 * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
 */
interface Metadata {
  [name: string]: string;
}

/**
 * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
 * While you can send values as numbers, they will be returned as strings.
 */
interface MetadataParam {
  [name: string]: string | number | null;
}

/**
 * The Address object.
 */
interface Address {
  /**
   * City/District/Suburb/Town/Village.
   */
  city: string | null;

  /**
   * 2-letter country code.
   */
  country: string | null;

  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  line1: string | null;

  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  line2: string | null;

  /**
   * ZIP or postal code.
   */
  postal_code: string | null;

  /**
   * State/County/Province/Region.
   */
  state: string | null;
}

interface AccountAddressParam {
  /**
   * City, district, suburb, town, or village.
   */
  city?: string;

  /**
   * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string;

  /**
   * Address line 1 (e.g., street, PO Box, or company name).
   */
  line1?: string;

  /**
   * Address line 2 (e.g., apartment, suite, unit, or building).
   */
  line2?: string;

  /**
   * ZIP or postal code.
   */
  postal_code?: string;

  /**
   * State, county, province, or region.
   */
  state?: string;
}

interface AddressParam extends AccountAddressParam {
  /**
   * Address line 1 (e.g., street, PO Box, or company name).
   */
  line1: string;
}

interface JapanAddressParam {
  /**
   * City or ward.
   */
  city?: string;

  /**
   * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string;

  /**
   * Block or building number.
   */
  line1?: string;

  /**
   * Building details.
   */
  line2?: string;

  /**
   * Postal code.
   */
  postal_code?: string;

  /**
   * Prefecture.
   */
  state?: string;

  /**
   * Town or cho-me.
   */
  town?: string;
}

interface RedirectToCheckoutServerOptions {
  /**
   * The ID of the [Checkout Session](https://stripe.com/docs/api/checkout/sessions) that is used in [Checkout's server integration](https://stripe.com/docs/payments/checkout/one-time).
   */
  sessionId: string;
}

interface RedirectToCheckoutClientOptions {
  /**
   * The URL to which Stripe should send customers when payment is complete.
   * If you’d like access to the Checkout Session for the successful payment, read more about it in our guide on [fulfilling your payments with webhooks](https://stripe.com/docs/payments/checkout/fulfillment#webhooks).
   */
  successUrl: string;

  /**
   * The URL to which Stripe should send customers when payment is canceled.
   */
  cancelUrl: string;

  /**
   * An array of objects representing the items that your customer would like to purchase.
   * These items are shown as line items in the Checkout interface and make up the total amount to be collected by Checkout.
   */
  lineItems?: Array<{
    /**
     * The ID of the price that the customer would like to purchase. SKU or plan IDs may also be used.
     */
    price?: string;

    /**
     * The quantity of units for the item.
     */
    quantity?: number;
  }>;

  /**
   * An array of objects representing the items that your customer would like to purchase.
   * These items are shown as line items in the Checkout interface and make up the total amount to be collected by Checkout.
   *
   * @deprecated
   */
  items?: Array<{
    /**
     * The ID of the SKU that the customer would like to purchase
     */
    sku?: string;

    /**
     * The ID of the plan that the customer would like to subscribe to.
     */
    plan?: string;

    /**
     * The quantity of units for the item.
     */
    quantity?: number;
  }>;

  /**
   * The mode of the Checkout Session. Required if using lineItems.
   */
  mode?: 'payment' | 'subscription';

  /**
   * A unique string to reference the Checkout session.
   * This can be a customer ID, a cart ID, or similar.
   * It is included in the `checkout.session.completed` webhook and can be used to fulfill the purchase.
   */
  clientReferenceId?: string;

  /**
   * The email address used to create the customer object.
   * If you already know your customer's email address, use this attribute to prefill it on Checkout.
   */
  customerEmail?: string;

  /**
   * Specify whether Checkout should collect the customer’s billing address.
   * If set to `required`, Checkout will attempt to collect the customer’s billing address.
   * If not set or set to `auto` Checkout will only attempt to collect the billing address when necessary.
   */
  billingAddressCollection?: 'auto' | 'required';

  /**
   * Provides configuration for Checkout to collect a shipping address from a customer.
   */
  shippingAddressCollection?: {
    /**
     * An array of two-letter ISO country codes representing which countries
     * Checkout should provide as options for shipping locations. The codes are
     * expected to be uppercase. Unsupported country codes: AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI.
     */
    allowedCountries: string[];
  };

  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display Checkout in.
   * Default is `auto` (Stripe detects the locale of the browser).
   */
  locale?: CheckoutLocale;

  /**
   * Describes the type of transaction being performed by Checkout in order to customize relevant text on the page, such as the **Submit** button.
   * `submitType` can only be specified when using using line items or SKUs, and not subscriptions.
   * The default is `auto`.
   */
  submitType?: 'auto' | 'book' | 'donate' | 'pay';
}

type RedirectToCheckoutOptions =
  | RedirectToCheckoutServerOptions
  | RedirectToCheckoutClientOptions;

type CheckoutLocale =
  | 'auto'
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'en-GB'
  | 'es'
  | 'es-419'
  | 'et'
  | 'fi'
  | 'fil'
  | 'fr'
  | 'fr-CA'
  | 'hr'
  | 'hu'
  | 'id'
  | 'it'
  | 'ja'
  | 'lt'
  | 'lv'
  | 'ms'
  | 'mt'
  | 'nb'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'pt-BR'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sv'
  | 'th'
  | 'tr'
  | 'zh'
  | 'zh-HK'
  | 'zh-TW';

// Polyfill for TypeScript < 3.5 compatibility
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type CreatePaymentMethodData =
  | CreatePaymentMethodAcssDebitData
  | CreatePaymentMethodAffirmData
  | CreatePaymentMethodAfterpayClearpayData
  | CreatePaymentMethodAlipayData
  | CreatePaymentMethodAuBecsDebitData
  | CreatePaymentMethodBacsDebitData
  | CreatePaymentMethodBancontactData
  | CreatePaymentMethodBlikData
  | CreatePaymentMethodBoletoData
  | CreatePaymentMethodCardData
  | CreatePaymentMethodCashappData
  | CreatePaymentMethodCustomerBalanceData
  | CreatePaymentMethodEpsData
  | CreatePaymentMethodGiropayData
  | CreatePaymentMethodGrabPayData
  | CreatePaymentMethodIdealData
  | CreatePaymentMethodKlarnaData
  | CreatePaymentMethodKonbiniData
  | CreatePaymentMethodP24Data
  | CreatePaymentMethodPayPalData
  | CreatePaymentMethodPayNowData
  | CreatePaymentMethodPixData
  | CreatePaymentMethodPromptPayData
  | CreatePaymentMethodFpxData
  | CreatePaymentMethodUsBankAccountData
  | CreatePaymentMethodSepaDebitData
  | CreatePaymentMethodSofortData
  | CreatePaymentMethodWechatPayData;


interface CreatePaymentMethodAlipayData
  extends PaymentMethodCreateParams {
  type: 'alipay';
}

interface CreatePaymentMethodWechatPayData
  extends PaymentMethodCreateParams {
  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  type: 'wechat_pay';
}

interface CreatePaymentMethodAffirmData
  extends PaymentMethodCreateParams {
  type: 'affirm';

  /**
   * Can be omitted as there are no Affirm-specific fields.
   */
  affirm?: {}; // eslint-disable-line @typescript-eslint/ban-types
}

interface CreatePaymentMethodAfterpayClearpayData
  extends PaymentMethodCreateParams {
  type: 'afterpay_clearpay';

  /**
   * Can be omitted as there are no AfterpayClearpay-specific fields.
   */
  afterpay_clearpay?: {}; // eslint-disable-line @typescript-eslint/ban-types
}

interface CreatePaymentMethodBancontactData
  extends PaymentMethodCreateParams {
  type: 'bancontact';

  /**
   * The customer's billing details.
   * `name` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
  };
}

interface CreatePaymentMethodBlikData extends PaymentMethodCreateParams {
  type: 'blik';

  /**
   * Details about the BLIK pament method. Currently there are no supported child attributes for this field.
   */
  blik?: {}; // eslint-disable-line @typescript-eslint/ban-types
}

interface CreatePaymentMethodBoletoData
  extends PaymentMethodCreateParams {
  type: 'boleto';

  /**
   * The customer's billing details.
   * `name`, `email`, and full `address` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    email: string;
    name: string;
    address: PaymentMethodCreateParams.BillingDetails.Address & {
      line1: string;
      city: string;
      postal_code: string;
      state: string;
      country: string;
    };
  };

  boleto: {
    tax_id: string;
  };
}

interface CreatePaymentMethodCardData extends PaymentMethodCreateParams {
  type: 'card';

  card: StripeCardElement | StripeCardNumberElement | {token: string};
}

interface CreatePaymentMethodCashappData
  extends PaymentMethodCreateParams {
  type: 'cashapp';
}

interface CreatePaymentMethodCustomerBalanceData
  extends PaymentMethodCreateParams {
  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  customer_balance: Record<string, never>;
}

interface CreatePaymentMethodEpsData extends PaymentMethodCreateParams {
  type: 'eps';

  /**
   * The customer's billing details.
   * `name` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
  };

  eps:
    | StripeEpsBankElement
    | {
        /**
         * The customer's bank
         */
        bank?: string;
      };
}

interface CreatePaymentMethodFpxData extends PaymentMethodCreateParams {
  type: 'fpx';

  fpx:
    | StripeFpxBankElement
    | {
        /**
         * The customer's bank.
         */
        bank: string;
      };
}

interface CreatePaymentMethodGiropayData
  extends PaymentMethodCreateParams {
  type: 'giropay';

  /**
   * The customer's billing details.
   * `name` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
  };
}

interface CreatePaymentMethodGrabPayData
  extends PaymentMethodCreateParams {
  type: 'grabpay';

  /**
   * Can be omitted as there are no GrabPay-specific fields.
   */
  grabpay?: {}; // eslint-disable-line @typescript-eslint/ban-types
}

interface CreatePaymentMethodIdealData
  extends PaymentMethodCreateParams {
  type: 'ideal';

  ideal:
    | StripeIdealBankElement
    | {
        /**
         * The customer's bank.
         */
        bank?: string;
      };
}

interface CreatePaymentMethodKlarnaData
  extends PaymentMethodCreateParams {
  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  type: 'klarna';

  /**
   * The customer's billing details.
   * `address.country` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    address: PaymentMethodCreateParams.BillingDetails.Address & {
      country: string;
    };
  };
}

interface CreatePaymentMethodKonbiniData
  extends PaymentMethodCreateParams {
  type: 'konbini';

  /**
   * The customer's billing details.
   * `email` and `name` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    email: string;
    name: string;
  };
}

interface CreatePaymentMethodOxxoData extends PaymentMethodCreateParams {
  type: 'oxxo';

  /**
   * The customer's billing details.
   * `email` and `name` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    email: string;
    name: string;
  };
}

interface CreatePaymentMethodP24Data extends PaymentMethodCreateParams {
  type: 'p24';

  /**
   * The customer's billing details.
   * `email` is required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    email: string;
  };
  p24?:
    | StripeP24BankElement
    | {
        /**
         * The customer's bank.
         */
        bank?: string;
      };
}

interface CreatePaymentMethodPayNowData
  extends PaymentMethodCreateParams {
  type: 'paynow';
}

interface CreatePaymentMethodPayPalData
  extends PaymentMethodCreateParams {
  type: 'paypal';
}

interface CreatePaymentMethodPixData extends PaymentMethodCreateParams {
  type: 'pix';
}

interface CreatePaymentMethodPromptPayData
  extends PaymentMethodCreateParams {
  type: 'promptpay';
}

interface CreatePaymentMethodSepaDebitData
  extends PaymentMethodCreateParams {
  type: 'sepa_debit';

  sepa_debit:
    | StripeIbanElement
    | {
        /**
         * An IBAN account number.
         */
        iban: string;
      };

  /**
   * The customer's billing details.
   * `name` and `email` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
    email: string;
  };
}

interface CreatePaymentMethodSofortData
  extends PaymentMethodCreateParams {
  type: 'sofort';

  sofort: {
    /**
     * The country code where customer's bank is located.
     */
    country: string;
  };

  /**
   * The customer's billing details.
   * Required when `setup_future_usage` is set to `off_session`.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details?: PaymentMethodCreateParams.BillingDetails;
}

interface CreatePaymentMethodAuBecsDebitData
  extends PaymentMethodCreateParams {
  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  type: 'au_becs_debit';

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  au_becs_debit:
    | StripeAuBankAccountElement
    | {
        /**
         * A BSB number.
         */
        bsb_number: string;

        /**
         * An account number.
         */
        account_number: string;
      };

  /**
   * The customer's billing details.
   * `name` and `email` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
    email: string;
  };
}

interface CreatePaymentMethodBacsDebitData
  extends PaymentMethodCreateParams {
  type: 'bacs_debit';

  bacs_debit: {
    /**
     * A sort code.
     */
    sort_code: string;

    /**
     * An account number.
     */
    account_number: string;
  };

  /**
   * The customer's billing details.
   * `name`, `email`, and `address` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails & {
    name: string;
    email: string;
    address: PaymentMethodCreateParams.BillingDetails.Address & {
      line1: string;
      city: string;
      country: string;
      postal_code: string;
    };
  };
}
interface CreatePaymentMethodAcssDebitData
  extends PaymentMethodCreateParams {
  type: 'acss_debit';

  /**
   * Can be omitted as Stripe will help to collect bank account details and verification.
   * Refer to our [integration guide](https://stripe.com/docs/payments/acss-debit/accept-a-payment) for more details.
   */
  acss_debit?: {
    /**
     * Customer’s bank account number.
     */
    account_number: string;

    /**
     * Institution number of the customer’s bank.
     */
    institution_number: string;

    /**
     * Transit number of the customer’s bank.
     */
    transit_number: string;
  };

  /**
   * The customer's billing details.
   * `name`, `email`, and `address` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails;
}

interface CreatePaymentMethodUsBankAccountData
  extends PaymentMethodCreateParams {
  type: 'us_bank_account';

  /**
   * Can be omitted as Stripe will help to collect bank account details and verification.
   * Refer to our [integration guide](https://stripe.com/docs/payments/acss-debit/accept-a-payment) for more details.
   */
  us_bank_account: {
    /**
     * Customer’s bank account number.
     */
    account_number: string;

    /**
     * The routing transit number for the bank account.
     */
    routing_number: string;

    /**
     * The type of entity that holds the account. This can be either `individual` or `company`.
     */
    account_holder_type: string;

    /**
     * Account type: checkings or savings. Defaults to checking if omitted.
     */
    account_type?: string;
  };

  /**
   * The customer's billing details.
   * `name`, `email`, and `address` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails;
}

interface CollectBankAccountParams {
  /**
   * The payment method type for the bank account details (e.g. `us_bank_account`)
   */
  payment_method_type: string;
  /**
   * Payment method specific data to be sent with the request (billing details)
   */
  payment_method_data: CollectBankAccountPaymentMethodData;
}

interface CollectBankAccountPaymentMethodData {
  /**
   * The customer's billing details.
   * `name`, `email`, and `address` are required.
   *
   * @docs https://stripe.com/docs/api/payment_methods/create#create_payment_method-billing_details
   */
  billing_details: PaymentMethodCreateParams.BillingDetails;
}

/**
 * Data to be sent with a `stripe.confirmBancontactPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmBancontactPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodBancontactData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * Data to be sent with a `stripe.ConfirmBlikPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmBlikPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodBlikData, 'type'>;

  /**
   * An object containing payment-method-specific configuration to confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with.
   */
  payment_method_options: {
    /**
     * A configuration for this BLIK payment.
     */
    blik: {
      /**
       * Your customer's 6-digit BLIK code.
       */
      code: string;
    };
  };
}

/**
 * Data to be sent with a `stripe.confirmBoletoPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmBoletoPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodBoletoData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmBoletoPayment`.
 */
interface ConfirmBoletoPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [Stripe Boleto integration guide](https://stripe.com/docs/payments/boleto) for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmAlipayPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmAlipayPaymentData extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAlipayData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmAlipayPayment`.
 */
interface ConfirmAlipayPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/alipay/accept-a-payment#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * An options object to control the behavior of `stripe.confirmBancontactPayment`.
 */
interface ConfirmBancontactPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/bancontact#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * An options object to control the behavior of `stripe.confirmBlikPayment`.
 */
interface ConfirmBlikPaymentOptions {
  /**
   * Set this to false if you want to manually determine if the confirmation has succeeded or failed.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmCardPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmCardPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodCardData, 'type'>;

  /**
   * An object containing payment-method-specific configuration to confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with.
   */
  payment_method_options?: {
    /**
     * Configuration for this card payment.
     */
    card: {
      /**
       * Use the provided `CardCvcElement` when confirming the PaymentIntent with an existing PaymentMethod.
       */
      cvc?: StripeCardCvcElement;

      /**
       * Selected network to process this PaymentIntent on. Depends on the available networks of the card attached to the PaymentIntent.
       */
      network?: string;
    };
  };
}

/**
 * An options object to control the behavior of `stripe.confirmCardPayment`.
 */
interface ConfirmCardPaymentOptions {
  /**
   * Set this to `false` if you want to [handle next actions yourself](https://stripe.com/docs/payments/payment-intents/verifying-status#next-actions), or if you want to defer next action handling until later (e.g. for use in the [PaymentRequest API](https://stripe.com/docs/stripe-js/elements/payment-request-button#complete-payment-intents)).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmCashappPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmCashappPaymentData extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodCashappData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmCashappPayment`.
 */
interface ConfirmCashappPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization QR code or redirect](https://stripe.com/docs/payments/cash-app-pay/accept-a-payment?platform=web&ui=API#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmCustomerBalancePayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmCustomerBalancePaymentData
  extends PaymentIntentConfirmParams {
  /**
   * An object specifying the `customer_balance` type.
   */
  payment_method: CreatePaymentMethodCustomerBalanceData;
  payment_method_options?: {
    customer_balance?: {
      funding_type?: 'bank_transfer';
      bank_transfer?: {
        type:
          | 'eu_bank_transfer'
          | 'gb_bank_transfer'
          | 'id_bank_transfer'
          | 'jp_bank_transfer'
          | 'mx_bank_transfer'
          | 'us_bank_transfer';
        eu_bank_transfer?: {
          country: 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
        };
        id_bank_transfer?: {
          bank: 'bni' | 'bca';
        };
        requested_address_types?: Array<
          | 'aba'
          | 'swift'
          | 'sort_code'
          | 'zengin'
          | 'iban'
          | 'spei'
          | 'id_bban'
          | 'sepa'
        >;
      };
    };
  };
}

/**
 * An options object to control the behavior of `stripe.confirmCustomerBalancePayment`.
 */
interface ConfirmCustomerBalancePaymentOptions {
  /**
   * This must be set to `false`.
   * The Customer Balance does not handle the next actions for you automatically (e.g. displaying bank transfer details).
   * To make future upgrades easier, this option is required to always be sent.
   * Please refer to our [Stripe Customer Balance integration guide](https://stripe.com/docs/payments/bank-transfers) for more info.
   */
  handleActions: false;
}

/**
 * Data to be sent with a `stripe.confirmEpsPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmEpsPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodEpsData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmEpsPayment`.
 */
interface ConfirmEpsPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/eps#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmSepaDebitPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmSepaDebitPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodSepaDebitData, 'type'>;

  /**
   * To save the SEPA Direct Debit account for reuse, set this parameter to `off_session`.
   * SEPA Direct Debit only accepts an `off_session` value for this parameter.
   */
  setup_future_usage?: 'off_session';
}

/**
 * Data to be sent with a `stripe.confirmFpxPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmFpxPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodFpxData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmFpxPayment`.
 */
interface ConfirmFpxPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/fpx#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmGiropayPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmGiropayPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodGiropayData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmGiropayPayment`.
 */
interface ConfirmGiropayPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/giropay#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmGrabPayPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmGrabPayPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodGrabPayData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmGrabPayPayment`.
 */
interface ConfirmGrabPayPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [Stripe GrabPay integration guide](https://stripe.com/docs/payments/grabpay/accept-a-payment)
   * for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmIdealPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmIdealPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodIdealData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmIdealPayment`.
 */
interface ConfirmIdealPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/ideal#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmKlarnaPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmKlarnaPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodKlarnaData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmKlarnaPayment`.
 */
interface ConfirmKlarnaPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/klarna#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmKonbiniPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmKonbiniPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodKonbiniData, 'type'>;

  /**
   * An object containing payment-method-specific configuration to confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with.
   */
  payment_method_options?: {
    /**
     * Configuration for this Konbini payment.
     */
    konbini: {
      /**
       * An optional 10 to 11 digit numeric-only string determining the confirmation code at applicable convenience stores. May not be all 0 and could be rejected in case of insufficient uniqueness. We recommend to use the customer’s phone number.
       */
      confirmation_number?: string;
    };
  };
}

/**
 * An options object to control the behavior of `stripe.confirmKonbiniPayment`.
 */
interface ConfirmKonbiniPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [integration guide](https://stripe.com/docs/payments/konbini/accept-a-payment) for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmOxxoPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmOxxoPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodOxxoData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmOxxoPayment`.
 */
interface ConfirmOxxoPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [Stripe OXXO integration guide](https://stripe.com/docs/payments/oxxo) for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmP24Payment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmP24PaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodP24Data, 'type'>;

  payment_method_options?: {
    /**
     * Configuration for this Przelewy24 payment.
     */
    p24: {
      /**
       * Specify that payer has agreed to the Przelewy24 Terms of Service
       */
      tos_shown_and_accepted?: boolean;
    };
  };

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;
}

/**
 * Data to be sent with a `stripe.confirmPayNowPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmPayNowPaymentData extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodPayNowData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmPayNowPayment`.
 */
interface ConfirmPayNowPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/p24#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmPayPalPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmPayPalPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodPayPalData, 'type'>;

  /**
   * The required url your customer will be directed to after they complete authentication.
   */
  return_url: string;
}

/**
 * An options object to control the behavior of `stripe.confirmP24Payment`.
 */
interface ConfirmP24PaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/p24#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmPixPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmPixPaymentData extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodPixData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmPayNowPayment`.
 */
interface ConfirmPixPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/p24#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmPayNowPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmPromptPayPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodPromptPayData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmPayNowPayment`.
 */
interface ConfirmPromptPayPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/p24#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmSofortPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmSofortPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodSofortData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   *
   * @recommended
   */
  return_url?: string;

  /**
   * To set up a SEPA Direct Debit payment method using the bank details from this SOFORT payment, set this parameter to `off_session`.
   * When using this parameter, a `customer` will need to be set on the [PaymentIntent](https://stripe.com/docs/api/payment_intents).
   * The newly created SEPA Direct Debit [PaymentMethod](https://stripe.com/docs/api/payment_methods) will be attached to this customer.
   */
  setup_future_usage?: 'off_session';
}

/**
 * An options object to control the behavior of `stripe.confirmSofortPayment`.
 */
interface ConfirmSofortPaymentOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/sofort/accept-a-payment?platform=web#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmWechatPayPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmWechatPayPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * The `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent` or a new `PaymentMethod` will be created.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodWechatPayData, 'type'>;

  /**
   * An object containing payment-method-specific configuration to confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with.
   */
  payment_method_options?: {
    /**
     * Configuration for this wechat payment.
     */
    wechat_pay: {
      client?: 'web';
    };
  };
}

/**
 * An options object to control the behavior of `stripe.confirmWechatPayPayment`.
 */
interface ConfirmWechatPayPaymentOptions {
  /**
   * This must be set to false, and you are responsible for handling the next_action after confirming the PaymentIntent.
   */
  handleActions: boolean;
}

/**
 * Data to be sent with a `stripe.confirmAuBecsDebitPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmAuBecsDebitPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAuBecsDebitData, 'type'>;

  /**
   * To save the BECS Direct Debit account for reuse, set this parameter to `off_session`.
   * BECS Direct Debit only accepts an `off_session` value for this parameter.
   */
  setup_future_usage?: 'off_session';
}

/**
 * Data to be sent with a `stripe.confirmAffirmPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmAffirmPaymentData extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAffirmData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmAffirmPayment`.
 */
interface ConfirmAffirmPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [Stripe Affirm integration guide](https://stripe.com/docs/payments/affirm/accept-a-payment)
   * for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmAfterpayClearpayPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmAfterpayClearpayPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?:
    | string
    | Omit<CreatePaymentMethodAfterpayClearpayData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmAfterpayClearpayPayment`.
 */
interface ConfirmAfterpayClearpayPaymentOptions {
  /**
   * Set this to `false` if you want to handle next actions yourself. Please refer to our [Stripe Afterpay / Clearpay integration guide](https://stripe.com/docs/payments/afterpay-clearpay/accept-a-payment#handle-redirect)
   * for more info. Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmAcssDebitPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmAcssDebitPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAcssDebitData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmAcssDebitPayment`.
 */
interface ConfirmAcssDebitPaymentOptions {
  /**
   * Set `skipMandate` to `true` if you want to skip displaying the mandate confirmation screen.
   */
  skipMandate?: boolean;
}

interface ConfirmUsBankAccountPaymentData
  extends PaymentIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `PaymentIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodUsBankAccountData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmPayment` request.
 * Refer to the [Payment Intents API](https://stripe.com/docs/api/payment_intents/confirm) for a full list of parameters.
 */
interface ConfirmPaymentData extends PaymentIntentConfirmParams {
  /**
   * The url your customer will be directed to after they complete payment.
   */
  return_url: string;

  /**
   * An object to attach additional billing_details to the PaymentMethod created via Elements.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-payment_method_data
   */
  payment_method_data?: {
    /**
     * The customer's billing details. Details collected by Elements will override values passed here.
     * Billing fields that are omitted in the Payment Element via the `fields` option required.
     *
     * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-payment_method_data-billing_details
     */
    billing_details?: PaymentMethodCreateParams.BillingDetails;

    /**
     * Specifies if the PaymentMethod should be redisplayed when using the Saved Payment Method feature
     */
    allow_redisplay?: 'always' | 'limited' | 'unspecified';
  };

  /**
   * Optional `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_payment#confirm_payment_intent-options-confirmParams-payment_method
   */
  payment_method?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

/**
 * Data to be sent with a `stripe.verifyMicrodepositsForPayment` request.
 */
interface VerifyMicrodepositsForPaymentData {
  /**
   * An array of two positive integers, in cents, equal to the values of the microdeposits sent to the bank account.
   */
  amounts?: Array<number>;
}

/**
 * Data to be sent with a `stripe.collectBankAccountForPayment` request.
 */
interface CollectBankAccountForPaymentOptions {
  /**
   * The client secret of the PaymentIntent.
   */
  clientSecret: string;

  params: CollectBankAccountParams;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

/**
 * Data to be sent with a `stripe.confirmCardSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmCardSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodCardData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmCardSetup`.
 */
interface ConfirmCardSetupOptions {
  /*
   * Set this to `false` if you want to [handle next actions yourself](https://stripe.com/docs/payments/payment-intents/verifying-status#next-actions), or if you want to defer next action handling until later (e.g. for use in the [PaymentRequest API](https://stripe.com/docs/stripe-js/elements/payment-request-button#complete-payment-intents)).
   * Default is `true`.
   */
  handleActions?: boolean;
}

interface ConfirmCashappSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodCashappData, 'type'>;

  /**
   * The url your customer will be directed to after they complete authentication.
   */
  return_url?: string;
}

/**
 * An options object to control the behavior of `stripe.confirmCashappSetup`.
 */
interface ConfirmCashappSetupOptions {
  /*
   * Set this to `false` if you want to [manually handle the authorization QR code or redirect](https://stripe.com/docs/payments/cash-app-pay/set-up-payment?platform=web&ui=API#web-create-setup-intent).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmIdealSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmIdealSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodIdealData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmIdealSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmPayPalSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodPayPalData, 'type'>;

  /**
   * The required url your customer will be directed to after they complete authentication.
   */
  return_url: string;
}

/**
 * Data to be sent with a `stripe.confirmSepaDebitSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmSepaDebitSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodSepaDebitData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmSofortSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmSofortSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodSofortData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmSofortSetup`.
 */
interface ConfirmSofortSetupOptions {
  /**
   * Set this to `false` if you want to [manually handle the authorization redirect](https://stripe.com/docs/payments/sofort/accept-a-payment?platform=web#handle-redirect).
   * Default is `true`.
   */
  handleActions?: boolean;
}

/**
 * Data to be sent with a `stripe.confirmAuBecsDebitSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmAuBecsDebitSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAuBecsDebitData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmBacsDebitSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmBacsDebitSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodBacsDebitData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmBancontactSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmBancontactSetupData extends SetupIntentConfirmParams {
  /*
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodBancontactData, 'type'>;
}

/**
 * Data to be sent with a `stripe.confirmAcssDebitSetup` request.
 * Refer to the [Setup Intents API](https://stripe.com/docs/api/setup_intents/confirm) for a full list of parameters.
 */
interface ConfirmAcssDebitSetupData extends SetupIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodAcssDebitData, 'type'>;
}

/**
 * An options object to control the behavior of `stripe.confirmAcssDebitSetup`.
 */
interface ConfirmAcssDebitSetupOptions {
  /**
   * Set this to true if you want to skip displaying the mandate confirmation.
   */
  skipMandate?: boolean;
}

/**
 * Data to be sent with a `stripe.verifyMicrodepositsForSetup` request.
 */
interface VerifyMicrodepositsForSetupData {
  /**
   * An array of two positive integers, in cents, equal to the values of the microdeposits sent to the bank account.
   */
  amounts?: Array<number>;

  /**
   * A six-character code starting with SM present in the microdeposit sent to the bank account.
   */
  descriptor_code?: string;
}

interface ConfirmUsBankAccountSetupData
  extends SetupIntentConfirmParams {
  /**
   * Either the `id` of an existing [PaymentMethod](https://stripe.com/docs/api/payment_methods), or an object containing data to create a `PaymentMethod` with.
   * This field is optional if a `PaymentMethod` has already been attached to this `SetupIntent`.
   *
   * @recommended
   */
  payment_method?: string | Omit<CreatePaymentMethodUsBankAccountData, 'type'>;
}

/**
 * Data to be sent with a `stripe.collectBankAccountForSetup` request.
 */
interface CollectBankAccountForSetupOptions {
  /**
   * The client secret of the SetupIntent.
   */
  clientSecret: string;

  params: CollectBankAccountParams;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}

/**
 * Parameters that will be passed on to the Stripe API to confirm payment for an Order's PaymentIntent.
 */
interface ProcessOrderParams {
  /**
   * The url your customer will be directed to after they complete payment.
   */
  return_url: string;
}

/**
 * An object containing the unique ID and client secret for a `Source`.
 *
 * You can use a `Source` object created with `stripe.createSource` as the argument to `stripe.retrieveSource`, as every `Source` object has both `id` and `client_secret` keys.
 */
interface RetrieveSourceParam {
  /**
   * Unique identifier of the `Source`.
   */
  id: string;

  /**
   * A secret available to the web client that created the `Source`, for purposes of retrieving the `Source` later from that same client.
   */
  client_secret: string;
}

/**
 * An object containing additional payment information you might have collected.
 *
 * Although these fields are optional, we highly recommend collecting name and address.
 * This information can be used to perform a number of verifications, such as CVC, ZIP, and address verification.
 * Radar includes built-in rules that can block payments where the ZIP or CVC verifications with the cardholder’s bank failed.
 */
interface CreateTokenCardData {
  /**
   * @recommended
   */
  name?: string;

  address_line1?: string;

  address_line2?: string;

  address_city?: string;

  address_state?: string;

  address_zip?: string;

  /**
   * A two character country code (for example, `US`).
   *
   * @recommended
   */
  address_country?: string;

  /**
   * Required in order to [add the card to a Connect account](https://stripe.com/docs/connect/payouts#bank-accounts) (in all other cases, this parameter is not used).
   * Currently, the only supported currency for debit card payouts is `usd`.
   */
  currency?: string;
}

interface CreateTokenIbanData {
  /**
   * Three character currency code (e.g., `eur`).
   */
  currency: string;

  account_holder_name: string;

  account_holder_type: string;
}

interface CreateTokenPiiData {
  personal_id_number: string;
}

interface CreateTokenBankAccountData {
  country: string;

  currency: string;

  routing_number?: string;

  account_number: string;

  account_holder_name?: string;

  account_holder_type: string;

  account_type?: string;
}

/**
 * A required object containing the `type` of `Source` you want to create, and any additional payment information that you have collected.
 * See the [Sources API](https://stripe.com/docs/api#create_source) reference for details.
 *
 * You cannot pass raw card information to `stripe.createSource(sourceData)`.
 * Instead, you must gather card information in an `Element` and use `stripe.createSource(element, sourceData)`.
 * You can also pass an existing card token to convert it into a `Source` object.
 */
interface CreateSourceData extends SourceCreateParams {
  bancontact?: CreateSourceData.DeprecatedMethodData;

  ideal?: CreateSourceData.DeprecatedMethodData;

  klarna?: CreateSourceData.DeprecatedMethodData;

  sepa_debit?: CreateSourceData.DeprecatedMethodData;

  sofort?: CreateSourceData.DeprecatedMethodData;
}

declare namespace CreateSourceData {
  export type DeprecatedMethodData = Record<string, unknown>;
}

/**
 * Data to be sent with a `stripe.collectFinancialConnectionsAccounts` request.
 */
interface CollectFinancialConnectionsAccountsOptions {
  /**
   * The client secret of the [Financial Connections Session](https://stripe.com/docs/api/financial_connections/session).
   */
  clientSecret: string;
}

/**
 * Data to be sent with a `stripe.collectBankAccountToken` request.
 */
interface CollectBankAccountTokenOptions {
  /**
   * The client secret of the [Financial Connections Session](https://stripe.com/docs/api/financial_connections/session).
   */
  clientSecret: string;
}

interface EphemeralKeyNonceOptions {
  issuingCard: string;
}

type ApplePayRecurringPaymentRequestIntervalUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute';

interface ApplePayLineItem {
  /**
   * A short, localized description of the line item.
   */
  label: string;

  /**
   * The amount in the currency's subunit (e.g. cents, yen, etc.)
   */
  amount: number;
}

type ApplePayRegularBilling = ApplePayLineItem & {
  /**
   * The date of the first payment.
   */
  recurringPaymentStartDate?: Date;

  /**
   * The date of the final payment.
   */
  recurringPaymentEndDate?: Date;

  /**
   * The amount of time — in calendar units, such as day, month, or year — that represents a fraction of the total payment interval.
   */
  recurringPaymentIntervalUnit?: ApplePayRecurringPaymentRequestIntervalUnit;

  /**
   * The number of interval units that make up the total payment interval.
   */
  recurringPaymentIntervalCount?: number;
};

interface ApplePayRecurringPaymentRequest {
  /**
   * The description of the payment that the customer will see in their Apple Pay wallet.
   */
  paymentDescription: string;

  /**
   * The URL to manage items related to the recurring payment on your website.
   */
  managementURL: string;
  regularBilling: ApplePayRegularBilling;

  /**
   * The billing agreement label that is displayed to the customer in the Apple Pay payment interface.
   */
  billingAgreement?: string;
}

type ApplePayAutomaticReloadBilling = ApplePayLineItem & {
  /**
   * The balance an account reaches before the merchant applies the automatic reload amount.
   */
  automaticReloadPaymentThresholdAmount: number;
};

interface ApplePayAutomaticReloadPaymentRequest {
  /**
   * The description of the payment that the customer will see in their Apple Pay wallet.
   */
  paymentDescription: string;

  /**
   * The URL to manage items related to the automatic reload payment on your website.
   */
  managementURL: string;
  automaticReloadBilling: ApplePayAutomaticReloadBilling;

  /**
   * The billing agreement label that is displayed to the customer in the Apple Pay payment interface.
   */
  billingAgreement?: string;
}

type ApplePayDeferredBilling = ApplePayLineItem & {
  /**
   * The date, in the future, of the payment.
   */
  deferredPaymentDate: Date;
};

interface ApplePayDeferredPaymentRequest {
  /**
   * The description of the payment that the customer will see in their Apple Pay wallet.
   */
  paymentDescription: string;

  /**
   * The URL to manage items related to the deferred payment on your website.
   */
  managementURL: string;
  deferredBilling: ApplePayDeferredBilling;

  /**
   * The billing agreement label that is displayed to the customer in the Apple Pay payment interface.
   */
  billingAgreement?: string;

  /**
   * The future date before which the customer can cancel the deferred payment for free.
   */
  freeCancellationDate?: Date;

  /**
   * The time zone of the free cancellation date.
   *
   * These are [tz](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) timezones such as `America/Los_Angeles`, `Europe/Dublin`, and `Asia/Singapore`.
   */
  freeCancellationDateTimeZone?: string;
}

type ApplePayOption =
  | {
      recurringPaymentRequest: ApplePayRecurringPaymentRequest;
      deferredPaymentRequest?: null;
      automaticReloadPaymentRequest?: null;
    }
  | {
      recurringPaymentRequest?: null;
      deferredPaymentRequest: ApplePayDeferredPaymentRequest;
      automaticReloadPaymentRequest?: null;
    }
  | {
      recurringPaymentRequest?: null;
      deferredPaymentRequest?: null;
      automaticReloadPaymentRequest: ApplePayAutomaticReloadPaymentRequest;
    }
  | {
      recurringPaymentRequest?: null;
      deferredPaymentRequest?: null;
      automaticReloadPaymentRequest?: null;
    };

type ApplePayUpdateOption =
  | {
      recurringPaymentRequest: ApplePayRecurringPaymentRequest;
      automaticReloadPaymentRequest?: null;
    }
  | {
      recurringPaymentRequest?: null;
      automaticReloadPaymentRequest: ApplePayAutomaticReloadPaymentRequest;
    }
  | {
      recurringPaymentRequest?: null;
      automaticReloadPaymentRequest?: null;
    };

interface PaymentRequest {
  /**
   * Returns a `Promise` that resolves with a truthy value if an enabled wallet is ready to pay.
   * If no wallet is available, it resolves with `null`.
   */
  canMakePayment(): Promise<CanMakePaymentResult | null>;

  /**
   * Shows the browser’s payment interface.
   * When using the `PaymentRequestButtonElement`, this is called for you automatically.
   * This method must be called as the result of a user interaction (for example, in a click handler).
   */
  show(): void;

  /**
   * Closes the browser’s payment interface.
   */
  abort: () => void;

  /**
   * `true` if the browser’s payment interface is showing.
   * When using the `PaymentRequestButtonElement`, this is called for you automatically.
   */
  isShowing: () => boolean;

  /**
   * `PaymentRequest` instances can be updated with an options object.
   *
   * `paymentRequest.update` can only be called when the browser payment interface is not showing.
   * Listen to the [click](https://stripe.com/docs/js/element/events) and [cancel](https://stripe.com/docs/js/element/events) events to detect if the payment interface has been initiated.
   * To update the `PaymentRequest` right before the payment interface is initiated, call `paymentRequest.update` in your click event handler.
   */
  update(options: PaymentRequestUpdateOptions): void;

  /**
   * Stripe.js automatically creates a `Token` after the customer is done interacting with the browser’s payment interface.
   * To access the created `Token`, listen for this event.
   */
  on(
    eventType: 'token',
    handler: (event: PaymentRequestTokenEvent) => any
  ): this;
  once(
    eventType: 'token',
    handler: (event: PaymentRequestTokenEvent) => any
  ): this;
  off(
    eventType: 'token',
    handler?: (event: PaymentRequestTokenEvent) => any
  ): this;

  /**
   * Stripe.js automatically creates a `PaymentMethod` after the customer is done interacting with the browser’s payment interface.
   * To access the created `PaymentMethod`, listen for this event.
   */
  on(
    eventType: 'paymentmethod',
    handler: (event: PaymentRequestPaymentMethodEvent) => any
  ): this;
  once(
    eventType: 'paymentmethod',
    handler: (event: PaymentRequestPaymentMethodEvent) => any
  ): this;
  off(
    eventType: 'paymentmethod',
    handler?: (event: PaymentRequestPaymentMethodEvent) => any
  ): this;

  /**
   * Stripe.js automatically creates a `Source` after the customer is done interacting with the browser’s payment interface.
   * To access the created `Source`, listen for this event.
   */
  on(
    eventType: 'source',
    handler: (event: PaymentRequestSourceEvent) => any
  ): this;
  once(
    eventType: 'source',
    handler: (event: PaymentRequestSourceEvent) => any
  ): this;
  off(
    eventType: 'source',
    handler?: (event: PaymentRequestSourceEvent) => any
  ): this;

  /**
   * The cancel event is emitted from a `PaymentRequest` when the browser's payment interface is dismissed.
   *
   * Note that in some browsers, the payment interface may be dismissed by the customer even after they authorize the payment.
   * This means that you may receive a cancel event on your `PaymentRequest` object after receiving a `token`, `paymentmethod`, or `source` event.
   * If you’re using the cancel event as a hook for canceling the customer’s order, make sure you also refund the payment that you just created.
   */
  on(eventType: 'cancel', handler: () => any): this;
  once(eventType: 'cancel', handler: () => any): this;
  off(eventType: 'cancel', handler?: () => any): this;

  /**
   * The `shippingaddresschange` event is emitted from a `PaymentRequest` whenever the customer selects a new address in the browser's payment interface.
   */
  on(
    eventType: 'shippingaddresschange',
    handler: (event: PaymentRequestShippingAddressEvent) => any
  ): this;
  once(
    eventType: 'shippingaddresschange',
    handler: (event: PaymentRequestShippingAddressEvent) => any
  ): this;
  off(
    eventType: 'shippingaddresschange',
    handler?: (event: PaymentRequestShippingAddressEvent) => any
  ): this;

  /**
   * The `shippingoptionchange` event is emitted from a `PaymentRequest` whenever the customer selects a new shipping option in the browser's payment interface.
   */
  on(
    eventType: 'shippingoptionchange',
    handler: (event: PaymentRequestShippingOptionEvent) => any
  ): this;
  once(
    eventType: 'shippingoptionchange',
    handler: (event: PaymentRequestShippingOptionEvent) => any
  ): this;
  off(
    eventType: 'shippingoptionchange',
    handler?: (event: PaymentRequestShippingOptionEvent) => any
  ): this;
}

type CanMakePaymentResult = Record<string, boolean>;

interface PaymentRequestUpdateOptions {
  /**
   * Three character currency code (e.g., `usd`).
   */
  currency?: string;

  /**
   * This `PaymentRequestItem` is shown to the customer in the browser’s payment interface.
   */
  total?: PaymentRequestItem;

  /**
   * An array of PaymentRequestItem objects.
   * These objects are shown as line items in the browser’s payment interface.
   * Note that the sum of the line item amounts does not need to add up to the `total` amount above.
   */
  displayItems?: PaymentRequestItem[];
  /**
   * An array of `ShippingOption` objects.
   * The first shipping option listed appears in the browser payment interface as the default option.
   */

  shippingOptions?: PaymentRequestShippingOption[];

  /**
   * Specify the options to be used when the Apple Pay payment interface opens.
   */
  applePay?: ApplePayOption;
}

/**
 * An set of options to create this `PaymentRequest` instance with.
 * These options can be updated using `paymentRequest.update`.
 */
interface PaymentRequestOptions {
  /**
   * The two-letter country code of your Stripe account (e.g., `US`).
   */
  country: string;

  /**
   * Three character currency code (e.g., `usd`).
   */
  currency: string;

  /**
   * This `PaymentRequestItem` is shown to the customer in the browser’s payment interface.
   */
  total: PaymentRequestItem;

  /**
   * An array of PaymentRequestItem objects.
   * These objects are shown as line items in the browser’s payment interface.
   * Note that the sum of the line item amounts does not need to add up to the `total` amount above.
   */
  displayItems?: PaymentRequestItem[];

  /**
   * By default, the browser's payment interface only asks the customer for actual payment information.
   * A customer name can be collected by setting this option to `true`.
   * This collected name will appears in the `PaymentRequestEvent` object.
   *
   * We highly recommend you collect at least one of name, email, or phone as this also results in collection of billing address for Apple Pay.
   * The billing address can be used to perform address verification and block fraudulent payments.
   * For all other payment methods, the billing address is automatically collected when available.
   */
  requestPayerName?: boolean;

  /**
   * See the `requestPayerName` option.
   */
  requestPayerPhone?: boolean;

  /**
   * See the `requestPayerName` option.
   */
  requestPayerEmail?: boolean;

  /**
   * Collect shipping address by setting this option to `true`.
   * The address appears in the `PaymentRequestEvent`.
   *
   * You must also supply a valid `PaymentRequestShippingOption` to the `shippingOptions` property.
   * This can be up front at the time `stripe.paymentRequest` is called, or in response to a `shippingaddresschange` event using the `updateWith` callback.
   */
  requestShipping?: boolean;

  /**
   * An array of `ShippingOption` objects.
   * The first shipping option listed appears in the browser payment interface as the default option.
   */
  shippingOptions?: PaymentRequestShippingOption[];

  /**
   * An array of wallet strings.
   * Can be one or more of `applePay`, `googlePay`, `link` and `browserCard`.
   * Use this option to disable Apple Pay, Google Pay, Link and/or browser-saved cards.
   */
  disableWallets?: PaymentRequestWallet[];

  /**
   * Specify the options to be used when the Apple Pay payment interface opens.
   */
  applePay?: ApplePayOption;

  /**
   * @deprecated
   * Use disableWallets instead.
   */
  wallets?: PaymentRequestWallet[];
}

/**
 * A `PaymentRequestItem` object is used to configure a `PaymentRequest`.
 */
interface PaymentRequestItem {
  /**
   * The amount in the currency's subunit (e.g. cents, yen, etc.)
   */
  amount: number;

  /**
   * A name that the browser shows the customer in the payment interface.
   */
  label: string;

  /**
   * If you might change this amount later (for example, after you have calcluated shipping costs), set this to `true`.
   * Note that browsers treat this as a hint for how to display things, and not necessarily as something that will prevent submission.
   */
  pending?: boolean;
}

/**
 * The `ShippingOption` object describes a shipping method used with a `PaymentRequest`.
 */
interface PaymentRequestShippingOption {
  /**
   * A unique ID you create to keep track of this shipping option.
   * You’ll be told the ID of the selected option on changes and on completion.
   */
  id: string;

  /**
   * A short label for this shipping option.
   */
  label: string;

  /**
   * A longer description of this shipping option.
   */
  detail: string;

  /**
   * The amount to show for this shipping option.
   * If the cost of this shipping option depends on the shipping address the customer enters, listen for the `shippingaddresschange` event.
   */
  amount: number;
}

type PaymentRequestWallet =
  | 'applePay'
  | 'googlePay'
  | 'link'
  | 'browserCard';

type PaymentRequestCompleteStatus =
  /**
   * Report to the browser that the payment was successful, and that it can close any active payment interface.
   */
  | 'success'

  /**
   * Report to the browser that you were unable to process the customer‘s payment.
   * Browsers may re-show the payment interface, or simply show a message and close.
   */
  | 'fail'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_name'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_phone'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_email'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_shipping_address';

interface PaymentRequestEvent {
  /**
   * Call this function with a `CompleteStatus` when you have processed the token data provided by the API.
   * Note that you must must call complete within 30 seconds.
   */
  complete: (status: PaymentRequestCompleteStatus) => void;

  /**
   * The customer's name.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerName?: string;

  /**
   * The customer's email.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerEmail?: string;

  /**
   * The customer's phone.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerPhone?: string;

  /**
   * The final `ShippingAddress` the customer selected.
   * Only present when `requestShipping` is `true` when [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create), and you've supplied at least one `ShippingOption`.
   */
  shippingAddress?: PaymentRequestShippingAddress;

  /**
   * The final `ShippingOption` the customer selected.
   * Only present when `requestShipping` is `true` when [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create), and you've supplied at least one `ShippingOption`.
   */
  shippingOption?: PaymentRequestShippingOption;

  /**
   * The unique name of the wallet the customer chose to authorize payment.
   * For example, `browserCard`.
   */
  walletName: PaymentRequestWallet | string;

  /**
   * @deprecated
   * Use walletName instead.
   */
  methodName: string;
}

/**
 * Describes a shipping address collected with a `PaymentRequest`.
 */
interface PaymentRequestShippingAddress {
  /**
   * Two-letter country code, capitalized.
   * Valid two-letter country codes are specified by ISO3166 alpha-2.
   */
  country?: string;

  /**
   * An array of address line items.
   * For example, `185 Berry St.`, `Suite 500`, `P.O. Box 12345`, etc.
   */
  addressLine?: string[];

  /**
   * The most coarse subdivision of a country.
   * Depending on the country, this might correspond to a state, a province, an oblast, a prefecture, or something else along these lines.
   */
  region?: string;

  /**
   * The name of a city, town, village, etc.
   */
  city?: string;

  /**
   * The postal code or ZIP code, also known as PIN code in India.
   */
  postalCode?: string;

  /**
   * The name of the recipient.
   * This might be a person, a business name, or contain “care of” (c/o) instructions.
   */
  recipient?: string;

  /**
   * The phone number of the recipient.
   * Note that this might be different from any phone number you collect with `requestPayerPhone`.
   */
  phone?: string;

  /**
   * The sorting code as used in, for example, France.
   * Not present on Apple platforms.
   */
  sortingCode?: string;

  /**
   * A logical subdivision of a city.
   * Can be used for things like neighborhoods, boroughs, districts, or UK dependent localities.
   * Not present on Apple platforms.
   */
  dependentLocality?: string;
}

interface PaymentRequestTokenEvent extends PaymentRequestEvent {
  token: Token;
}

interface PaymentRequestPaymentMethodEvent extends PaymentRequestEvent {
  paymentMethod: PaymentMethod;
}

interface PaymentRequestSourceEvent extends PaymentRequestEvent {
  source: Source;
}

interface PaymentRequestShippingAddressEvent {
  /**
   * Call this with an `UpdateDetails` object to merge updates into the current `PaymentRequest` object.
   * Note that if you subscribe to `shippingaddresschange` events, then you must call `updateWith` within 30 seconds.
   */
  updateWith: (details: PaymentRequestUpdateDetails) => void;

  /**
   * The customer's selected `ShippingAddress`.
   * To maintain privacy, browsers may anonymize the shipping address by removing sensitive information that is not necessary to calculate shipping costs.
   * Depending on the country, some fields can be missing or partially redacted.
   * For example, the shipping address in the U.S. may only contain a city, state, and ZIP code.
   * The full shipping address appears in the `PaymentRequestEvent` object after the purchase is confirmed in the browser’s payment interface
   */
  shippingAddress: PaymentRequestShippingAddress;
}

type PaymentRequestUpdateDetailsStatus =
  /**
   * Let the customer proceed.
   */
  | 'success'

  /**
   * Prevent the customer from making the change they just made.
   */
  | 'fail'

  /**
   * Equivalent to `fail`, except we show a more specific error message.
   * Can only be used in a `shippingaddresschange` handler.
   */
  | 'invalid_shipping_address';

/**
 * An object to pass to the `updateWith` callback on `shippingaddresschange` and `shippingoptionchange` events.
 */
interface PaymentRequestUpdateDetails {
  /**
   * The browser uses this value to show an error message to the customer if they've taken an action that invalidates the payment request.
   */
  status?: PaymentRequestUpdateDetailsStatus;

  /**
   * The new total amount, if applicable.
   */
  total?: PaymentRequestItem;

  /**
   * These `PaymentRequestItem`s are shown as line items in the browser's payment interface.
   * Note that the sum of the line item amounts does not need to add up to the `total` amount.
   */
  displayItems?: PaymentRequestItem[];

  /**
   * The first shipping option listed appears in the browser payment interface as the default option.
   */
  shippingOptions?: PaymentRequestShippingOption[];

  /**
   * Specify new options to refresh the Apple Pay payment interface.
   */
  applePay?: ApplePayUpdateOption;
}

interface PaymentRequestShippingOptionEvent {
  /**
   * Call this with an `UpdateDetails` object to merge updates into the current `PaymentRequest` object.
   * Note that if you subscribe to `shippingaddresschange` events, then you must call `updateWith` within 30 seconds.
   */
  updateWith: (details: PaymentRequestUpdateDetails) => void;

  /**
   * The customer's selected `ShippingOption`.
   */
  shippingOption: PaymentRequestShippingOption;
}

interface StripeEmbeddedCheckoutOptions {
  /**
   * The client secret of the [Checkout Session](https://stripe.com/docs/api/checkout/sessions).
   */
  clientSecret?: string;
  /**
   * A function that returns a Promise which resolves with the client secret of
   * the [Checkout Session](https://stripe.com/docs/api/checkout/sessions).
   */
  fetchClientSecret?: () => Promise<string>;
  /**
   * onComplete is called when the Checkout Session completes successfully.
   * You can use it to unmount Embedded Checkout and render a custom success UI.
   */
  onComplete?: () => void;
}

interface StripeEmbeddedCheckout {
  /**
   * The `embeddedCheckout.mount` method attaches your Embedded Checkout to the DOM.
   * `mount` accepts either a CSS Selector (e.g., `'#checkout'`) or a DOM element.
   */
  mount(location: string | HTMLElement): void;
  /**
   * Unmounts Embedded Checkout from the DOM.
   * Call `embeddedCheckout.mount` to re-attach it to the DOM.
   */
  unmount(): void;
  /**
   * Removes Embedded Checkout from the DOM and destroys it.
   * Once destroyed it not be re-mounted to the DOM.
   * Use this if you want to create a new Embedded Checkout instance.
   */
  destroy(): void;
}

interface Stripe {
  /////////////////////////////
  /// Elements
  ///
  /// https://stripe.com/docs/js/elements_object
  /////////////////////////////

  /**
   * Create an `Elements` instance, which manages a group of elements.
   *
   * https://stripe.com/docs/js/elements_object/create
   */
  elements(options?: StripeElementsOptionsClientSecret): StripeElements;

  /**
   * Create an `Elements` instance, which manages a group of elements.
   *
   * https://stripe.com/docs/js/elements_object/create_without_intent
   */
  elements(options?: StripeElementsOptionsMode): StripeElements;

  /////////////////////////////
  /// Checkout
  ///
  /// https://stripe.com/docs/js/checkout
  /////////////////////////////

  /**
   * Use `stripe.redirectToCheckout` to redirect your customers to [Checkout](https://stripe.com/docs/payments/checkout), a Stripe-hosted page to securely collect payment information.
   * When the customer completes their purchase, they are redirected back to your website.
   */
  redirectToCheckout(
    options: RedirectToCheckoutOptions
  ): Promise<never | {error: StripeError}>;

  /////////////////////////////
  /// Payment Intents
  ///
  /// https://stripe.com/docs/js/payment_intents
  /////////////////////////////

  /**
   * Use `stripe.confirmPayment` to confirm a PaymentIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmPayment` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, `stripe.confirmPayment` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `stripe.confirmPayment` will only redirect if your user chooses a redirect-based payment method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_payment
   */
  confirmPayment(options: {
    elements: StripeElements;
    confirmParams?: Partial<ConfirmPaymentData>;
    redirect: 'if_required';
  }): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmPayment` to confirm a PaymentIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmPayment` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, `stripe.confirmPayment` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `stripe.confirmPayment` will only redirect if your user chooses a redirect-based payment method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_payment
   */
  confirmPayment(options: {
    elements?: StripeElements;
    clientSecret: string;
    confirmParams?: Partial<ConfirmPaymentData>;
    redirect: 'if_required';
  }): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmPayment` to confirm a PaymentIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmPayment` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_payment
   */
  confirmPayment(options: {
    elements: StripeElements;
    confirmParams: ConfirmPaymentData;
    redirect?: 'always';
  }): Promise<never | {error: StripeError}>;

  /**
   * Use `stripe.confirmPayment` to confirm a PaymentIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmPayment` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_payment
   */
  confirmPayment(options: {
    elements?: StripeElements;
    clientSecret: string;
    confirmParams: ConfirmPaymentData;
    redirect?: 'always';
  }): Promise<never | {error: StripeError}>;

  /**
   * Use `stripe.confirmAcssDebitPayment` in the [Accept a Canadian pre-authorized debit payment](https://stripe.com/docs/payments/acss-debit/accept-a-payment) flow when the customer submits your payment form.
   * When called, it will automatically pop up a modal to collect bank account details and verification, accept the mandate, and confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) when the user submits the form.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * `stripe.confirmAcssDebitPayment` automatically creates a new `PaymentMethod` for you when your customer completes the modal UI.
   * It can also be called with an existing `PaymentMethod` which will load the modal UI to collect a new mandate agreement.
   * If you have already attached a `PaymentMethod`, you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_acss_debit_payment
   */
  confirmAcssDebitPayment(
    clientSecret: string,
    data?: ConfirmAcssDebitPaymentData,
    options?: ConfirmAcssDebitPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmUsBankAccountPayment` in the [Accept a payment](https://stripe.com/docs/payments/ach-debit/accept-a-payment) flow for the [ACH Direct Debit]((https://stripe.com/docs/payments/ach-debit) payment method to record the customer’s authorization for payment.
   *
   * When you confirm a [PaymentIntent](https://stripe.com/docs/api/payment_intents), it needs to have an attached PaymentMethod.
   * Use `stripe.collectBankAccountForPayment` to collect and attach a [PaymentMethod](https://stripe.com/docs/api/payment_methods), or provide bank account details using the `data` parameter if a `PaymentMethod` was not already provided.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_us_bank_account_payment
   */
  confirmUsBankAccountPayment(
    clientSecret: string,
    data?: ConfirmUsBankAccountPaymentData
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmAlipayPayment` in the [Alipay Payments](https://stripe.com/docs/payments/alipay) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_alipay_payment
   */
  confirmAlipayPayment(
    clientSecret: string,
    data?: ConfirmAlipayPaymentData,
    options?: ConfirmAlipayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmAuBecsDebitPayment` in the [BECS Direct Debit Payments](https://stripe.com/docs/payments/payment-methods/au-becs-debit) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-payment-intents) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_au_becs_debit_payment
   */
  confirmAuBecsDebitPayment(
    clientSecret: string,
    data?: ConfirmAuBecsDebitPaymentData
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmBancontactPayment` in the [Bancontact Payments with Payment Methods](https://stripe.com/docs/payments/bancontact#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_bancontact_payment
   */
  confirmBancontactPayment(
    clientSecret: string,
    data?: ConfirmBancontactPaymentData,
    options?: ConfirmBancontactPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmBlikPayment` in the [BLIK Payments with Payment Methods](https://stripe.com/docs/payments/blik) flow when the customer submits your payment form.
   * When called, it will confirm the PaymentIntent with data you provide, and it will automatically prompt the customer to authorize the transaction.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_blik_payment
   */
  confirmBlikPayment(
    clientSecret: string,
    data: ConfirmBlikPaymentData,
    options?: ConfirmBlikPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmBoletoPayment` in the [Boleto Payment](https://stripe.com/docs/payments/boleto) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/boleto) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_boleto_payment
   */
  confirmBoletoPayment(
    clientSecret: string,
    data?: ConfirmBoletoPaymentData,
    options?: ConfirmBoletoPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmCardPayment` when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide and carry out 3DS or other next actions if they are required.
   *
   * If you are using [Dynamic 3D Secure](https://stripe.com/docs/payments/3d-secure#three-ds-radar), `stripe.confirmCardPayment` will trigger your Radar rules to execute and may open a dialog for your customer to authenticate their payment.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_card_payment
   */
  confirmCardPayment(
    clientSecret: string,
    data?: ConfirmCardPaymentData,
    options?: ConfirmCardPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmCashappPayment` in the [Cash App Payments](https://stripe.com/docs/payments/cash-app-pay) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/cash-app-pay) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_cashapp_payment
   */
  confirmCashappPayment(
    clientSecret: string,
    data?: ConfirmCashappPaymentData,
    options?: ConfirmCashappPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmCustomerBalancePayment` when the customer submits your payment form.
   *
   * When called, it will confirm the PaymentIntent with data you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/bank-transfers) for more details.
   *
   * Since the Customer Balance payment method draws from a balance, the attempt will succeed or fail depending on the current balance amount. To collect more funds from the customer when the cash balance is insufficient, use the customer balance with bank transfer funding parameters.
   * The confirmation attempt will finish in one of the following result states:
   * 1. If the customer balance was enough to pay the amount, the status is succeeded. The funding_type data is effectively ignored.
   * 2. If the balance was not enough to pay the amount, and you didn't send the funding_type, the status is requires_payment_method.
   * 3. If the balance was not enough to pay the amount, and you did send the funding_type, the status is requires_action. The paymentIntent.next_action.display_bank_transfer_instructions hash contains bank transfer details for funding the Customer Balance.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_customer_balance_payment
   */
  confirmCustomerBalancePayment(
    clientSecret: string,
    data: ConfirmCustomerBalancePaymentData,
    options: ConfirmCustomerBalancePaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmEpsPayment` in the [EPS Payments with Payment Methods](https://stripe.com/docs/payments/eps#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_eps_payment
   */
  confirmEpsPayment(
    clientSecret: string,
    data?: ConfirmEpsPaymentData,
    options?: ConfirmEpsPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmFpxPayment` in the [FPX Payments with Payment Methods](https://stripe.com/docs/payments/fpx#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_fpx_payment
   */
  confirmFpxPayment(
    clientSecret: string,
    data?: ConfirmFpxPaymentData,
    options?: ConfirmFpxPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmGiropayPayment` in the [giropay Payments with Payment Methods](https://stripe.com/docs/payments/giropay#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_giropay_payment
   */
  confirmGiropayPayment(
    clientSecret: string,
    data?: ConfirmGiropayPaymentData,
    options?: ConfirmGiropayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmGrabPayPayment` in the [GrabPay payments](https://stripe.com/docs/payments/grabpay) flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents).
   * Refer to our [integration guide](https://stripe.com/docs/payments/grabpay/accept-a-payment) for more details.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_grabpay_payment
   */

  confirmGrabPayPayment(
    clientSecret: string,
    data?: ConfirmGrabPayPaymentData,
    options?: ConfirmGrabPayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmIdealPayment` in the [iDEAL Payments with Payment Methods](https://stripe.com/docs/payments/ideal) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_ideal_payment
   */
  confirmIdealPayment(
    clientSecret: string,
    data?: ConfirmIdealPaymentData,
    options?: ConfirmIdealPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmKlarnaPayment` in the [Klarna Payments](https://stripe.com/docs/payments/klarna) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_klarna_payment
   */
  confirmKlarnaPayment(
    clientSecret: string,
    data?: ConfirmKlarnaPaymentData,
    options?: ConfirmKlarnaPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmKonbiniPayment` in the [Konbini](https://stripe.com/docs/payments/konbini) payment flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/konbini/accept-a-payment) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_konbini_payment
   */
  confirmKonbiniPayment(
    clientSecret: string,
    data?: ConfirmKonbiniPaymentData,
    options?: ConfirmKonbiniPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmOxxoPayment` in the [OXXO Payment](https://stripe.com/docs/payments/oxxo) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/oxxo) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_oxxo_payment
   */
  confirmOxxoPayment(
    clientSecret: string,
    data?: ConfirmOxxoPaymentData,
    options?: ConfirmOxxoPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmP24Payment` in the [Przelewy24 Payments with Payment Methods](https://stripe.com/docs/payments/p24#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_p24_payment
   */
  confirmP24Payment(
    clientSecret: string,
    data?: ConfirmP24PaymentData,
    options?: ConfirmP24PaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmPayNowPayment` in the [PayNow Payments](https://stripe.com/docs/payments/paynow) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/paynow) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   */
  confirmPayNowPayment(
    clientSecret: string,
    data?: ConfirmPayNowPaymentData,
    options?: ConfirmPayNowPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmPayPalPayment` in the [PayPal Payments](https://stripe.com/docs/payments/paypal) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_paypal_payment
   */
  confirmPayPalPayment(
    clientSecret: string,
    data?: ConfirmPayPalPaymentData
  ): Promise<PaymentIntentResult>;

  /**

   * Use `stripe.confirmPixPayment` in the [Pix Payments](https://stripe.com/docs/payments/pix) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/pix) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_pix_payment
   */
  confirmPixPayment(
    clientSecret: string,
    data?: ConfirmPixPaymentData,
    options?: ConfirmPixPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmPromptPayPayment` in the [PromptPay Payments](https://stripe.com/docs/payments/promptpay) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/promptpay) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   */
  confirmPromptPayPayment(
    clientSecret: string,
    data?: ConfirmPromptPayPaymentData,
    options?: ConfirmPromptPayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmSepaDebitPayment` in the [SEPA Direct Debit Payments](https://stripe.com/docs/payments/sepa-debit) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/sepa-debit) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment
   */
  confirmSepaDebitPayment(
    clientSecret: string,
    data?: ConfirmSepaDebitPaymentData
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmSofortPayment` in the [Sofort Payments with Payment Methods](https://stripe.com/docs/payments/sofort) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide. It will then automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_sofort_payment
   */
  confirmSofortPayment(
    clientSecret: string,
    data?: ConfirmSofortPaymentData,
    options?: ConfirmSofortPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmWechatPayPayment` in the [Wechat Pay Payments](https://stripe.com/docs/payments/wechat-pay) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/wechat-pay/accept-a-payment) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_wechat_pay_payment
   */
  confirmWechatPayPayment(
    clientSecret: string,
    data?: ConfirmWechatPayPaymentData,
    options?: ConfirmWechatPayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.handleCardAction` in the Payment Intents API [manual confirmation](https://stripe.com/docs/payments/payment-intents/web-manual) flow to handle a [PaymentIntent](https://stripe.com/docs/api/payment_intents) with the `requires_action` status.
   * It will throw an error if the `PaymentIntent` has a different status.
   *
   * Note that `stripe.handleCardAction` may take several seconds to complete.
   * During that time, you should disable your form from being resubmitted and show a waiting indicator like a spinner.
   * If you receive an error result, you should be sure to show that error to the customer, re-enable the form, and hide the waiting indicator.
   *
   * Additionally, `stripe.handleCardAction` may trigger a [3D Secure](https://stripe.com/docs/payments/3d-secure) authentication challenge.
   * The authentication challenge requires a context switch that can be hard to follow on a screen-reader.
   * Ensure that your form is accessible by ensuring that success or error messages are clearly read out.
   *
   * @docs https://stripe.com/docs/js/payment_intents/handle_card_action
   */
  handleCardAction(clientSecret: string): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.handleNextAction` in the [finalizing payments on the server](https://stripe.com/docs/payments/finalize-payments-on-the-server) flow to finish confirmation of a [PaymentIntent](https://stripe.com/docs/api/payment_intents) or [SetupIntent](https://stripe.com/docs/api/setup_intents) with the `requires_action` status.
   * It will throw an error if the `PaymentIntent` or `SetupIntent` has a different status.
   *
   * Note that `stripe.handleNextAction` may take several seconds to complete.
   * During that time, you should disable your form from being resubmitted and show a waiting indicator like a spinner.
   * If you receive an error result, you should be sure to show that error to the customer, re-enable the form, and hide the waiting indicator.
   *
   * Additionally, `stripe.handleNextAction` may trigger a [3D Secure](https://stripe.com/docs/payments/3d-secure) authentication challenge.
   * The authentication challenge requires a context switch that can be hard to follow on a screen-reader.
   * Ensure that your form is accessible by ensuring that success or error messages are clearly read out.
   *
   * @docs https://stripe.com/docs/js/payment_intents/handle_next_action
   */
  handleNextAction(options: {
    clientSecret: string;
  }): Promise<PaymentIntentOrSetupIntentResult>;

  /**
   * Use `stripe.verifyMicrodepositsForPayment` in the [Accept a Canadian pre-authorized debit payment](https://stripe.com/docs/payments/acss-debit/accept-a-payment) flow
   * to verify a customer's bank account with micro-deposits.
   *
   * @docs https://stripe.com/docs/js/payment_intents/verify_microdeposits_for_payment
   */
  verifyMicrodepositsForPayment(
    clientSecret: string,
    data?: VerifyMicrodepositsForPaymentData
  ): Promise<PaymentIntentResult>;

  /**
   * Use stripe.createRadarSession to create a [Radar Session](https://stripe.com/docs/radar/radar-session) in your checkout flow or when saving card details.
   * A Radar Session is a snapshot of the browser metadata and device details that helps Radar make more accurate predictions on your payments.
   * This metadata includes information like IP address, browser, screen or device information, and other device characteristics.
   * By using Radar Sessions, you can capture critical fraud information without tokenizing on Stripe.
   */
  createRadarSession(): Promise<RadarSessionPayload>;

  /**
   * Use `stripe.collectBankAccountForPayment` in the [Accept a payment flow](https://stripe.com/docs/payments/ach-debit/accept-a-payment) for the [ACH Direct Debit](https://stripe.com/docs/payments/ach-debit)
   * payment method to collect the customer’s bank account in your payment form.
   *
   * @docs https://stripe.com/docs/js/payment_intents/collect_bank_account_for_payment
   */
  collectBankAccountForPayment(
    options: CollectBankAccountForPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use stripe.createPaymentMethod to convert payment information collected by elements into a [PaymentMethod](https://stripe.com/docs/api/payment_methods) object that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/payment_methods/create_payment_method
   */
  createPaymentMethod(
    paymentMethodData: CreatePaymentMethodData
  ): Promise<PaymentMethodResult>;

  /**
   * Use stripe.createPaymentMethod to convert payment information collected by elements into a [PaymentMethod](https://stripe.com/docs/api/payment_methods) object that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/payment_methods/create_payment_method_elements
   */
  createPaymentMethod(
    options: CreatePaymentMethodFromElements
  ): Promise<PaymentMethodResult>;

  /**
   * Use stripe.createPaymentMethod to convert payment information collected by elements into a [PaymentMethod](https://stripe.com/docs/api/payment_methods) object that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/payment_methods/create_payment_method_elements
   */
  createPaymentMethod(
    options: CreatePaymentMethodFromElement
  ): Promise<PaymentMethodResult>;

  /**
   * Retrieve a [PaymentIntent](https://stripe.com/docs/api/payment_intents) using its [client secret](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret).
   *
   * @docs https://stripe.com/docs/js/payment_intents/retrieve_payment_intent
   */
  retrievePaymentIntent(clientSecret: string): Promise<PaymentIntentResult>;

  /////////////////////////////
  /// Setup Intents
  ///
  /// https://stripe.com/docs/js/setup_intents
  /////////////////////////////

  /**
   * Use `stripe.confirmSetup` to confirm a SetupIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmSetup` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, stripe.`confirmSetup` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `stripe.confirmSetup` will only redirect if your user chooses a redirect-based payment method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_setup
   */
  confirmSetup(options: {
    elements: StripeElements;
    confirmParams?: Partial<ConfirmPaymentData>;
    redirect: 'if_required';
  }): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmSetup` to confirm a SetupIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmSetup` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, stripe.`confirmSetup` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `stripe.confirmSetup` will only redirect if your user chooses a redirect-based payment method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_setup
   */
  confirmSetup(options: {
    elements?: StripeElements;
    clientSecret: string;
    confirmParams?: Partial<ConfirmPaymentData>;
    redirect: 'if_required';
  }): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmSetup` to confirm a SetupIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmSetup` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_setup
   */
  confirmSetup(options: {
    elements: StripeElements;
    confirmParams: ConfirmPaymentData;
    redirect?: 'always';
  }): Promise<never | {error: StripeError}>;

  /**
   * Use `stripe.confirmSetup` to confirm a SetupIntent using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.confirmSetup` will attempt to complete any [required actions](https://stripe.com/docs/payments/intents), such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_setup
   */
  confirmSetup(options: {
    elements?: StripeElements;
    clientSecret: string;
    confirmParams: ConfirmPaymentData;
    redirect?: 'always';
  }): Promise<never | {error: StripeError}>;

  /**
   * Use `stripe.confirmAcssDebitSetup` to [save details for future payments with pre-authorized debit in Canada](https://stripe.com/docs/payments/acss-debit/set-up-payment).
   * When called, it will automatically pop up a modal to collect bank account details and verification, accept the mandate, and confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) when the user submits the form.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * `stripe.confirmAcssDebitSetup` automatically creates a new `PaymentMethod` for you when your customer completes the modal UI.
   * It can also be called with an existing `PaymentMethod` which will load the modal UI to collect a new mandate agreement.
   * If you have already attached a `PaymentMethod`, you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_acss_debit_setup
   */
  confirmAcssDebitSetup(
    clientSecret: string,
    data?: ConfirmAcssDebitSetupData,
    options?: ConfirmAcssDebitSetupOptions
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmUsBankAccountSetup` in the [Save bank details](https://stripe.com/docs/payments/ach-debit/set-up-payment) flow for the [ACH Direct Debit payment](https://stripe.com/docs/payments/ach-debit) method to record the customer’s authorization for future payments.
   *
   * When you confirm a [SetupIntent](https://stripe.com/docs/api/setup_intents), it needs to have an attached PaymentMethod.
   * Use `stripe.collectBankAccountForSetup` to collect and attach a [PaymentMethod](https://stripe.com/docs/api/payment_methods), or provide bank account details using the `data` parameter if a `PaymentMethod` was not already provided.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_us_bank_account_setup
   */
  confirmUsBankAccountSetup(
    clientSecret: string,
    data?: ConfirmUsBankAccountSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmAuBecsDebitSetup` in the [BECS Direct Debit with Setup Intents](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-setup-intents) flow when the customer submits your payment form.
   * When called, it will confirm the `SetupIntent` with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-setup-intents) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_au_becs_debit_setup
   */
  confirmAuBecsDebitSetup(
    clientSecret: string,
    data?: ConfirmAuBecsDebitSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmBacsDebitSetup` in the [Bacs Direct Debit Payments](https://stripe.com/docs/payments/payment-methods/bacs-debit) flow when the customer submits your payment form.
   * When called, it will confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/bacs-debit) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_bacs_debit_setup
   */
  confirmBacsDebitSetup(
    clientSecret: string,
    data?: ConfirmBacsDebitSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmBancontactSetup` in the [Set up future payments](https://stripe.com/docs/payments/bancontact/set-up-payment) flow to use Bancontact bank details to set up a SEPA Direct Debit payment method for future payments.
   * When called, it will confirm a `SetupIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/bancontact/set-up-payment) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_bancontact_setup
   */
  confirmBancontactSetup(
    clientSecret: string,
    data?: ConfirmBancontactSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmCardSetup` in the [Setup Intents API flow](https://stripe.com/docs/payments/save-and-reuse) when the customer submits your payment form.
   * When called, it will confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) with `data` you provide and carry out 3DS or other next actions if they are required.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_card_setup
   */
  confirmCardSetup(
    clientSecret: string,
    data?: ConfirmCardSetupData,
    options?: ConfirmCardSetupOptions
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmCashappSetup` in the [Setup Intents API flow](https://stripe.com/docs/payments/save-and-reuse) when the customer submits your payment form.
   * When called, it will confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) with `data` you provide.
   * Refer to our [integration guide](https://stripe.com/docs/payments/cash-app-pay) for more details..
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_cashapp_setup
   */
  confirmCashappSetup(
    clientSecret: string,
    data?: ConfirmCashappSetupData,
    options?: ConfirmCashappSetupOptions
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmIdealSetup` in the [Set up future payments](https://stripe.com/docs/payments/ideal/set-up-payment) flow to use iDEAL bank details to set up a SEPA Direct Debit payment method for future payments.
   * When called, it will confirm a `SetupIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/ideal/set-up-payment) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_ideal_setup
   */
  confirmIdealSetup(
    clientSecret: string,
    data?: ConfirmIdealSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmPayPalSetup` in the [Set up future payments](https://stripe.com/docs/payments/paypal/set-up-future-payments) flow when the customer submits your payment form.
   * When called, it will confirm a `SetupIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/paypal/set-up-future-payments) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_paypal_setup
   */
  confirmPayPalSetup(
    clientSecret: string,
    data?: ConfirmPayPalSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmSepaDebitSetup` in the [SEPA Direct Debit with Setup Intents](https://stripe.com/docs/payments/sepa-debit-setup-intents) flow when the customer submits your payment form.
   * When called, it will confirm the `SetupIntent` with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/sepa-debit-setup-intents) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_sepa_debit_setup
   */
  confirmSepaDebitSetup(
    clientSecret: string,
    data?: ConfirmSepaDebitSetupData
  ): Promise<SetupIntentResult>;

  /*
   * Use `stripe.confirmSofortSetup` in the [Set up future payments](https://stripe.com/docs/payments/sofort/set-up-payment) flow to use SOFORT bank details to set up a SEPA Direct Debit payment method for future payments.
   * When called, it will confirm a `SetupIntent` with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/sofort/set-up-payment) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   */
  confirmSofortSetup(
    clientSecret: string,
    data?: ConfirmSofortSetupData,
    options?: ConfirmSofortSetupOptions
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.confirmAffirmPayment` in the [Affirm payments](https://stripe.com/docs/payments/affirm) flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents).
   * Refer to our [integration guide](https://stripe.com/docs/payments/affirm/accept-a-payment) for more details.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_affirm_payment
   */

  confirmAffirmPayment(
    clientSecret: string,
    data?: ConfirmAffirmPaymentData,
    options?: ConfirmAffirmPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.confirmAfterpayClearpayPayment` in the [Afterpay / Clearpay payments](https://stripe.com/docs/payments/afterpay-clearpay) flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents).
   * Refer to our [integration guide](https://stripe.com/docs/payments/afterpay-clearpay/accept-a-payment) for more details.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_afterpay_clearpay_payment
   */

  confirmAfterpayClearpayPayment(
    clientSecret: string,
    data?: ConfirmAfterpayClearpayPaymentData,
    options?: ConfirmAfterpayClearpayPaymentOptions
  ): Promise<PaymentIntentResult>;

  /**
   * Use `stripe.verifyMicrodepositsForSetup` in the [Save details for future payments with pre-authorized debit in Canada](https://stripe.com/docs/payments/acss-debit/set-up-payment) flow
   * to verify customer's bank account with micro-deposits.
   *
   * @docs https://stripe.com/docs/js/payment_intents/verify_microdeposits_for_setup
   */
  verifyMicrodepositsForSetup(
    clientSecret: string,
    data?: VerifyMicrodepositsForSetupData
  ): Promise<SetupIntentResult>;

  /**
   * Use `stripe.collectBankAccountForSetup` in the [Save bank details](https://stripe.com/docs/payments/ach-debit/set-up-payment) flow for the [ACH Direct Debit](https://stripe.com/docs/payments/ach-debit)
   * payment method to collect the customer’s bank account in your payment form.
   *
   * @docs https://stripe.com/docs/js/setup_intents/collect_bank_account_for_setup
   */
  collectBankAccountForSetup(
    options: CollectBankAccountForSetupOptions
  ): Promise<SetupIntentResult>;

  /**
   * Retrieve a [SetupIntent](https://stripe.com/docs/api/setup_intents) using its client secret.
   *
   * @docs https://stripe.com/docs/js/setup_intents/retrieve_setup_intent
   */
  retrieveSetupIntent(clientSecret: string): Promise<SetupIntentResult>;

  /////////////////////////////
  /// Orders
  ///
  /// https://stripe.com/docs/js/orders
  /////////////////////////////

  /**
   * Use `stripe.processOrder` to submit and confirm payment for an [Order](https://stripe.com/docs/api/orders_v2) using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.processOrder` will attempt to complete any required actions, such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, `stripe.processOrder` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `stripe.processOrder` will only redirect if your user chooses a redirect-based method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs https://stripe.com/docs/js/orders/process_order
   */
  processOrder(options: {
    elements: StripeElements;
    confirmParams?: Partial<ProcessOrderParams>;
    redirect: 'if_required';
  }): Promise<ProcessOrderResult>;

  /**
   * Use `stripe.processOrder` to submit and confirm payment for an [Order](https://stripe.com/docs/api/orders_v2) using data collected by the [Payment Element](https://stripe.com/docs/js/element/payment_element).
   * When called, `stripe.processOrder` will attempt to complete any required actions, such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * @docs https://stripe.com/docs/js/orders/process_order
   */
  processOrder(options: {
    elements: StripeElements;
    confirmParams: ProcessOrderParams;
    redirect?: 'always';
  }): Promise<never | {error: StripeError}>;

  /**
   * Retrieve an [Order](https://stripe.com/docs/api/orders_v2) using its [client secret](https://stripe.com/docs/api/orders_v2/object#order_v2_object-client_secret).
   *
   * @docs https://stripe.com/docs/js/orders/retrieve_order
   */
  retrieveOrder(clientSecret: string): Promise<RetrieveOrderResult>;

  /////////////////////////////
  /// Payment Request
  ///
  /// https://stripe.com/docs/js/payment_request
  /////////////////////////////

  /**
   * Use `stripe.paymentRequest` to create a `PaymentRequest` object.
   * Creating a `PaymentRequest` requires that you configure it with an `options` object.
   *
   * In Safari, `stripe.paymentRequest` uses Apple Pay, and in other browsers it uses the [Payment Request API standard](https://www.w3.org/TR/payment-request/).
   */
  paymentRequest(options: PaymentRequestOptions): PaymentRequest;

  /////////////////////////////
  /// Token and Sources
  ///
  /// https://stripe.com/docs/js/tokens_sources
  /////////////////////////////

  /**
   * Use `stripe.createToken` to convert information collected by an `IbanElement` into a single-use [Token](https://stripe.com/docs/api#tokens) that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=ibanElement
   */
  createToken(
    tokenType: StripeIbanElement,
    data: CreateTokenIbanData
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createToken` to convert information collected by card elements into a single-use [Token](https://stripe.com/docs/api#tokens) that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
   */
  createToken(
    tokenType: StripeCardElement | StripeCardNumberElement,
    data?: CreateTokenCardData
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createToken` to convert personally identifiable information (PII) into a single-use [Token](https://stripe.com/docs/api#tokens) for account identity verification.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=pii
   */
  createToken(
    tokenType: 'pii',
    data: CreateTokenPiiData
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createToken` to convert bank account information into a single-use token that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=bank_account
   */
  createToken(
    tokenType: 'bank_account',
    data: CreateTokenBankAccountData
  ): Promise<TokenResult>;

  /**
     * Use `stripe.createToken` to tokenize the recollected CVC for a saved card.

     * First, render a `CardCvcElement` to collect the data.
     * Then pass the `CardCvcElement` to `stripe.createToken` to tokenize the collected data.
     *
     * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=cvc_update
     */
  createToken(
    tokenType: 'cvc_update',
    element: StripeCardCvcElement
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createToken` to create a single-use token that wraps a user’s legal entity information.
   * Use this when creating or updating a Connect account.
   * See the [account tokens documentation](https://stripe.com/docs/connect/account-tokens) to learn more.
   */
  createToken(
    tokenType: 'account',
    data: TokenCreateParams.Account
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createToken` to create a single-use token that represents the details for a person.
   * Use this when creating or updating persons associated with a Connect account.
   * See the [documentation](https://stripe.com/docs/connect/account-tokens) to learn more.
   */
  createToken(
    tokenType: 'person',
    data: TokenCreateParams.Person
  ): Promise<TokenResult>;

  /**
   * Use `stripe.createSource` to convert payment information collected by elements into a `Source` object that you safely pass to your server to use in an API call.
   * See the [Sources documentation](https://stripe.com/docs/sources) for more information about sources.
   */
  createSource(
    element: StripeElement,
    sourceData: CreateSourceData
  ): Promise<SourceResult>;

  /**
   * Use `stripe.createSource` to convert raw payment information into a `Source` object that you safely pass to your server to use in an API call.
   * See the [Sources documentation](https://stripe.com/docs/sources) for more information about sources.
   */
  createSource(sourceData: CreateSourceData): Promise<SourceResult>;

  /**
   * Retrieve a [Source](https://stripe.com/docs/api#sources) using its unique ID and client secret.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/retrieve_source
   */
  retrieveSource(source: RetrieveSourceParam): Promise<SourceResult>;

  /////////////////////////////
  /// Analytics
  ///
  /////////////////////////////

  /**
   * Use `stripe.registerAppInfo` to register a frontend open source library.
   */
  registerAppInfo(wrapperLibrary: WrapperLibrary): void;

  /////////////////////////////
  /// Identity
  ///
  /////////////////////////////

  /**
   * Use `stripe.verifyIdentity` to display an [Identity](https://stripe.com/docs/identity) modal that securely collects verification information.
   *
   * * @docs https://stripe.com/docs/js/identity/modal
   */
  verifyIdentity(clientSecret: string): Promise<VerificationSessionResult>;

  /////////////////////////////
  /// Financial Connections
  ///
  /////////////////////////////

  /**
   * Use `stripe.collectFinancialConnectionsAccounts` to display a [Financial Connections](https://stripe.com/docs/financial-connections) modal that lets you securely collect financial accounts.
   *
   * * @docs https://stripe.com/docs/js/financial_connections/collect_financial_connections_accounts
   */
  collectFinancialConnectionsAccounts(
    options: CollectFinancialConnectionsAccountsOptions
  ): Promise<FinancialConnectionsSessionResult>;

  /**
   * Use `stripe.collectBankAccountToken` to display a [Financial Connections](https://stripe.com/docs/financial-connections) modal that lets you securely collect a [Bank Account Token](https://stripe.com/docs/api/tokens/object).
   *
   * * @docs https://stripe.com/docs/js/financial_connections/collect_bank_account_token
   */
  collectBankAccountToken(
    options: CollectBankAccountTokenOptions
  ): Promise<CollectBankAccountTokenResult>;

  /**
   * Use `stripe.createEphemeralKeyNonce` to create an ephemeral key nonce that lets you securely create ephemeral keys
   *
   * * @docs https://stripe.com/docs/js/issuing/create_ephemeral_key_nonce
   */
  createEphemeralKeyNonce(
    options: EphemeralKeyNonceOptions
  ): Promise<EphemeralKeyNonceResult>;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   */
  initCustomCheckout(
    options: StripeCustomCheckoutOptions
  ): Promise<StripeCustomCheckout>;

  /**
   * Use `stripe.initEmbeddedCheckout` to initialize an embedded Checkout instance
   *
   * * @docs https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=embedded-checkout
   */
  initEmbeddedCheckout(
    options: StripeEmbeddedCheckoutOptions
  ): Promise<StripeEmbeddedCheckout>;
}

type PaymentIntentResult =
  | {paymentIntent: PaymentIntent; error?: undefined}
  | {paymentIntent?: undefined; error: StripeError};

type SetupIntentResult =
  | {setupIntent: SetupIntent; error?: undefined}
  | {setupIntent?: undefined; error: StripeError};

type PaymentIntentOrSetupIntentResult =
  | {
      paymentIntent: PaymentIntent;
      setupIntent?: undefined;
      error?: undefined;
    }
  | {paymentIntent?: undefined; setupIntent: SetupIntent; error?: undefined}
  | {paymentIntent?: undefined; setupIntent?: undefined; error: StripeError};

type ProcessOrderResult =
  | {paymentIntent: PaymentIntent; order: Order; error?: undefined}
  | {paymentIntent?: undefined; order: Order; error?: undefined}
  | {paymentIntent?: undefined; order?: undefined; error: StripeError};

type RetrieveOrderResult =
  | {order: Order; error?: undefined}
  | {order?: undefined; error: StripeError};

type PaymentMethodResult =
  | {paymentMethod: PaymentMethod; error?: undefined}
  | {paymentMethod?: undefined; error: StripeError};

type SourceResult =
  | {source: Source; error?: undefined}
  | {source?: undefined; error: StripeError};

type TokenResult =
  | {token: Token; error?: undefined}
  | {token?: undefined; error: StripeError};

type VerificationSessionResult =
  | {verificationSession: VerificationSession; error?: undefined}
  | {verificationSession?: undefined; error: StripeError};

type FinancialConnectionsSessionResult =
  | {
      financialConnectionsSession: FinancialConnectionsSession;
      error?: undefined;
    }
  | {financialConnectionsSession: undefined; error: StripeError};

type CollectBankAccountTokenResult =
  | {
      financialConnectionsSession: FinancialConnectionsSession;
      token: BankAccountToken;
      error?: undefined;
    }
  | {
      financialConnectionsSession: undefined;
      token: undefined;
      error: StripeError;
    };

type EphemeralKeyNonceResult =
  | {nonce: string; error?: undefined}
  | {nonce?: undefined; error: StripeError};

/* A Radar Session is a snapshot of the browser metadata and device details that helps Radar make more accurate predictions on your payments. 
  This metadata includes information like IP address, browser, screen or device information, and other device characteristics. 
  You can find more details about how Radar uses this data by reading about how Radar performs [advanced fraud detection](https://stripe.com/docs/disputes/prevention/advanced-fraud-detection).
  */
type RadarSessionPayload =
  | {radarSession: Record<any, any>; error?: undefined}
  | {radarSession?: undefined; error: StripeError};

interface WrapperLibrary {
  /**
   * Your library’s name, maximum length is 30
   */
  name: string;

  /**
   * Required for Stripe Verified Partners, optional otherwise
   * Your Partner ID from the Partners section of the Dashboard
   */
  partner_id?: string;

  /**
   * Your library's version, in the format of x.x.x
   */
  version?: string;

  /**
   * The URL for your library's website with your contact details
   */
  url?: string;
}

/**
 * Use `Stripe(publishableKey, options?)` to create an instance of the `Stripe` object.
 * The Stripe object is your entrypoint to the rest of the Stripe.js SDK.
 *
 * Your Stripe publishable [API key](https://stripe.com/docs/keys) is required when calling this function, as it identifies your website to Stripe.
 *
 * When you’re ready to accept live payments, replace the test key with your live key in production.
 * Learn more about how API keys work in [test mode and live mode](https://stripe.com/docs/dashboard#viewing-test-data).
 */
interface StripeConstructor {
  (
    /**
     * Your publishable key.
     */
    publishableKey: string,

    /**
     * Initialization options.
     */
    options?: StripeConstructorOptions
  ): Stripe;
}

interface StripeConstructorOptions {
  /**
   * For usage with [Connect](https://stripe.com/docs/connect) only.
   * Specifying a connected account ID (e.g., `acct_24BFMpJ1svR5A89k`) allows you to perform actions on behalf of that account.
   */
  stripeAccount?: string;

  /**
   * Override your account's [API version](https://stripe.com/docs/api/versioning).
   */
  apiVersion?: string;

  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) used to globally configure localization in Stripe.js.
   * Setting the locale here will localize error strings for all Stripe.js methods.
   * It will also configure the locale for [Elements](#element_mount) and [Checkout](https://stripe.com/docs/js/checkout/redirect_to_checkout). Default is `auto` (Stripe detects the locale of the browser).
   *
   * Supported values depend on which features you are using.
   * Checkout supports a slightly different set of locales than the rest of Stripe.js.
   * If you are planning on using Checkout, make sure to use a [value](#checkout_redirect_to_checkout-options-locale) that it supports.
   */
  locale?: StripeElementLocale | CheckoutLocale;

  /**
   * Opt-in to prerelease Stripe.js features by passing `betas` when instantiating a `Stripe` object.
   *
   * Supported values for the `betas` option can be found in integration guides for prerelease features.
   * Most users of Stripe.js do not pass this option.
   */
  betas?: string[];
}

type StripeErrorType =
  /**
   * Failure to connect to Stripe's API.
   */
  | 'api_connection_error'

  /**
   * API errors cover any other type of problem (e.g., a temporary problem with Stripe's servers), and are extremely uncommon.
   */
  | 'api_error'

  /**
   * Failure to properly authenticate yourself in the request.
   */
  | 'authentication_error'

  /**
   * Card errors are the most common type of error you should expect to handle.
   * They result when the user enters a card that can't be charged for some reason.
   */
  | 'card_error'

  /**
   * Idempotency errors occur when an `Idempotency-Key` is re-used on a request that does not match the first request's API endpoint and parameters.
   */
  | 'idempotency_error'

  /**
   * Invalid request errors arise when your request has invalid parameters.
   */
  | 'invalid_request_error'

  /**
   * Too many requests hit the API too quickly.
   */
  | 'rate_limit_error'

  /**
   * Errors triggered by our client-side libraries when failing to validate fields (e.g., when a card number or expiration date is invalid or incomplete).
   */
  | 'validation_error';

interface StripeError {
  /**
   * The type of error.
   */
  type: StripeErrorType;

  /**
   * For card errors, the ID of the failed charge
   */
  charge?: string;

  /**
   * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
   */
  code?: string;

  /**
   * For card errors resulting from a card issuer decline, a short string indicating the [card issuer’s reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
   */
  decline_code?: string;

  /**
   * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
   */
  doc_url?: string;

  /**
   * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
   */
  message?: string;

  /**
   * If the error is parameter-specific, the parameter related to the error.
   * For example, you can use this to display a message near the correct form field.
   */
  param?: string;

  /**
   * The `PaymentIntent` object for errors returned on a request involving a `PaymentIntent`.
   */
  payment_intent?: PaymentIntent;

  /**
   * The `PaymentMethod` object for errors returned on a request involving a `PaymentMethod`.
   */
  payment_method?: PaymentMethod;

  /**
   * The `SetupIntent` object for errors returned on a request involving a `SetupIntent`.
   */
  setup_intent?: SetupIntent;

  /**
   * The `Source` object for errors returned on a request involving a `Source`.
   */
  source?: Source;
}

type StripeAddressElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeAddressElementChangeEvent) => any
  ): StripeAddressElement;
  once(
    eventType: 'change',
    handler: (event: StripeAddressElementChangeEvent) => any
  ): StripeAddressElement;
  off(
    eventType: 'change',
    handler?: (event: StripeAddressElementChangeEvent) => any
  ): StripeAddressElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {elementType: 'address'; error: StripeError}) => any
  ): StripeAddressElement;
  once(
    eventType: 'loaderror',
    handler: (event: {elementType: 'address'; error: StripeError}) => any
  ): StripeAddressElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {elementType: 'address'; error: StripeError}) => any
  ): StripeAddressElement;

  /**
   * Triggered when the loader UI is mounted to the DOM and ready to be displayed.
   */
  on(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  once(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;
  off(
    eventType: 'loaderstart',
    handler?: (event: {elementType: 'address'}) => any
  ): StripeAddressElement;

  /**
   * Updates the options the `AddressElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<StripeAddressElementOptions>): StripeAddressElement;

  /**
   * Validates and retrieves form values from the `AddressElement`.
   */
  getValue(): Promise<
    Pick<StripeAddressElementChangeEvent, 'complete' | 'isNewAddress' | 'value'>
  >;
};

interface ContactOption {
  name: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

type AddressMode = 'shipping' | 'billing';

interface StripeAddressElementOptions {
  /**
   * Control which mode the AddressElement will be used for.
   */
  mode: AddressMode;

  /**
   * An array of two-letter ISO country codes representing which countries
   * are displayed in the AddressElement.
   */
  allowedCountries?: string[] | null;

  /**
   * Control autocomplete settings in the AddressElement.
   */
  autocomplete?:
    | {mode: 'automatic'}
    | {mode: 'disabled'}
    | {mode: 'google_maps_api'; apiKey: string};

  /**
   * Whether or not AddressElement accepts PO boxes
   */
  blockPoBox?: boolean;

  /**
   * An array of saved addresses.
   */
  contacts?: ContactOption[];

  /**
   * Default value for AddressElement fields
   */
  defaultValues?: {
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country: string;
    };
    phone?: string | null;
  };

  /**
   * Control which additional fields to display in the AddressElement.
   */
  fields?: {
    phone?: 'always' | 'never' | 'auto';
  };

  /**
   * Specify validation rules for the above additional fields.
   */
  validation?: {
    phone?: {
      required: 'always' | 'never' | 'auto';
    };
  };

  /**
   * Specify display options in the AddressElement
   */
  display?: {
    name?: 'full' | 'split' | 'organization';
  };
}

interface StripeAddressElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'address';

  /**
   * The mode of the AddressElement that emitted this event.
   */
  elementMode: AddressMode;

  /**
   * Whether or not the AddressElement is currently empty.
   */
  empty: boolean;

  /**
   * Whether or not the AddressElement is complete.
   */
  complete: boolean;

  /**
   * Whether or not the address is new.
   */
  isNewAddress: boolean;

  /**
   * An object containing the current address.
   */
  value: {
    name: string;
    firstName?: string;
    lastName?: string;
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    phone?: string;
  };
}

type StripePaymentMethodMessagingElement = {
  /**
   * The `element.mount` method attaches your [Element](https://stripe.com/docs/js/element) to the DOM.
   * `element.mount` accepts either a CSS Selector (e.g., `'#payment-method-messaging'`) or a DOM element.
   */
  mount(domElement: string | HTMLElement): void;

  /**
   * Removes the element from the DOM and destroys it.
   * A destroyed element can not be re-activated or re-mounted to the DOM.
   */
  destroy(): void;

  /**
   * Unmounts the element from the DOM.
   * Call `element.mount` to re-attach it to the DOM.
   */
  unmount(): void;

  /**
   * Updates the options the `PaymentMethodMessagingElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<StripePaymentMethodMessagingElementOptions>): void;

  /**
   * Triggered when the element is fully loaded and ready to perform method calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'paymentMethodMessaging'}) => any
  ): StripePaymentMethodMessagingElement;
};

interface StripePaymentMethodMessagingElementOptions {
  /**
   * The total amount in the smallest currency unit.
   */
  amount: number;

  /**
   * The currency to display.
   */
  currency:
    | 'USD'
    | 'GBP'
    | 'EUR'
    | 'DKK'
    | 'NOK'
    | 'SEK'
    | 'AUD'
    | 'CAD'
    | 'NZD';

  /**
   * Payment methods to show messaging for.
   */
  paymentMethodTypes: Array<'afterpay_clearpay' | 'klarna' | 'affirm'>;

  /**
   * @deprecated Use `paymentMethodTypes` instead.
   */
  paymentMethods?: Array<'afterpay_clearpay' | 'klarna' | 'affirm'>;

  /**
   * The country the end-buyer is in.
   */
  countryCode:
    | 'US'
    | 'CA'
    | 'AU'
    | 'NZ'
    | 'GB'
    | 'IE'
    | 'FR'
    | 'ES'
    | 'DE'
    | 'AT'
    | 'BE'
    | 'DK'
    | 'FI'
    | 'IT'
    | 'NL'
    | 'NO'
    | 'SE';

  /**
   * The logo color to display in the message. Defaults to black
   */
  logoColor?: 'black' | 'white' | 'color';

  /**
   * The font size of the promotional message.
   */
  metaData?: {
    messagingClientReferenceId: string | null;
  };
}

type StripeAffirmMessageElement = {
  /**
   * The `element.mount` method attaches your [Element](https://stripe.com/docs/js/element) to the DOM.
   * `element.mount` accepts either a CSS Selector (e.g., `'#affirm-message'`) or a DOM element.
   */
  mount(domElement: string | HTMLElement): void;

  /**
   * Removes the element from the DOM and destroys it.
   * A destroyed element can not be re-activated or re-mounted to the DOM.
   */
  destroy(): void;

  /**
   * Unmounts the element from the DOM.
   * Call `element.mount` to re-attach it to the DOM.
   */
  unmount(): void;

  /**
   * Updates the options the `AffirmMessageElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<StripeAffirmMessageElementOptions>): void;

  /**
   * Triggered when the element is fully loaded and ready to perform method calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'affirmMessage'}) => any
  ): StripeAffirmMessageElement;
};

interface StripeAffirmMessageElementOptions {
  /**
   * The total amount in the smallest currency unit.
   */
  amount: number;

  /**
   * The currency to display.
   */
  currency: 'USD';

  /**
   * The affirm logo color.
   */
  logoColor?: 'primary' | 'black' | 'white';

  /**
   * The font color of the promotional message.
   */
  fontColor?: string;

  /**
   * The font size of the promotional message.
   */
  fontSize?: string;

  /**
   * The text alignment of the promotional message.
   */
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
}

type StripeAfterpayClearpayMessageElement = {
  /**
   * The `element.mount` method attaches your [Element](https://stripe.com/docs/js/element) to the DOM.
   * `element.mount` accepts either a CSS Selector (e.g., `'#afterpay-clearpay-message'`) or a DOM element.
   */
  mount(domElement: string | HTMLElement): void;

  /**
   * Removes the element from the DOM and destroys it.
   * A destroyed element can not be re-activated or re-mounted to the DOM.
   */
  destroy(): void;

  /**
   * Unmounts the element from the DOM.
   * Call `element.mount` to re-attach it to the DOM.
   */
  unmount(): void;

  /**
   * Updates the options the `AfterpayClearpayMessageElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<StripeAfterpayClearpayMessageElementOptions>): void;

  /**
   * Triggered when the element is fully loaded and ready to perform method calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'afterpayClearpayMessage'}) => any
  ): StripeAfterpayClearpayMessageElement;
};

interface StripeAfterpayClearpayMessageElementOptions {
  /**
   * The total amount, divided into 4 installments, in the smallest currency unit.
   */
  amount: number;

  /**
   * The currency to display.
   */
  currency: 'USD' | 'AUD' | 'CAD' | 'GBP' | 'NZD' | 'EUR';

  /**
   * The badge color theme, applied when `logoType` is set to badge.
   */
  badgeTheme?:
    | 'black-on-mint'
    | 'black-on-white'
    | 'mint-on-black'
    | 'white-on-black';

  /**
   * The leading text for the mesage.
   */
  introText?: 'In' | 'in' | 'Or' | 'or' | 'Pay' | 'pay' | 'Pay in' | 'pay in';

  /**
   * Indicates whether an item is eligible for purchase with Afterpay Clearpay.
   */
  isEligible?: boolean;

  /**
   * Indicates whether an entire cart is eligible for purchase with Afterpay Clearpay.
   */
  isCartEligible?: boolean;

  /**
   * The lockup color theme, applied when `logoType` is set to lockup.
   */
  lockupTheme?: 'black' | 'white' | 'mint';

  /**
   * The logo style to display.
   */
  logoType?: 'badge' | 'lockup';

  /**
   * The maximum `amount` allowed for a purchase. This should match the limit defined in your Stripe dashboard.
   */
  max?: number;

  /**
   * The minimum `amount` allowed for a purchase. This should match the limit defined in your Stripe dashboard.
   */
  min?: number;

  /**
   * The style of modal link to display.
   */
  modalLinkStyle?: 'circled-info-icon' | 'learn-more-text' | 'more-info-text';

  /**
   * The background color for the info modal.
   */
  modalTheme?: 'mint' | 'white';

  /**
   * Determines whether 'interest-free' is displayed in the message.
   */
  showInterestFree?: boolean;

  /**
   * Determines whether 'with' is displayed before the logo.
   */
  showLowerLimit?: boolean;

  /**
   * Determines whether the lower limit is displayed when `amount` exceeds price limits.
   */
  showUpperLimit?: boolean;

  /**
   * Determines whether the upper limit is displayed when `amount` exceeds price limits.
   */
  showWith?: boolean;
}

type StripeAuBankAccountElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeAuBankAccountElementChangeEvent) => any
  ): StripeAuBankAccountElement;
  once(
    eventType: 'change',
    handler: (event: StripeAuBankAccountElementChangeEvent) => any
  ): StripeAuBankAccountElement;
  off(
    eventType: 'change',
    handler?: (event: StripeAuBankAccountElementChangeEvent) => any
  ): StripeAuBankAccountElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'auBankAccount'}) => any
  ): StripeAuBankAccountElement;

  /**
   * Updates the options the `AuBankAccountElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `AuBankAccountElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeAuBankAccountElementOptions>): void;
};

interface StripeAuBankAccountElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeAuBankAccountElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'auBankAccount';

  /**
   * The bank name corresponding to the entered BSB.
   */
  bankName?: string;

  /**
   * The branch name corresponding to the entered BSB.
   */
  branchName?: string;
}

type StripeCardCvcElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeCardCvcElementChangeEvent) => any
  ): StripeCardCvcElement;
  once(
    eventType: 'change',
    handler: (event: StripeCardCvcElementChangeEvent) => any
  ): StripeCardCvcElement;
  off(
    eventType: 'change',
    handler?: (event: StripeCardCvcElementChangeEvent) => any
  ): StripeCardCvcElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'cardCvc'}) => any
  ): StripeCardCvcElement;

  /**
   * Updates the options the `CardCvcElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `CardCvcElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeCardCvcElementOptions>): void;
};

interface StripeCardCvcElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  placeholder?: string;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeCardCvcElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'cardCvc';
}

type StripeCardExpiryElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeCardExpiryElementChangeEvent) => any
  ): StripeCardExpiryElement;
  once(
    eventType: 'change',
    handler: (event: StripeCardExpiryElementChangeEvent) => any
  ): StripeCardExpiryElement;
  off(
    eventType: 'change',
    handler?: (event: StripeCardExpiryElementChangeEvent) => any
  ): StripeCardExpiryElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'cardExpiry'}) => any
  ): StripeCardExpiryElement;

  /**
   * Updates the options the `CardExpiryElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `CardExpiryElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeCardExpiryElementOptions>): void;
};

interface StripeCardExpiryElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  placeholder?: string;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeCardExpiryElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'cardExpiry';
}

type StripeCardNumberElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeCardNumberElementChangeEvent) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'change',
    handler: (event: StripeCardNumberElementChangeEvent) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'change',
    handler?: (event: StripeCardNumberElementChangeEvent) => any
  ): StripeCardNumberElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;

  /**
   * Triggered when there is a change to the available networks the provided card can run on.
   */
  on(
    eventType: 'networkschange',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  once(
    eventType: 'networkschange',
    handler: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;
  off(
    eventType: 'networkschange',
    handler?: (event: {elementType: 'cardNumber'}) => any
  ): StripeCardNumberElement;

  /**
   * Updates the options the `CardNumberElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `Element` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeCardNumberElementUpdateOptions>): void;
};

interface StripeCardNumberElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  placeholder?: string;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is `false`.
   */
  disabled?: boolean;

  /**
   * Show a card brand icon in the Element.
   * Default is `false`.
   */
  showIcon?: boolean;

  /**
   * Appearance of the brand icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * Hides and disables the Link Button in the Card Element.
   * Default is `false`.
   */
  disableLink?: boolean;

  /**
   * Specifies a network preference for Card Brand Choice. The first network in the array which is a valid
   * network on the entered card will be selected as the default in the Card Brand Choice dropdown upon
   * entry of a co-branded card.
   *
   * Default is an empty array, meaning no default selection will be made in the Card Brand choice dropdown.
   */
  preferredNetwork?: Array<CardNetworkBrand>;
}

interface StripeCardNumberElementUpdateOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  placeholder?: string;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is `false`.
   */
  disabled?: boolean;

  /**
   * Show a card brand icon in the Element.
   * Default is `false`.
   */
  showIcon?: boolean;

  /**
   * Appearance of the brand icon in the Element.
   */
  iconStyle?: 'default' | 'solid';
}

interface StripeCardNumberElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'cardNumber';

  /*
   * The card brand of the card number being entered.
   */
  brand:
    | 'visa'
    | 'mastercard'
    | 'amex'
    | 'discover'
    | 'diners'
    | 'jcb'
    | 'unionpay'
    | 'unknown';
}

type StripeCardElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeCardElementChangeEvent) => any
  ): StripeCardElement;
  once(
    eventType: 'change',
    handler: (event: StripeCardElementChangeEvent) => any
  ): StripeCardElement;
  off(
    eventType: 'change',
    handler?: (event: StripeCardElementChangeEvent) => any
  ): StripeCardElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'card'}) => any
  ): StripeCardElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'card'}) => any
  ): StripeCardElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'card'}) => any
  ): StripeCardElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'card'}) => any
  ): StripeCardElement;

  /**
   * Triggered when there is a change to the available networks the provided card can run on.
   */
  on(
    eventType: 'networkschange',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  once(
    eventType: 'networkschange',
    handler: (event: {elementType: 'card'}) => any
  ): StripeCardElement;
  off(
    eventType: 'networkschange',
    handler?: (event: {elementType: 'card'}) => any
  ): StripeCardElement;

  /**
   * Updates the options the `CardElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `CardElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: StripeCardElementUpdateOptions): void;
};

interface StripeCardElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * A pre-filled set of values to include in the input (e.g., `{postalCode: '94110'}`).
   * Note that sensitive card information (card number, CVC, and expiration date) cannot be pre-filled.
   */
  value?: {postalCode?: string};

  /**
   * Hide the postal code field.
   * Default is `false`.
   * If you are already collecting a full billing address or postal code elsewhere, set this to `true`.
   */
  hidePostalCode?: boolean;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is `false`.
   */
  disabled?: boolean;

  /**
   * Hides and disables the Link Button in the Card Element.
   * Default is `false`.
   */
  disableLink?: boolean;

  /**
   * Specifies a network preference for Card Brand Choice. The first network in the array which is a valid
   * network on the entered card will be selected as the default in the Card Brand Choice dropdown upon
   * entry of a co-branded card.
   *
   * Default is an empty array, meaning no default selection will be made in the Card Brand choice dropdown.
   */
  preferredNetwork?: Array<CardNetworkBrand>;
}

interface StripeCardElementUpdateOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * A pre-filled set of values to include in the input (e.g., `{postalCode: '94110'}`).
   * Note that sensitive card information (card number, CVC, and expiration date) cannot be pre-filled.
   */
  value?: {postalCode?: string};

  /**
   * Hide the postal code field.
   * Default is `false`.
   * If you are already collecting a full billing address or postal code elsewhere, set this to `true`.
   */
  hidePostalCode?: boolean;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is `false`.
   */
  disabled?: boolean;
}

interface StripeCardElementChangeEvent extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'card';

  /**
   * An object containing the currently entered `postalCode`.
   */
  value: {postalCode: string};

  /*
   * The card brand of the card number being entered.
   */
  brand:
    | 'visa'
    | 'mastercard'
    | 'amex'
    | 'discover'
    | 'diners'
    | 'jcb'
    | 'unionpay'
    | 'unknown';
}

type StripeCartElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  once(
    eventType: 'change',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  off(
    eventType: 'change',
    handler?: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  once(
    eventType: 'ready',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  off(
    eventType: 'ready',
    handler?: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {elementType: 'cart'; error: StripeError}) => any
  ): StripeCartElement;
  once(
    eventType: 'loaderror',
    handler: (event: {elementType: 'cart'; error: StripeError}) => any
  ): StripeCartElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {elementType: 'cart'; error: StripeError}) => any
  ): StripeCartElement;

  /**
   * Triggered when the 'checkout' button in the element is clicked
   */
  on(
    eventType: 'checkout',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  once(
    eventType: 'checkout',
    handler: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;
  off(
    eventType: 'checkout',
    handler?: (event: StripeCartElementPayloadEvent) => any
  ): StripeCartElement;

  /**
   * Triggered when a line item in the element is clicked
   */
  on(
    eventType: 'lineitemclick',
    handler: (event: StripeCartElementLineItemClickEvent) => any
  ): StripeCartElement;
  once(
    eventType: 'lineitemclick',
    handler: (event: StripeCartElementLineItemClickEvent) => any
  ): StripeCartElement;
  off(
    eventType: 'lineitemclick',
    handler?: (event: StripeCartElementLineItemClickEvent) => any
  ): StripeCartElement;

  /**
   * Updates the options the `CartElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: StripeCartElementUpdateOptions): StripeCartElement;

  /**
   * Makes the Cart Element visible
   */
  show(): StripeCartElement;

  /**
   * Makes the Cart Element not visible
   */
  hide(): StripeCartElement;

  /**
   * Cancels the "Check Out" button loader and displays an error message regarding why going to checkout failed
   */
  cancelCheckout(errorMessage?: string | null): StripeCartElement;

  /**
   * Adds a line item to the CartSession
   */
  addLineItem(
    lineItemData:
      | {
          product: string;
          price?: null;
          item_details?: null;
          quantity?: number | null;
        }
      | {
          product?: null;
          price: string;
          item_details?: null;
          quantity?: number | null;
        }
      | {
          price?: null;
          product?: null;
          item_details: CartItemDetails;
          quantity?: number | null;
        }
  ): Promise<{error?: StripeError}>;
};

type CartItemDetails = {
  external_id: string;
  name: string;
  description?: string;
  image?: string;
  unit_amount: number;
};

type CartDescriptor = 'cart' | 'bag' | 'basket';

type CartShowOnAdd = 'never' | 'auto';

interface StripeCartElementOptions {
  /**
   * Identifies the CartSession the Element will display and modify.
   */
  clientSecret: string;

  /**
   * Override the verbiage used within the Element to refer to itself.
   * By default the Cart Element will use the term 'cart'.
   */
  descriptor?: CartDescriptor | null;

  /**
   * Override the text used in the title of the Element.
   * By default the Cart Element will use the title 'Your [descriptor]'.
   */
  header?: {
    text?: string | null;
  };

  /**
   * Control whether the Element automatically appears when items are added to the cart.
   * By default, the Cart Element will use 'auto'.
   */
  showOnAdd?: CartShowOnAdd | null;
}

/*
 * Updatable options for an `Elements` instance
 */
interface StripeCartElementUpdateOptions {
  /**
   * Override the text used in the title of the Element.
   * By default the Cart Element will use the title 'Your [descriptor]'.
   */
  header?: {
    text?: string | null;
  };

  /**
   * Control whether the Element automatically appears when items are added to the cart.
   * By default, the Cart Element will use 'auto'.
   */
  showOnAdd?: CartShowOnAdd | null;
}

interface StripeCartElementPayloadEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'cart';

  /**
   * The ID of the CartSession associated with the Element.
   */
  id: string;

  /**
   * The number of line items currently in the cart.
   */
  lineItems: {
    count: number;
  };
}

interface StripeCartElementLineItemClickEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'cart';

  /**
   * The ID of the CartSession associated with the Element.
   */
  preventDefault: () => void;

  /**
   * The type of element that emitted this event.
   */
  url: string;
}

type StripeEpsBankElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeEpsBankElementChangeEvent) => any
  ): StripeEpsBankElement;
  once(
    eventType: 'change',
    handler: (event: StripeEpsBankElementChangeEvent) => any
  ): StripeEpsBankElement;
  off(
    eventType: 'change',
    handler: (event: StripeEpsBankElementChangeEvent) => any
  ): StripeEpsBankElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  off(
    eventType: 'ready',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  off(
    eventType: 'focus',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  off(
    eventType: 'blur',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;
  off(
    eventType: 'escape',
    handler: (event: {elementType: 'epsBank'}) => any
  ): StripeEpsBankElement;

  /**
   * Updates the options the `EpsBankElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `EpsBankElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeEpsBankElementOptions>): void;
};

interface StripeEpsBankElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [EPS guide](https://stripe.com/docs/payments/eps/accept-a-payment#bank-values) (e.g., `bank_austria`).
   */
  value?: string;

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeEpsBankElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'epsBank';

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [EPS guide](https://stripe.com/docs/payments/eps/accept-a-payment#bank-values) (e.g., `bank_austria`).
   */
  value?: string;
}

type StripeExpressCheckoutElement = StripeElementBase & {
  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'ready',
    handler?: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when a button on the element is clicked.
   */
  on(
    eventType: 'click',
    handler: (event: StripeExpressCheckoutElementClickEvent) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'click',
    handler: (event: StripeExpressCheckoutElementClickEvent) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'click',
    handler?: (event: StripeExpressCheckoutElementClickEvent) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when a buyer authorizes a payment within a supported payment method.
   */
  on(
    eventType: 'confirm',
    handler: (event: StripeExpressCheckoutElementConfirmEvent) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'confirm',
    handler: (event: StripeExpressCheckoutElementConfirmEvent) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'confirm',
    handler?: (event: StripeExpressCheckoutElementConfirmEvent) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when a payment interface is dismissed (e.g., a buyer closes the payment interface)
   */
  on(
    eventType: 'cancel',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'cancel',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'cancel',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when a buyer selects a different shipping address.
   */
  on(
    eventType: 'shippingaddresschange',
    handler: (
      event: StripeExpressCheckoutElementShippingAddressChangeEvent
    ) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'shippingaddresschange',
    handler: (
      event: StripeExpressCheckoutElementShippingAddressChangeEvent
    ) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'shippingaddresschange',
    handler?: (
      event: StripeExpressCheckoutElementShippingAddressChangeEvent
    ) => any
  ): StripeExpressCheckoutElement;

  /**
   * Triggered when a buyer selects a different shipping rate.
   */
  on(
    eventType: 'shippingratechange',
    handler: (event: StripeExpressCheckoutElementShippingRateChangeEvent) => any
  ): StripeExpressCheckoutElement;
  once(
    eventType: 'shippingratechange',
    handler: (event: StripeExpressCheckoutElementShippingRateChangeEvent) => any
  ): StripeExpressCheckoutElement;
  off(
    eventType: 'shippingratechange',
    handler?: (
      event: StripeExpressCheckoutElementShippingRateChangeEvent
    ) => any
  ): StripeExpressCheckoutElement;

  /**
   * Updates the options the `ExpressCheckoutElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(
    options: StripeExpressCheckoutElementUpdateOptions
  ): StripeExpressCheckoutElement;
};

type ExpressPaymentType = 'google_pay' | 'apple_pay' | 'link' | 'paypal';

type ExpressCheckoutPartialAddress = {
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

type ExpressCheckoutAddress = ExpressCheckoutPartialAddress & {
  line1: string;
  line2: string | null;
};

type BillingDetails = {
  name: string;
  email?: string;
  phone?: string;
  address: ExpressCheckoutAddress;
};

type ShippingAddress = {
  name: string;
  address: ExpressCheckoutAddress;
};

type LineItem = {
  name: string;
  amount: number;
};

type DeliveryUnit = 'hour' | 'day' | 'business_day' | 'week' | 'month';

type DeliveryEstimate = {
  unit: DeliveryUnit;
  value: number;
};

type ShippingRate = {
  id: string;
  amount: number;
  displayName: string;
  deliveryEstimate?:
    | string
    | {
        maximum?: DeliveryEstimate;
        minimum?: DeliveryEstimate;
      };
};

type LayoutOption = {
  maxColumns?: number;
  maxRows?: number;
  overflow?: 'auto' | 'never';
};

type ExpressCheckoutWalletOption = 'always' | 'auto' | 'never';

type ExpressCheckoutWalletsOption = {
  applePay?: ExpressCheckoutWalletOption;
  googlePay?: ExpressCheckoutWalletOption;
};

type ApplePayButtonTheme = 'black' | 'white' | 'white-outline';

type GooglePayButtonTheme = 'black' | 'white';

type ButtonThemeOption = {
  applePay?: ApplePayButtonTheme;
  googlePay?: GooglePayButtonTheme;
};

type ApplePayButtonType =
  | 'add-money'
  | 'book'
  | 'buy'
  | 'check-out'
  | 'contribute'
  | 'donate'
  | 'order'
  | 'plain'
  | 'reload'
  | 'rent'
  | 'subscribe'
  | 'support'
  | 'tip'
  | 'top-up';

type GooglePayButtonType =
  | 'book'
  | 'buy'
  | 'checkout'
  | 'donate'
  | 'order'
  | 'pay'
  | 'plain'
  | 'subscribe';

type ButtonTypeOption = {
  applePay?: ApplePayButtonType;
  googlePay?: GooglePayButtonType;
};

interface StripeExpressCheckoutElementOptions {
  /**
   * Manually sets the height of the buttons shown.
   */
  buttonHeight?: number;

  /**
   * Controls the color of each button.
   */
  buttonTheme?: ButtonThemeOption;

  /**
   * Specifies the type of each button.
   */
  buttonType?: ButtonTypeOption;

  /**
   * Specifies how buttons should be laid out in relation to each other.
   */
  layout?: LayoutOption;

  /**
   * Override the order in which payment methods are displayed in the Express Checkout Element.
   * By default, the Express Checkout Element will use a dynamic ordering that optimizes payment method display for each user.
   */
  paymentMethodOrder?: string[];

  /**
   * Control wallets display in the Express Checkout Element.
   */
  wallets?: ExpressCheckoutWalletsOption;
}

/*
 * Updatable options for an `Elements` instance
 */
interface StripeExpressCheckoutElementUpdateOptions {
  /**
   * Manually sets the height of the buttons shown.
   */
  buttonHeight?: number;

  /**
   * Specifies how buttons should be laid out in relation to each other.
   */
  layout?: LayoutOption;

  /**
   * Override the order in which payment methods are displayed in the Pay Button Element.
   * By default, the Express Checkout Element will use a dynamic ordering that optimizes payment method display for each user.
   */
  paymentMethodOrder?: string[];
}

type AvailablePaymentMethods = {
  applePay: boolean;
  googlePay: boolean;
};

interface StripeExpressCheckoutElementReadyEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'expressCheckout';

  /**
   * The list of payment methods that could possibly show in the element, or undefined if no payment methods can show.
   */
  availablePaymentMethods: undefined | AvailablePaymentMethods;
}

type ClickResolveDetails = {
  /**
   * An array of two-letter ISO country codes representing which countries
   * are eligible shipping locations.
   */
  allowedShippingCountries?: string[];

  billingAddressRequired?: boolean;

  /**
   * Provide information about your business that will be displayed in the payment interface.
   * This information will be retrieved from your Stripe account if not provided.
   */
  business?: {name: string};

  emailRequired?: boolean;

  lineItems?: Array<LineItem>;

  phoneNumberRequired?: boolean;

  shippingAddressRequired?: boolean;

  shippingRates?: Array<ShippingRate>;

  applePay?: ApplePayOption;
};

interface StripeExpressCheckoutElementClickEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'expressCheckout';

  /**
   * The payment method associated with the button that was clicked.
   */
  expressPaymentType: ExpressPaymentType;

  /**
   * Callback to configure the details shown on a payment interface, including which fields to collect.
   * This must be called within 1 second of the 'click' event being emitted.
   */
  resolve: (resolveDetails?: ClickResolveDetails) => void;
}

interface StripeExpressCheckoutElementConfirmEvent {
  /**
   * Callback when a payment is unsuccessful. Optionally, specifying a reason will show a more detailed error in the payment interface.
   */
  paymentFailed: (payload?: {
    reason?: 'fail' | 'invalid_shipping_address';
  }) => void;

  billingDetails?: BillingDetails;

  shippingAddress?: ShippingAddress;

  shippingRate?: ShippingRate;

  expressPaymentType: ExpressPaymentType;
}

type ChangeResolveDetails = {
  lineItems?: Array<LineItem>;
  shippingRates?: Array<ShippingRate>;
  applePay?: ApplePayUpdateOption;
};

interface StripeExpressCheckoutElementShippingAddressChangeEvent {
  name: string;
  address: ExpressCheckoutPartialAddress;
  resolve: (resolveDetails?: ChangeResolveDetails) => void;
  reject: () => void;
}

interface StripeExpressCheckoutElementShippingRateChangeEvent {
  shippingRate: ShippingRate;
  resolve: (resolveDetails?: ChangeResolveDetails) => void;
  reject: () => void;
}

type StripeFpxBankElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeFpxBankElementChangeEvent) => any
  ): StripeFpxBankElement;
  once(
    eventType: 'change',
    handler: (event: StripeFpxBankElementChangeEvent) => any
  ): StripeFpxBankElement;
  off(
    eventType: 'change',
    handler?: (event: StripeFpxBankElementChangeEvent) => any
  ): StripeFpxBankElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'fpxBank'}) => any
  ): StripeFpxBankElement;

  /**
   * Updates the options the `FpxBankElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `FpxBankElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeFpxBankElementOptions>): void;
};

interface StripeFpxBankElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [FPX guide](https://stripe.com/docs/payments/fpx#bank-reference) (e.g., `affin_bank`).
   */
  value?: string;

  /**
   * The type of the FPX accountholder.
   */
  accountHolderType: 'individual' | 'company';

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeFpxBankElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'fpxBank';

  /**
   * The selected bank.
   * Can be one of the banks listed in the [FPX guide](https://stripe.com/docs/payments/fpx#bank-reference).
   */
  value: string;
}

type StripeIbanElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeIbanElementChangeEvent) => any
  ): StripeIbanElement;
  once(
    eventType: 'change',
    handler: (event: StripeIbanElementChangeEvent) => any
  ): StripeIbanElement;
  off(
    eventType: 'change',
    handler?: (event: StripeIbanElementChangeEvent) => any
  ): StripeIbanElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'iban'}) => any
  ): StripeIbanElement;

  /**
   * Updates the options the `IbanElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IbanElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIbanElementOptions>): void;
};

interface StripeIbanElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  supportedCountries?: string[];

  placeholderCountry?: string;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeIbanElementChangeEvent extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'iban';

  country: string;

  bankName: string;
}

type StripeIdealBankElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeIdealBankElementChangeEvent) => any
  ): StripeIdealBankElement;
  once(
    eventType: 'change',
    handler: (event: StripeIdealBankElementChangeEvent) => any
  ): StripeIdealBankElement;
  off(
    eventType: 'change',
    handler?: (event: StripeIdealBankElementChangeEvent) => any
  ): StripeIdealBankElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'idealBank'}) => any
  ): StripeIdealBankElement;

  /**
   * Updates the options the `IdealBankElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IdealBankElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIdealBankElementOptions>): void;
};

interface StripeIdealBankElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [iDEAL guide](https://stripe.com/docs/sources/ideal#specifying-customer-bank) (e.g., `abn_amro`).
   */
  value?: string;

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeIdealBankElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'idealBank';

  /**
   * The selected bank.
   * Can be one of the banks listed in the [iDEAL guide](https://stripe.com/docs/sources/ideal#specifying-customer-bank).
   */
  value: string;
}

type StripeLinkAuthenticationElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeLinkAuthenticationElementChangeEvent) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'change',
    handler: (event: StripeLinkAuthenticationElementChangeEvent) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'change',
    handler?: (event: StripeLinkAuthenticationElementChangeEvent) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'linkAuthentication';
      error: StripeError;
    }) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'linkAuthentication';
      error: StripeError;
    }) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {
      elementType: 'linkAuthentication';
      error: StripeError;
    }) => any
  ): StripeLinkAuthenticationElement;

  /**
   * Triggered when the loader UI is mounted to the DOM and ready to be displayed.
   */
  on(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  once(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
  off(
    eventType: 'loaderstart',
    handler?: (event: {elementType: 'linkAuthentication'}) => any
  ): StripeLinkAuthenticationElement;
};

interface StripeLinkAuthenticationElementOptions {
  /**
   * Default value for LinkAuthenticationElement fields
   */
  defaultValues?: {
    email: string;
  };
}

interface StripeLinkAuthenticationElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'linkAuthentication';

  /**
   * Whether or not the LinkAuthentication Element is currently empty.
   */
  empty: boolean;

  /**
   * Whether or not the LinkAuthentication Element is complete.
   */
  complete: boolean;

  /**
   * An object containing the current email.
   */
  value: {
    email: string;
  };
}

type StripeP24BankElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeP24BankElementChangeEvent) => any
  ): StripeP24BankElement;
  once(
    eventType: 'change',
    handler: (event: StripeP24BankElementChangeEvent) => any
  ): StripeP24BankElement;
  off(
    eventType: 'change',
    handler: (event: StripeP24BankElementChangeEvent) => any
  ): StripeP24BankElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  off(
    eventType: 'ready',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  off(
    eventType: 'focus',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  off(
    eventType: 'blur',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;
  off(
    eventType: 'escape',
    handler: (event: {elementType: 'p24Bank'}) => any
  ): StripeP24BankElement;

  /**
   * Updates the options the `P24BankElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `P24BankElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeP24BankElementOptions>): void;
};

interface StripeP24BankElementOptions {
  classes?: StripeElementClasses;

  style?: StripeElementStyle;

  /**
   * Appearance of the icon in the Element.
   */
  iconStyle?: 'default' | 'solid';

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [Przelewy24 guide](https://stripe.com/docs/payments/p24/accept-a-payment#bank-values) (e.g., `bank_austria`).
   */
  value?: string;

  /**
   * Hides the icon in the Element.
   * Default is `false`.
   */
  hideIcon?: boolean;

  /**
   * Applies a disabled state to the Element such that user input is not accepted.
   * Default is false.
   */
  disabled?: boolean;
}

interface StripeP24BankElementChangeEvent
  extends StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'p24Bank';

  /**
   * A pre-filled value for the Element.
   * Can be one of the banks listed in the [Przelewy24 guide](https://stripe.com/docs/payments/p24/accept-a-payment#bank-values) (e.g., `ing`).
   */
  value?: string;
}

type StripePaymentRequestButtonElement = StripeElementBase & {
  /**
   * Triggered when the payment request button is clicked.
   */
  on(
    eventType: 'click',
    handler: (event: StripePaymentRequestButtonElementClickEvent) => any
  ): StripePaymentRequestButtonElement;
  once(
    eventType: 'click',
    handler: (event: StripePaymentRequestButtonElementClickEvent) => any
  ): StripePaymentRequestButtonElement;
  off(
    eventType: 'click',
    handler?: (event: StripePaymentRequestButtonElementClickEvent) => any
  ): StripePaymentRequestButtonElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'paymentRequestButton'}) => any
  ): StripePaymentRequestButtonElement;

  /**
   * Updates the options the `PaymentRequestButtonElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `PaymentRequestButtonElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(
    options: Partial<
      Omit<StripePaymentRequestButtonElementOptions, 'paymentRequest'>
    >
  ): void;
};

interface StripePaymentRequestButtonElementOptions {
  classes?: StripeElementClasses;

  /**
   * An object used to customize the appearance of the Payment Request Button.
   * The object must have a single `paymentRequestButton` field, containing any of the following sub-fields
   */
  style?: {
    paymentRequestButton: {
      /**
       * Preferred button type to display. Available types, by wallet:
       *
       * Browser card: default, book, buy, or donate.
       *
       * Google Pay: default, buy, or donate.
       *
       * Apple Pay: default, book, buy, donate, check-out, subscribe, reload, add-money, top-up, order, rent, support, contribute, tip
       *
       * When a wallet does not support the provided value, default is used as a fallback.
       */
      type?:
        | 'default'
        | 'book'
        | 'buy'
        | 'donate'
        | 'check-out'
        | 'subscribe'
        | 'reload'
        | 'add-money'
        | 'top-up'
        | 'order'
        | 'rent'
        | 'support'
        | 'contribute'
        | 'tip';

      /**
       * One of dark, light, or light-outline. The default is dark.
       */
      theme?: 'dark' | 'light' | 'light-outline';

      /**
       * The height of the Payment Request Button. Accepts px unit values.
       */
      height?: string;

      /**
       * The gap between buttons when multile buttons are shown. Accepts px unit values.
       */
      buttonSpacing?: string;
    };
  };

  /**
   * A `PaymentRequest` object used to configure the element.
   */
  paymentRequest: PaymentRequest;

  /**
   * Disable showing multiple buttons.
   * Default is `false`.
   */
  disableMultipleButtons?: boolean;
}

interface StripePaymentRequestButtonElementClickEvent {
  preventDefault: () => void;
}

type StripeShippingAddressElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripeShippingAddressElementChangeEvent) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'change',
    handler: (event: StripeShippingAddressElementChangeEvent) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'change',
    handler?: (event: StripeShippingAddressElementChangeEvent) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'shippingAddress';
      error: StripeError;
    }) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'shippingAddress';
      error: StripeError;
    }) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {
      elementType: 'shippingAddress';
      error: StripeError;
    }) => any
  ): StripeShippingAddressElement;

  /**
   * Triggered when the loader UI is mounted to the DOM and ready to be displayed.
   */
  on(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  once(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;
  off(
    eventType: 'loaderstart',
    handler?: (event: {elementType: 'shippingAddress'}) => any
  ): StripeShippingAddressElement;

  /**
   * Updates the options the `ShippingAddressElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(
    options: Partial<StripeShippingAddressElementOptions>
  ): StripeShippingAddressElement;
};

interface StripeShippingAddressElementOptions {
  /**
   * Control which countries are displayed in the shippingAddress Element.
   */
  allowedCountries?: string[] | null;

  /**
   * Whether or not ShippingAddressElement accepts PO boxes
   */
  blockPoBox?: boolean;

  /**
   * Default value for ShippingAddressElement fields
   */
  defaultValues?: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country: string;
    };
    phone?: string | null;
  };

  /**
   * Control which additional fields to display in the shippingAddress Element.
   */
  fields?: {
    phone?: 'always' | 'never' | 'auto';
  };

  /**
   * Specify validation rules for the above additional fields.
   */
  validation?: {
    phone?: {
      required: 'always' | 'never' | 'auto';
    };
  };
}

interface StripeShippingAddressElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'shippingAddress';

  /**
   * Whether or not the shippingAddress Element is currently empty.
   */
  empty: boolean;

  /**
   * Whether or not the shippingAddress Element is complete.
   */
  complete: boolean;

  /**
   * Whether or not the shipping address is new.
   */
  isNewAddress: boolean;

  /**
   * An object containing the current address.
   */
  value: {
    name: string;
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    phone?: string;
  };
}

type StripeIssuingCardNumberDisplayElement = StripeElementBase & {
  /**
   * Updates the options the `IssuingCardNumberDisplayElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IssuingCardNumberDisplayElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIssuingCardNumberDisplayElementOptions>): void;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'issuingCardNumberDisplay'}) => any
  ): StripeIssuingCardNumberDisplayElement;
};

interface StripeIssuingCardNumberDisplayElementOptions {
  /**
   * The token (e.g. `ic_abc123`) of the issued card to display in this Element
   */
  issuingCard: string;

  /**
   * The secret component of the ephemeral key with which to authenticate this sensitive
   * card details request
   */
  ephemeralKeySecret?: string;

  /**
   * The nonce used to mint the ephemeral key provided in `ephemeralKeySecret`
   */
  nonce?: string;

  style?: StripeElementStyle;
}

type StripeIssuingCardCvcDisplayElement = StripeElementBase & {
  /**
   * Updates the options the `IssuingCardCvcDisplayElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IssuingCardCvcDisplayElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIssuingCardCvcDisplayElementOptions>): void;
};

interface StripeIssuingCardCvcDisplayElementOptions {
  /**
   * The token (e.g. `ic_abc123`) of the issued card to display in this Element
   */
  issuingCard: string;

  /**
   * The secret component of the ephemeral key with which to authenticate this sensitive
   * card details request
   */
  ephemeralKeySecret?: string;

  /**
   * The nonce used to mint the ephemeral key provided in `ephemeralKeySecret`
   */
  nonce?: string;

  style?: StripeElementStyle;
}

type StripeIssuingCardExpiryDisplayElement = StripeElementBase & {
  /**
   * Updates the options the `IssuingCardExpiryDisplayElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IssuingCardExpiryDisplayElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIssuingCardExpiryDisplayElementOptions>): void;
};

interface StripeIssuingCardExpiryDisplayElementOptions {
  /**
   * The token (e.g. `ic_abc123`) of the issued card to display in this Element
   */
  issuingCard: string;

  /**
   * The secret component of the ephemeral key with which to authenticate this sensitive
   * card details request
   */
  ephemeralKeySecret?: string;

  /**
   * The nonce used to mint the ephemeral key provided in `ephemeralKeySecret`
   */
  nonce?: string;

  style?: StripeElementStyle;
}

type StripeIssuingCardPinDisplayElement = StripeElementBase & {
  /**
   * Updates the options the `IssuingCardPinDisplayElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IssuingCardPinDisplayElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIssuingCardPinDisplayElementOptions>): void;
};

interface StripeIssuingCardPinDisplayElementOptions {
  /**
   * The token (e.g. `ic_abc123`) of the issued card to display in this Element
   */
  issuingCard: string;

  /**
   * The secret component of the ephemeral key with which to authenticate this sensitive
   * card details request
   */
  ephemeralKeySecret?: string;

  /**
   * The nonce used to mint the ephemeral key provided in `ephemeralKeySecret`
   */
  nonce?: string;

  style?: StripeElementStyle;
}

type StripeIssuingCardCopyButtonElement = StripeElementBase & {
  /**
   * Triggered when the element is clicked.
   */
  on(
    eventType: 'click',
    handler: (event: {elementType: 'issuingCardCopyButton'}) => any
  ): StripeIssuingCardCopyButtonElement;
  once(
    eventType: 'click',
    handler: (event: {elementType: 'issuingCardCopyButton'}) => any
  ): StripeIssuingCardCopyButtonElement;
  off(
    eventType: 'click',
    handler?: (event: {elementType: 'issuingCardCopyButton'}) => any
  ): StripeIssuingCardCopyButtonElement;

  /**
   * Updates the options the `IssuingCardCopyButtonElement` was initialized with.
   * Updates are merged into the existing configuration.
   *
   * The styles of an `IssuingCardCopyButtonElement` can be dynamically changed using `element.update`.
   * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
   */
  update(options: Partial<StripeIssuingCardCopyButtonElementOptions>): void;
};

interface StripeIssuingCardCopyButtonElementOptions {
  /**
   * The issued card data element to copy to the user's clipboard
   */
  toCopy: 'expiry' | 'cvc' | 'number' | 'pin';

  style?: StripeElementStyle;
}

interface StripeElements {
  /**
   * Updates the options that `Elements` was initialized with.
   * Updates are shallowly merged into the existing configuration.
   */
  update(options: StripeElementsUpdateOptions): void;

  /**
   * Fetches updates from the associated PaymentIntent or SetupIntent on an existing
   * instance of Elements, and reflects these updates in the Payment Element.
   */
  fetchUpdates(): Promise<{error?: {message: string; status?: string}}>;

  /**
   * Before confirming payment, call elements.submit() to validate the state of the
   * Payment Element and collect any data required for wallets.
   */
  submit(): Promise<{error?: StripeError}>;

  /////////////////////////////
  /// address
  /////////////////////////////

  /**
   * Creates an `AddressElement`.
   */
  create(
    elementType: 'address',
    options: StripeAddressElementOptions
  ): StripeAddressElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'address'): StripeAddressElement | null;

  /////////////////////////////
  /// paymentMethodMessaging
  /////////////////////////////

  /**
   * Creates an `paymentMethodMessagingElement`.
   */
  create(
    elementType: 'paymentMethodMessaging',
    options: StripePaymentMethodMessagingElementOptions
  ): StripePaymentMethodMessagingElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'paymentMethodMessaging'
  ): StripePaymentMethodMessagingElement | null;

  /////////////////////////////
  /// affirmMessage
  /////////////////////////////

  /**
   * Creates an `AffirmMessageElement`.
   */
  create(
    elementType: 'affirmMessage',
    options: StripeAffirmMessageElementOptions
  ): StripeAffirmMessageElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'affirmMessage'): StripeAffirmMessageElement | null;

  /////////////////////////////
  /// afterpayClearpayMessage
  /////////////////////////////

  /**
   * Creates an `AfterpayClearpayMessageElement`.
   */
  create(
    elementType: 'afterpayClearpayMessage',
    options: StripeAfterpayClearpayMessageElementOptions
  ): StripeAfterpayClearpayMessageElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'afterpayClearpayMessage'
  ): StripeAfterpayClearpayMessageElement | null;

  /////////////////////////////
  /// auBankAccount
  /////////////////////////////

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Creates an `AuBankAccountElement`.
   */
  create(
    elementType: 'auBankAccount',
    options?: StripeAuBankAccountElementOptions
  ): StripeAuBankAccountElement;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'auBankAccount'): StripeAuBankAccountElement | null;

  /////////////////////////////
  /// card
  /////////////////////////////

  /**
   * Creates a `CardElement`.
   */
  create(
    elementType: 'card',
    options?: StripeCardElementOptions
  ): StripeCardElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'card'): StripeCardElement | null;

  /////////////////////////////
  /// cardNumber
  /////////////////////////////

  /**
   * Creates a `CardNumberElement`.
   */
  create(
    elementType: 'cardNumber',
    options?: StripeCardNumberElementOptions
  ): StripeCardNumberElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'cardNumber'): StripeCardNumberElement | null;

  /////////////////////////////
  /// cardExpiry
  /////////////////////////////

  /**
   * Creates a `CardExpiryElement`.
   */
  create(
    elementType: 'cardExpiry',
    options?: StripeCardExpiryElementOptions
  ): StripeCardExpiryElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'cardExpiry'): StripeCardExpiryElement | null;

  /////////////////////////////
  /// cardCvc
  /////////////////////////////

  /**
   * Creates a `CardCvcElement`.
   */
  create(
    elementType: 'cardCvc',
    options?: StripeCardCvcElementOptions
  ): StripeCardCvcElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'cardCvc'): StripeCardCvcElement | null;

  /////////////////////////////
  /// cart
  /////////////////////////////

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Creates a `CartElement`.
   */
  create(
    elementType: 'cart',
    options: StripeCartElementOptions
  ): StripeCartElement;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'cart'): StripeCartElement | null;

  /////////////////////////////
  /// fpxBank
  /////////////////////////////

  /**
   * Creates an `FpxBankElement`.
   */
  create(
    elementType: 'fpxBank',
    options: StripeFpxBankElementOptions
  ): StripeFpxBankElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'fpxBank'): StripeFpxBankElement | null;

  /////////////////////////////
  /// epsBank
  /////////////////////////////

  /**
   *
   * Creates an `EpsBankElement`.
   */
  create(
    elementType: 'epsBank',
    options: StripeEpsBankElementOptions
  ): StripeEpsBankElement;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'epsBank'): StripeEpsBankElement | null;

  /////////////////////////////
  /// p24Bank
  /////////////////////////////

  /**
   *
   * Creates an `P24BankElement`.
   */
  create(
    elementType: 'p24Bank',
    options: StripeP24BankElementOptions
  ): StripeP24BankElement;

  /**
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'p24Bank'): StripeP24BankElement | null;

  /////////////////////////////
  /// iban
  /////////////////////////////

  /**
   * Creates an `IbanElement`.
   */
  create(
    elementType: 'iban',
    options?: StripeIbanElementOptions
  ): StripeIbanElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'iban'): StripeIbanElement | null;

  /////////////////////////////
  /// idealBank
  /////////////////////////////

  /**
   * Creates an `IdealBankElement`.
   */
  create(
    elementType: 'idealBank',
    options?: StripeIdealBankElementOptions
  ): StripeIdealBankElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'idealBank'): StripeIdealBankElement | null;

  /////////////////////////////
  /// linkAuthentication
  /////////////////////////////

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Creates a `LinkAuthenticationElement`.
   */
  create(
    elementType: 'linkAuthentication',
    options?: StripeLinkAuthenticationElementOptions
  ): StripeLinkAuthenticationElement;

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'linkAuthentication'
  ): StripeLinkAuthenticationElement | null;

  /////////////////////////////
  /// expressCheckout
  /////////////////////////////

  /**
   * Creates an `ExpressCheckoutElement`.
   */
  create(
    elementType: 'expressCheckout',
    options?: StripeExpressCheckoutElementOptions
  ): StripeExpressCheckoutElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'expressCheckout'
  ): StripeExpressCheckoutElement | null;

  /////////////////////////////
  /// payment
  /////////////////////////////

  /**
   * Creates a `PaymentElement`.
   *
   * @docs https://stripe.com/docs/payments/payment-element
   */
  create(
    elementType: 'payment',
    options?: StripePaymentElementOptions
  ): StripePaymentElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'payment'): StripePaymentElement | null;

  /////////////////////////////
  /// paymentRequestButton
  /////////////////////////////

  /**
   * Creates a `PaymentRequestButtonElement`.
   *
   * @docs https://stripe.com/docs/stripe-js/elements/payment-request-button
   */
  create(
    elementType: 'paymentRequestButton',
    options: StripePaymentRequestButtonElementOptions
  ): StripePaymentRequestButtonElement;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'paymentRequestButton'
  ): StripePaymentRequestButtonElement | null;

  /////////////////////////////
  /// shippingAddress
  /////////////////////////////

  /**
   * @deprecated
   * Use `Address` element instead.
   *
   * Creates a `ShippingAddressElement`.
   */
  create(
    elementType: 'shippingAddress',
    options?: StripeShippingAddressElementOptions
  ): StripeShippingAddressElement;

  /**
   * @deprecated
   * Use `Address` element instead.
   *
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'shippingAddress'
  ): StripeShippingAddressElement | null;

  /////////////////////////////
  /// issuing
  /////////////////////////////

  /**
   * Creates an `issuingCardNumberDisplay` Element
   *
   * @docs https://stripe.com/docs/js/issuing_elements/create?type=issuingCardNumberDisplay
   */
  create(
    elementType: 'issuingCardNumberDisplay',
    options: StripeIssuingCardNumberDisplayElementOptions
  ): StripeIssuingCardNumberDisplayElement;

  /**
   * Creates an `issuingCardCvcDisplay` Element
   *
   * @docs https://stripe.com/docs/js/issuing_elements/create?type=issuingCardCvcDisplay
   */
  create(
    elementType: 'issuingCardCvcDisplay',
    options: StripeIssuingCardCvcDisplayElementOptions
  ): StripeIssuingCardCvcDisplayElement;

  /**
   * Creates an `issuingCardExpiryDisplay` Element
   *
   * @docs https://stripe.com/docs/js/issuing_elements/create?type=issuingCardExpiryDisplay
   */
  create(
    elementType: 'issuingCardExpiryDisplay',
    options: StripeIssuingCardExpiryDisplayElementOptions
  ): StripeIssuingCardExpiryDisplayElement;

  /**
   * Creates an `issuingCardPinDisplay` Element
   *
   * @docs https://stripe.com/docs/js/issuing_elements/create?type=issuingCardPinDisplay
   */
  create(
    elementType: 'issuingCardPinDisplay',
    options: StripeIssuingCardPinDisplayElementOptions
  ): StripeIssuingCardPinDisplayElement;

  /**
   * Creates an `issuingCardCopyButton` Element
   *
   * @docs https://stripe.com/docs/js/issuing_elements/create?type=issuingCardCopyButton
   */
  create(
    elementType: 'issuingCardCopyButton',
    options: StripeIssuingCardCopyButtonElementOptions
  ): StripeIssuingCardCopyButtonElement;
}

type StripeElementType =
  | 'address'
  | 'affirmMessage'
  | 'afterpayClearpayMessage'
  | 'auBankAccount'
  | 'card'
  | 'cardNumber'
  | 'cardExpiry'
  | 'cardCvc'
  | 'cart'
  | 'epsBank'
  | 'expressCheckout'
  | 'fpxBank'
  | 'iban'
  | 'idealBank'
  | 'p24Bank'
  | 'payment'
  | 'paymentMethodMessaging'
  | 'paymentRequestButton'
  | 'linkAuthentication'
  | 'shippingAddress'
  | 'issuingCardNumberDisplay'
  | 'issuingCardCvcDisplay'
  | 'issuingCardExpiryDisplay'
  | 'issuingCardPinDisplay'
  | 'issuingCardCopyButton';

type StripeElement =
  | StripeAddressElement
  | StripeAffirmMessageElement
  | StripeAfterpayClearpayMessageElement
  | StripeAuBankAccountElement
  | StripeCardElement
  | StripeCardNumberElement
  | StripeCardExpiryElement
  | StripeCardCvcElement
  | StripeCartElement
  | StripeEpsBankElement
  | StripeFpxBankElement
  | StripeIbanElement
  | StripeIdealBankElement
  | StripeP24BankElement
  | StripeExpressCheckoutElement
  | StripePaymentElement
  | StripePaymentMethodMessagingElement
  | StripePaymentRequestButtonElement
  | StripeIssuingCardNumberDisplayElement
  | StripeIssuingCardCvcDisplayElement
  | StripeIssuingCardExpiryDisplayElement
  | StripeIssuingCardPinDisplayElement
  | StripeIssuingCardCopyButtonElement
  | StripeShippingAddressElement;

type StripeElementLocale =
  | 'auto'
  | 'ar'
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'en-AU'
  | 'en-CA'
  | 'en-NZ'
  | 'en-GB'
  | 'es'
  | 'es-ES'
  | 'es-419'
  | 'et'
  | 'fi'
  | 'fil'
  | 'fr'
  | 'fr-CA'
  | 'fr-FR'
  | 'he'
  | 'hu'
  | 'hr'
  | 'id'
  | 'it'
  | 'it-IT'
  | 'ja'
  | 'ko'
  | 'lt'
  | 'lv'
  | 'ms'
  | 'mt'
  | 'nb'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'pt-BR'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sv'
  | 'th'
  | 'tr'
  | 'vi'
  | 'zh'
  | 'zh-HK'
  | 'zh-TW';

type CardNetworkBrand =
  | 'accel'
  | 'amex'
  | 'carnet'
  | 'cartes_bancaires'
  | 'diners'
  | 'discover'
  | 'eftpos_au'
  | 'elo'
  | 'girocard'
  | 'interac'
  | 'jcb'
  | 'mastercard'
  | 'nyce'
  | 'pulse'
  | 'rupay'
  | 'star'
  | 'unionpay'
  | 'visa';

type PaymentMethodOptions = {
  card?: {require_cvc_recollection?: boolean};
  us_bank_account?: {
    financial_connections?: {
      permissions?: Array<
        'balances' | 'ownership' | 'payment_method' | 'transactions'
      >;
    };
    verification_method?: 'automatic' | 'instant';
  };
};

/**
 * Options to create an `Elements` instance with.
 */
interface BaseStripeElementsOptions {
  /**
   * An array of custom fonts, which elements created from the `Elements` object can use.
   */
  fonts?: Array<CssFontSource | CustomFontSource>;

  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display placeholders and error strings in.
   * Default is `auto` (Stripe detects the locale of the browser).
   * Setting the locale does not affect the behavior of postal code validation—a valid postal code for the billing country of the card is still required.
   */
  locale?: StripeElementLocale;

  /**
   * Match the Payment Element with the design of your site with the appearance option.
   * The layout of the Payment Element stays consistent, but you can modify colors, fonts, borders, padding, and more.
   *
   * @docs https://stripe.com/docs/stripe-js/appearance-api
   */
  appearance?: Appearance;

  /**
   * Display skeleton loader UI while waiting for Elements to be fully loaded, after they are mounted.
   * Supported for the `payment`, `shippingAddress`, and `linkAuthentication` Elements.
   * Default is `'auto'` (Stripe determines if a loader UI should be shown).
   */
  loader?: 'auto' | 'always' | 'never';

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Display saved PaymentMethods and Customer information.
   * Supported for the `payment`, `shippingAddress`, and `linkAuthentication` Elements.
   */
  customerOptions?: CustomerOptions;
}

interface StripeElementsOptionsClientSecret
  extends BaseStripeElementsOptions {
  /**
   * The client secret for a PaymentIntent or SetupIntent used by the Payment Element.
   *
   * @docs https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret
   */
  clientSecret?: string;

  /**
   * Either use mode or clientSecret when creating an Elements group
   */
  mode?: never;
}

interface StripeElementsOptionsMode extends BaseStripeElementsOptions {
  /**
   * Whether the Payment Element will be used to create a PaymentIntent, SetupIntent, or Subscription.
   */
  mode?: 'payment' | 'setup' | 'subscription';

  /**
   * Three character currency code (e.g., usd).
   */
  currency?: string;

  /**
   * The amount to be charged. Shown in Apple Pay, Google Pay, or Buy now pay later UIs, and influences available payment methods.
   */
  amount?: number;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent’s payment method.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-setup_future_usage
   */
  setupFutureUsage?: 'off_session' | 'on_session' | null;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent’s payment method.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-setup_future_usage
   */
  setup_future_usage?: 'off_session' | 'on_session' | null;

  /**
   * Controls when the funds will be captured from the customer’s account.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-capture_method
   */
  captureMethod?: 'manual' | 'automatic';

  /**
   * Controls when the funds will be captured from the customer’s account.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-capture_method
   */
  capture_method?: 'manual' | 'automatic';

  /**
   * The Stripe account ID which is the business of record.
   *
   * @docs https://stripe.com/docs/js/elements_object/create_without_intent#stripe_elements_no_intent-options-onBehalfOf
   */
  onBehalfOf?: string;

  /**
   * The Stripe account ID which is the business of record.
   *
   * @docs https://stripe.com/docs/js/elements_object/create_without_intent#stripe_elements_no_intent-options-onBehalfOf
   */
  on_behalf_of?: string;

  /**
   * Instead of using automatic payment methods, declare specific payment methods to enable.
   *
   * @docs https://stripe.com/docs/payments/payment-methods/overview
   */
  paymentMethodTypes?: string[];

  /**
   * Instead of using automatic payment methods, declare specific payment methods to enable.
   *
   * @docs https://stripe.com/docs/payments/payment-methods/overview
   */
  payment_method_types?: string[];

  /**
   * When using automatic payment methods (omitting paymentMethodTypes), provide a
   * payment method configuration ID for deriving payment methods.
   *
   * @docs https://stripe.com/docs/connect/payment-method-configurations
   */
  paymentMethodConfiguration?: string;

  /**
   * When using automatic payment methods (omitting payment_method_types), provide a
   * payment method configuration ID for deriving payment methods.
   *
   * @docs https://stripe.com/docs/connect/payment-method-configurations
   */
  payment_method_configuration?: string;

  /**
   * Allows PaymentMethods to be created from the Elements instance.
   */
  paymentMethodCreation?: 'manual';

  /**
   * Additional payment-method-specific options for configuring Payment Element behavior.
   *
   * @docs https://stripe.com/docs/js/elements_object/create_without_intent#stripe_elements_no_intent-options-paymentMethodOptions
   */
  paymentMethodOptions?: PaymentMethodOptions;

  /**
   * Additional payment-method-specific options for configuring Payment Element behavior.
   *
   * @docs https://stripe.com/docs/js/elements_object/create_without_intent#stripe_elements_no_intent-options-paymentMethodOptions
   */
  payment_method_options?: PaymentMethodOptions;

  /**
   * Either use mode or clientSecret when creating an Elements group
   */
  clientSecret?: never;

  /**
   * The external payment methods to be displayed in the Payment Element that you are already integrated with.
   *
   * @docs https://stripe.com/docs/js/elements_object/create#stripe_elements-options-externalPaymentMethodTypes
   */
  externalPaymentMethodTypes?: string[];
}

type StripeElementsOptions =
  | StripeElementsOptionsClientSecret
  | StripeElementsOptionsMode;

/*
 * Updatable options for an `Elements` instance
 */
interface StripeElementsUpdateOptions {
  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display placeholders and error strings in.
   * Default is `auto` (Stripe detects the locale of the browser).
   * Setting the locale does not affect the behavior of postal code validation—a valid postal code for the billing country of the card is still required.
   */
  locale?: StripeElementLocale;

  /**
   * Match the design of your site with the appearance option.
   * The layout of each Element stays consistent, but you can modify colors, fonts, borders, padding, and more.
   *
   * @docs https://stripe.com/docs/stripe-js/appearance-api
   */
  appearance?: Appearance;

  /**
   * Whether the Payment Element will be used to create a PaymentIntent, SetupIntent, or Subscription.
   */
  mode?: 'payment' | 'setup' | 'subscription';

  /**
   * Three character currency code (e.g., usd).
   */
  currency?: string;

  /**
   * The amount to be charged. Shown in Apple Pay, Google Pay, or Buy now pay later UIs, and influences available payment methods.
   */
  amount?: number;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent’s payment method.
   *
   * @docs https://stripe.com/docs/api/payment_intents/update#update_payment_intent-setup_future_usage
   */
  setupFutureUsage?: 'off_session' | 'on_session' | null;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent’s payment method.
   *
   * @docs https://stripe.com/docs/api/payment_intents/update#update_payment_intent-setup_future_usage
   */
  setup_future_usage?: 'off_session' | 'on_session' | null;

  /**
   * Controls when the funds will be captured from the customer’s account.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-capture_method
   */
  captureMethod?: 'manual' | 'automatic';

  /**
   * Controls when the funds will be captured from the customer’s account.
   *
   * @docs https://stripe.com/docs/api/payment_intents/create#create_payment_intent-capture_method
   */
  capture_method?: 'manual' | 'automatic';

  /**
   * Instead of using automatic payment methods, declare specific payment methods to enable.
   *
   * @docs https://stripe.com/docs/payments/payment-methods/overview
   */
  payment_method_types?: string[];

  /**
   * Instead of using automatic payment methods, declare specific payment methods to enable.
   *
   * @docs https://stripe.com/docs/payments/payment-methods/overview
   */
  paymentMethodTypes?: string[];
}

/*
 * Use a `CssFontSource` to pass custom fonts via a stylesheet URL when creating an `Elements` object.
 */
interface CssFontSource {
  /**
   * A relative or absolute URL pointing to a CSS file with [@font-face](https://developer.mozilla.org/en/docs/Web/CSS/@font-face) definitions, for example:
   *
   *     https://fonts.googleapis.com/css?family=Open+Sans
   *
   * Note that if you are using a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP), [additional directives](https://stripe.com/docs/security#content-security-policy) may be necessary.
   */
  cssSrc: string;
}

/*
 * Use a `CustomFontSource` to pass custom fonts when creating an `Elements` object.
 */
interface CustomFontSource {
  /**
   * The name to give the font
   */
  family: string;

  /**
   * A valid [src](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src) value pointing to your custom font file.
   * This is usually (though not always) a link to a file with a `.woff` , `.otf`, or `.svg` suffix.
   */
  src: string;

  /**
   * A valid [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) value.
   */
  display?: string;

  /**
   * Defaults to `normal`.
   */
  style?: 'normal' | 'italic' | 'oblique';

  /**
   * A valid [unicode-range](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range) value.
   */
  unicodeRange?: string;

  /**
   * A valid [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), as a string.
   */
  weight?: string;
}

/*
 * @docs https://stripe.com/docs/stripe-js/appearance-api
 */
interface Appearance {
  disableAnimations?: boolean;

  theme?: 'stripe' | 'night' | 'flat';

  variables?: {
    // General font styles
    fontFamily?: string;
    fontSmooth?: string;
    fontVariantLigatures?: string;
    fontVariationSettings?: string;
    fontLineHeight?: string;

    // Font sizes
    fontSizeBase?: string;
    fontSizeSm?: string;
    fontSizeXs?: string;
    fontSize2Xs?: string;
    fontSize3Xs?: string;
    fontSizeLg?: string;
    fontSizeXl?: string;

    // Font weights
    fontWeightLight?: string;
    fontWeightNormal?: string;
    fontWeightMedium?: string;
    fontWeightBold?: string;

    // Spacing
    spacingUnit?: string;
    gridRowSpacing?: string;
    gridColumnSpacing?: string;
    tabSpacing?: string;
    accordionItemSpacing?: string;
    /** @deprecated Use gridRowSpacing instead. */
    spacingGridRow?: string;
    /** @deprecated Use gridColumnSpacing instead. */
    spacingGridColumn?: string;
    /** @deprecated Use tabSpacing instead. */
    spacingTab?: string;
    /** @deprecated Use accordionItemSpacing instead. */
    spacingAccordionItem?: string;

    // Colors
    colorPrimary?: string;
    colorBackground?: string;
    colorText?: string;
    colorSuccess?: string;
    colorDanger?: string;
    colorWarning?: string;

    // Text variations
    colorTextSecondary?: string;
    colorTextPlaceholder?: string;

    // Accessible text
    accessibleColorOnColorPrimary?: string;
    accessibleColorOnColorBackground?: string;
    accessibleColorOnColorSuccess?: string;
    accessibleColorOnColorDanger?: string;
    accessibleColorOnColorWarning?: string;
    /** @deprecated Use accessibleColorOnColorPrimary instead. */
    colorPrimaryText?: string;
    /** @deprecated Use accessibleColorOnColorBackground instead. */
    colorBackgroundText?: string;
    /** @deprecated Use accessibleColorOnColorSuccess instead. */
    colorSuccessText?: string;
    /** @deprecated Use accessibleColorOnColorDanger instead. */
    colorDangerText?: string;
    /** @deprecated Use accessibleColorOnColorWarning instead. */
    colorWarningText?: string;

    // Icons
    iconColor?: string;
    iconHoverColor?: string;
    iconCardErrorColor?: string;
    iconCardCvcColor?: string;
    iconCardCvcErrorColor?: string;
    iconCheckmarkColor?: string;
    iconChevronDownColor?: string;
    iconChevronDownHoverColor?: string;
    iconCloseColor?: string;
    iconCloseHoverColor?: string;
    iconLoadingIndicatorColor?: string;
    iconMenuColor?: string;
    iconMenuHoverColor?: string;
    iconPasscodeDeviceColor?: string;
    iconPasscodeDeviceHoverColor?: string;
    iconPasscodeDeviceNotificationColor?: string;
    iconRedirectColor?: string;
    /** @deprecated Use iconColor instead. */
    colorIcon?: string;
    /** @deprecated Use iconHoverColor instead. */
    colorIconHover?: string;
    /** @deprecated Use iconCardErrorColor instead. */
    colorIconCardError?: string;
    /** @deprecated Use iconCardCvcColor instead. */
    colorIconCardCvc?: string;
    /** @deprecated Use iconCardCvcErrorColor instead. */
    colorIconCardCvcError?: string;
    /** @deprecated Use iconCheckmarkColor instead. */
    colorIconCheckmark?: string;
    /** @deprecated Use iconChevronDownColor instead. */
    colorIconChevronDown?: string;
    /** @deprecated Use iconChevronDownHoverColor instead. */
    colorIconChevronDownHover?: string;
    /** @deprecated Use iconRedirectColor instead. */
    colorIconRedirect?: string;

    // TabIcons
    tabIconColor?: string;
    tabIconHoverColor?: string;
    tabIconSelectedColor?: string;
    tabIconMoreColor?: string;
    tabIconMoreHoverColor?: string;
    /** @deprecated Use tabIconColor instead. */
    colorIconTab?: string;
    /** @deprecated Use tabIconHoverColor instead. */
    colorIconTabHover?: string;
    /** @deprecated Use tabIconHoverColor instead. */
    colorIconTabSelected?: string;
    /** @deprecated Use tabIconMoreColor instead. */
    colorIconTabMore?: string;
    /** @deprecated Use tabIconMoreHoverColor instead. */
    colorIconTabMoreHover?: string;

    // Logos
    logoColor?: string;
    tabLogoColor?: string;
    tabLogoSelectedColor?: string;
    blockLogoColor?: string;
    /** @deprecated Use logoColor instead. */
    colorLogo?: string;
    /** @deprecated Use tabLogoColor instead. */
    colorLogoTab?: string;
    /** @deprecated Use tabLogoSelectedColor instead. */
    colorLogoTabSelected?: string;
    /** @deprecated Use blockLogoColor instead. */
    colorLogoBlock?: string;

    // Focus
    focusBoxShadow?: string;
    focusOutline?: string;

    // Radius
    borderRadius?: string;
  };

  rules?: {
    [selector: string]: {
      [cssPropertyName: string]: string;
    };
  };

  labels?: 'above' | 'floating';
}

interface CustomerOptions {
  /**
   * The Customer id.
   */
  customer: string;

  /**
   * The ephemeral key for a Customer that grants temporary access to Customer data.
   */
  ephemeralKey: string;
}

type StripeElementBase = {
  /**
   * The `element.mount` method attaches your [Element](https://stripe.com/docs/js/element) to the DOM.
   * `element.mount` accepts either a CSS Selector (e.g., `'#card-element'`) or a DOM element.
   *
   * You need to create a container DOM element to mount an `Element`.
   * If the container DOM element has a label, the `Element` is automatically focused when its label is clicked.
   * There are two ways to do this:
   *
   * 1. Mount the instance within a `<label>`.
   * 2. Create a `<label>` with a `for` attribute, referencing the ID of your container.
   */
  mount(domElement: string | HTMLElement): void;

  /**
   * Blurs the element.
   */
  blur(): void;

  /**
   * Clears the value(s) of the element.
   */
  clear(): void;

  /**
   * Removes the element from the DOM and destroys it.
   * A destroyed element can not be re-activated or re-mounted to the DOM.
   */
  destroy(): void;

  /**
   * Focuses the element.
   */
  focus(): void;

  /**
   * Unmounts the element from the DOM.
   * Call `element.mount` to re-attach it to the DOM.
   */
  unmount(): void;
};

/**
 * Customize the appearance of an element using CSS properties passed in a `Style` object, which consists of CSS properties nested under objects for each variant.
 */
interface StripeElementStyle {
  /**
   * Base variant—all other variants inherit from these styles.
   */
  base?: StripeElementStyleVariant;

  /**
   * Applied when the element has valid input.
   */
  complete?: StripeElementStyleVariant;

  /**
   * Applied when the element has no customer input.
   */
  empty?: StripeElementStyleVariant;

  /**
   * Applied when the element has invalid input.
   */
  invalid?: StripeElementStyleVariant;
}

/**
 * An object with `CSSProperties` supported by Stripe.js.
 * Pseudo-classes and pseudo-elements can also be styled using a nested object inside of a variant.
 */
interface StripeElementStyleVariant extends StripeElementCSSProperties {
  ':hover'?: StripeElementCSSProperties;

  ':focus'?: StripeElementCSSProperties;

  '::placeholder'?: StripeElementCSSProperties;

  '::selection'?: StripeElementCSSProperties;

  ':-webkit-autofill'?: StripeElementCSSProperties;

  /**
   * Available for all elements except the `paymentRequestButton` element
   */
  ':disabled'?: StripeElementCSSProperties;

  /**
   * Available for the `cardNumber`, `cardExpiry`, and `cardCvc` elements.
   */
  '::-ms-clear'?: StripeElementCSSProperties & {display: string};
}

/**
 * CSS properties supported by Stripe.js.
 */
interface StripeElementCSSProperties {
  /**
   * The [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) CSS property.
   *
   * This property works best with the `::selection` pseudo-class.
   * In other cases, consider setting the background color on the element's container instaed.
   */
  backgroundColor?: string;

  /**
   * The [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
   */
  color?: string;

  /**
   * The [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) CSS property.
   */
  fontFamily?: string;

  /**
   * The [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) CSS property.
   */
  fontSize?: string;

  /**
   * The [font-smoothing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smoothing) CSS property.
   */
  fontSmoothing?: string;

  /**
   * The [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style) CSS property.
   */
  fontStyle?: string;

  /**
   * The [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) CSS property.
   */
  fontVariant?: string;

  /**
   * The [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) CSS property.
   */
  fontWeight?: string | number;

  /**
   * A custom property, used to set the color of the icons that are rendered in an element.
   */
  iconColor?: string;

  /**
   * The [line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) CSS property.
   *
   * To avoid cursors being rendered inconsistently across browsers, consider using a padding on the element's container instead.
   */
  lineHeight?: string;

  /**
   * The [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) CSS property.
   */
  letterSpacing?: string;

  /**
   * The [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) CSS property.
   *
   * Available for the `cardNumber`, `cardExpiry`, and `cardCvc` elements.
   */
  textAlign?: string;

  /**
   * The [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) CSS property.
   *
   * Available for the `idealBank` element.
   * Accepts integer length with `px` unit as values.
   */
  padding?: string;

  /**
   * The [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) CSS property.
   */
  textDecoration?: string;

  /**
   * The [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow) CSS property.
   */
  textShadow?: string;

  /**
   * The [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) CSS property.
   */
  textTransform?: string;
}

/**
 * Use `Classes` to set custom class names on the container DOM element when the Stripe element is in a particular state.
 */
interface StripeElementClasses {
  /**
   * The base class applied to the container.
   * Defaults to `StripeElement`.
   */
  base?: string;

  /**
   * The class name to apply when the `Element` is complete.
   * Defaults to `StripeElement--complete`.
   */
  complete?: string;

  /**
   * The class name to apply when the `Element` is empty.
   * Defaults to `StripeElement--empty`.
   */
  empty?: string;

  /**
   * The class name to apply when the `Element` is focused.
   * Defaults to `StripeElement--focus`.
   */
  focus?: string;

  /**
   * The class name to apply when the `Element` is invalid.
   * Defaults to `StripeElement--invalid`.
   */
  invalid?: string;

  /**
   * The class name to apply when the `Element` has its value autofilled by the browser (only on Chrome and Safari).
   * Defaults to `StripeElement--webkit-autofill`.
   */
  webkitAutofill?: string;
}

interface StripeElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: StripeElementType;

  /**
   * `true` if the value is empty.
   */
  empty: boolean;

  /**
   * `true` if the value is well-formed and potentially complete.
   * The `complete` value can be used to progressively disclose the next parts of your form or to enable form submission.
   *
   * It is not an indicator of whether a customer is done with their input—it only indicates that the Element contains a potentially complete, well-formed value.
   * In many cases the customer could still add further input.
   *
   * The `complete` value should not be used to perform an action such as advancing the cursor to a subsequent field or performing a tokenization request.
   */
  complete: boolean;

  /**
   * The current validation error, if any.
   */
  error:
    | undefined
    | {
        type: 'validation_error';
        code: string;
        message: string;
      };
}

type StripePaymentElement = StripeElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: StripePaymentElementChangeEvent) => any
  ): StripePaymentElement;
  once(
    eventType: 'change',
    handler: (event: StripePaymentElementChangeEvent) => any
  ): StripePaymentElement;
  off(
    eventType: 'change',
    handler?: (event: StripePaymentElementChangeEvent) => any
  ): StripePaymentElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  once(
    eventType: 'ready',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  off(
    eventType: 'ready',
    handler?: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {elementType: 'payment'; error: StripeError}) => any
  ): StripePaymentElement;
  once(
    eventType: 'loaderror',
    handler: (event: {elementType: 'payment'; error: StripeError}) => any
  ): StripePaymentElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {elementType: 'payment'; error: StripeError}) => any
  ): StripePaymentElement;

  /**
   * Triggered when the loader UI is mounted to the DOM and ready to be displayed.
   */
  on(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  once(
    eventType: 'loaderstart',
    handler: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;
  off(
    eventType: 'loaderstart',
    handler?: (event: {elementType: 'payment'}) => any
  ): StripePaymentElement;

  /**
   * Updates the options the `PaymentElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<StripePaymentElementOptions>): StripePaymentElement;

  /**
   * Collapses the Payment Element into a row of payment method tabs.
   */
  collapse(): StripePaymentElement;
};

interface DefaultValuesOption {
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      country?: string;
      postal_code?: string;
      state?: string;
      city?: string;
      line1?: string;
      line2?: string;
    };
  };
}

type FieldOption = 'auto' | 'never';

interface FieldsOption {
  billingDetails?:
    | FieldOption
    | {
        name?: FieldOption;
        email?: FieldOption;
        phone?: FieldOption;
        address?:
          | FieldOption
          | {
              country?: FieldOption;
              postalCode?: FieldOption;
              state?: FieldOption;
              city?: FieldOption;
              line1?: FieldOption;
              line2?: FieldOption;
            };
      };
}

type TermOption = 'auto' | 'always' | 'never';

interface TermsOption {
  applePay?: TermOption;
  auBecsDebit?: TermOption;
  bancontact?: TermOption;
  card?: TermOption;
  cashapp?: TermOption;
  googlePay?: TermOption;
  ideal?: TermOption;
  paypal?: TermOption;
  sepaDebit?: TermOption;
  sofort?: TermOption;
  usBankAccount?: TermOption;
}

type PaymentWalletOption = 'auto' | 'never';

interface PaymentWalletsOption {
  applePay?: PaymentWalletOption;
  googlePay?: PaymentWalletOption;
}

type Layout = 'tabs' | 'accordion' | 'auto';

interface LayoutObject {
  type: Layout;
  defaultCollapsed?: boolean;
  radios?: boolean;
  spacedAccordionItems?: boolean;
}

interface StripePaymentElementOptions {
  /**
   * Provide initial customer information that will be displayed in the Payment Element.
   */
  defaultValues?: DefaultValuesOption;

  /**
   * Override the business name displayed in the Payment Element.
   * By default the PaymentElement will use your Stripe account or business name.
   */
  business?: {name: string};

  /**
   * Override the order in which payment methods are displayed in the Payment Element.
   * By default, the Payment Element will use a dynamic ordering that optimizes payment method display for each user.
   */
  paymentMethodOrder?: string[];

  /**
   * Control which fields are displayed in the Payment Element.
   */
  fields?: FieldsOption;

  /**
   * Apply a read-only state to the Payment Element so that payment details can’t be changed.
   * Default is false.
   */
  readOnly?: boolean;

  /**
   * Control terms display in the Payment Element.
   */
  terms?: TermsOption;

  /**
   * Control wallets display in the Payment Element.
   */
  wallets?: PaymentWalletsOption;

  /**
   * Specify a layout to use when rendering a Payment Element.
   */
  layout?: Layout | LayoutObject;

  /**
   * Specify the options to be used when the Apple Pay payment interface opens.
   */
  applePay?: ApplePayOption;
}

interface StripePaymentElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'payment';

  /**
   * `true` if the all inputs in the Payment Element are empty.
   */
  empty: boolean;

  /**
   * `true` if the every input in the Payment Element is well-formed and potentially complete.
   */
  complete: boolean;

  /**
   * Whether or not the Payment Element is currently collapsed.
   */
  collapsed: boolean;

  /**
   * An object containing the currently selected PaymentMethod type (in snake_case, for example "afterpay_clearpay").
   */
  value: {type: string};
}

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 */

interface StripeCustomCheckoutElementsOptions {
  appearance?: Appearance;
  loader?: 'auto' | 'always' | 'never';
  fonts?: Array<CssFontSource | CustomFontSource>;
}

interface StripeCustomCheckoutOptions {
  clientSecret: string;
  elementsOptions?: StripeCustomCheckoutElementsOptions;
}

/* Custom Checkout types */
type StripeCustomCheckoutAddress = {
  country: string;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  state?: string | null;
};

type StripeCustomCheckoutAdjustableQuantity = {
  maximum: number;
  minimum: number;
};

type StripeCustomCheckoutBillingInterval =
  | 'day'
  | 'month'
  | 'week'
  | 'year';

type StripeCustomCheckoutConfirmationRequirement =
  | 'phoneNumber'
  | 'shippingAddress'
  | 'billingAddress'
  | 'paymentDetails'
  | 'email';

type StripeCustomCheckoutContact = {
  name?: string | null;
  address: StripeCustomCheckoutAddress;
};

type StripeCustomCheckoutDeliveryEstimate = {
  maximum: StripeCustomCheckoutEstimate | null;
  minimum: StripeCustomCheckoutEstimate | null;
};

type StripeCustomCheckoutDiscountAmount = {
  amount: number;
  displayName: string;
  promotionCode: string | null;
  recurring:
    | {type: 'forever'}
    | {type: 'repeating'; durationInMonths: number}
    | null;
};

type StripeCustomCheckoutDueNext = {
  amountSubtotal: number;
  amountDiscount: number;
  amountTaxInclusive: number;
  amountTaxExclusive: number;
  billingCycleAnchor: number | null;
};

type StripeCustomCheckoutEstimate = {
  unit: 'business_day' | 'day' | 'hour' | 'week' | 'month';
  value: number;
};

type StripeCustomCheckoutLastPaymentError = {
  message: string;
};

type StripeCustomCheckoutTaxAmount = {
  amount: number;
  inclusive: boolean;
  displayName: string;
};

type StripeCustomCheckoutLineItem = {
  id: string;
  name: string;
  amountDiscount: number;
  amountSubtotal: number;
  amountTaxExclusive: number;
  amountTaxInclusive: number;
  unitAmount: number;
  description: string | null;
  quantity: number;
  discountAmounts: Array<StripeCustomCheckoutDiscountAmount> | null;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
  recurring: {
    interval: StripeCustomCheckoutBillingInterval;
    intervalCount: number;
    isProrated: boolean;
    usageType: 'metered' | 'licensed';
  } | null;
  adjustableQuantity: StripeCustomCheckoutAdjustableQuantity | null;
};

type StripeCustomCheckoutRecurring = {
  interval: StripeCustomCheckoutBillingInterval;
  intervalCount: number;
  dueNext: StripeCustomCheckoutDueNext;
  trial: StripeCustomCheckoutTrial | null;
};

type StripeCustomCheckoutShipping = {
  shippingOption: StripeCustomCheckoutShippingOption;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
};

type StripeCustomCheckoutShippingOption = {
  id: string;
  amount: number;
  currency: string;
  displayName: string | null;
  deliveryEstimate: StripeCustomCheckoutDeliveryEstimate | null;
};

type StripeCustomCheckoutStatus =
  | {type: 'open'}
  | {type: 'expired'}
  | {
      type: 'complete';
      paymentStatus: 'paid' | 'unpaid' | 'no_payment_required';
    };

type StripeCustomCheckoutTaxStatus =
  | {status: 'ready'}
  | {status: 'requires_shipping_address'}
  | {status: 'requires_billing_address'};

type StripeCustomCheckoutTotalSummary = {
  appliedBalance: number;
  balanceAppliedToNextInvoice: boolean;
  discount: number;
  shippingRate: number;
  subtotal: number;
  taxExclusive: number;
  taxInclusive: number;
  total: number;
};

type StripeCustomCheckoutTrial = {
  trialEnd: number;
  trialPeriodDays: number;
};

/* Custom Checkout session */
interface StripeCustomCheckoutSession {
  billingAddress: StripeCustomCheckoutContact | null;
  canConfirm: boolean;
  confirmationRequirements: StripeCustomCheckoutConfirmationRequirement[];
  currency: string;
  discountAmounts: Array<StripeCustomCheckoutDiscountAmount> | null;
  email: string | null;
  lastPaymentError: StripeCustomCheckoutLastPaymentError | null;
  lineItems: Array<StripeCustomCheckoutLineItem>;
  phoneNumber: string | null;
  recurring: StripeCustomCheckoutRecurring | null;
  shipping: StripeCustomCheckoutShipping | null;
  shippingAddress: StripeCustomCheckoutContact | null;
  shippingOptions: Array<StripeCustomCheckoutShippingOption>;
  status: StripeCustomCheckoutStatus;
  tax: StripeCustomCheckoutTaxStatus;
  taxAmounts: Array<StripeCustomCheckoutTaxAmount> | null;
  total: StripeCustomCheckoutTotalSummary;
}

type StripeCustomCheckoutResult =
  | {session: StripeCustomCheckoutSession; error?: undefined}
  | {session?: undefined; error: StripeError};

type StripeCustomCheckoutPaymentElementOptions = {
  layout?: Layout | LayoutObject;
  paymentMethodOrder?: Array<string>;
  readonly?: boolean;
  terms?: TermsOption;
};

type StripeCustomCheckoutAddressElementOptions = {
  mode: AddressMode;
  contacts?: ContactOption[];
  display?: {
    name?: 'full' | 'split' | 'organization';
  };
};

type StripeCustomCheckoutExpressCheckoutElementOptions = {
  buttonHeight: StripeExpressCheckoutElementOptions['buttonHeight'];
  buttonTheme: StripeExpressCheckoutElementOptions['buttonTheme'];
  buttonType: StripeExpressCheckoutElementOptions['buttonType'];
  layout: StripeExpressCheckoutElementOptions['layout'];
};

type StripeCustomCheckoutUpdateHandler = (
  session: StripeCustomCheckoutSession
) => void;

type StripeCustomCheckoutExpressCheckoutElementConfirmEvent = StripeExpressCheckoutElementConfirmEvent & {
  confirm: () => Promise<StripeCustomCheckoutResult>;
};

type StripeCustomCheckoutExpressCheckoutElement = StripeElementBase & {
  /**
   * Triggered when the element is fully rendered.
   */
  on(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'ready',
    handler: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'ready',
    handler?: (event: StripeExpressCheckoutElementReadyEvent) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'focus',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'focus',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'blur',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'blur',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'escape',
    handler: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'escape',
    handler?: (event: {elementType: 'expressCheckout'}) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'loaderror',
    handler: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'loaderror',
    handler?: (event: {
      elementType: 'expressCheckout';
      error: StripeError;
    }) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Triggered when a buyer authorizes a payment within a supported payment method.
   */
  on(
    eventType: 'confirm',
    handler: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  once(
    eventType: 'confirm',
    handler: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;
  off(
    eventType: 'confirm',
    handler?: (
      event: StripeCustomCheckoutExpressCheckoutElementConfirmEvent
    ) => any
  ): StripeCustomCheckoutExpressCheckoutElement;

  /**
   * Updates the options the `ExpressCheckoutElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update: StripeExpressCheckoutElement['update'];
};

interface StripeCustomCheckout {
  /* Custom Checkout methods */
  applyPromotionCode: (
    promotionCode: string
  ) => Promise<StripeCustomCheckoutResult>;
  removePromotionCode: () => Promise<StripeCustomCheckoutResult>;
  updateShippingAddress: (
    shippingAddress: StripeCustomCheckoutContact | null
  ) => Promise<StripeCustomCheckoutResult>;
  updateBillingAddress: (
    billingAddress: StripeCustomCheckoutContact | null
  ) => Promise<StripeCustomCheckoutResult>;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateEmail: (email: string) => void;
  updateLineItemQuantity: (args: {
    lineItem: string;
    quantity: number;
  }) => Promise<StripeCustomCheckoutResult>;
  updateShippingOption: (
    shippingOption: string
  ) => Promise<StripeCustomCheckoutResult>;
  confirm: (args?: {
    return_url?: string;
  }) => Promise<StripeCustomCheckoutResult>;
  session: () => StripeCustomCheckoutSession;
  on: (event: 'change', handler: StripeCustomCheckoutUpdateHandler) => void;

  /* Elements methods */
  changeAppearance: (appearance: Appearance) => void;
  getElement(elementType: 'payment'): StripePaymentElement | null;
  getElement(
    elementType: 'address',
    mode: AddressMode
  ): StripeAddressElement | null;
  getElement(
    elementType: 'expressCheckout'
  ): StripeCustomCheckoutExpressCheckoutElement | null;
  createElement(
    elementType: 'payment',
    options?: StripeCustomCheckoutPaymentElementOptions
  ): StripePaymentElement;
  createElement(
    elementType: 'address',
    options: StripeCustomCheckoutAddressElementOptions
  ): StripeAddressElement;
  createElement(
    elementType: 'expressCheckout',
    options: StripeCustomCheckoutExpressCheckoutElementOptions
  ): StripeCustomCheckoutExpressCheckoutElement;
}

/**
 * The PaymentMethod object.
 */
interface PaymentMethod {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'payment_method';

  billing_details: PaymentMethod.BillingDetails;

  card?: PaymentMethod.Card;

  card_present?: PaymentMethod.CardPresent;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * The ID of the Customer to which this PaymentMethod is saved. This will not be set when the PaymentMethod has not been saved to a Customer.
   */
  customer: string | null;

  eps?: PaymentMethod.Eps;

  fpx?: PaymentMethod.Fpx;

  grabpay?: PaymentMethod.GrabPay;

  ideal?: PaymentMethod.Ideal;

  p24?: PaymentMethod.P24;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Metadata;

  sepa_debit?: PaymentMethod.SepaDebit;

  /**
   * The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type.
   */
  type: string;

  affirm?: PaymentMethod.Affirm;

  afterpay_clearpay?: PaymentMethod.AfterpayClearpay;

  acss_debit?: PaymentMethod.AcssDebit;

  au_becs_debit?: PaymentMethod.AuBecsDebit;

  us_bank_account?: PaymentMethod.UsBankAccount;
}

declare namespace PaymentMethod {
  export interface AuBecsDebit {
    /**
     * Bank State Branch
     */
    bsb_number: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
     */
    fingerprint: string | null;

    /**
     * Last four characters of the account number.
     */
    last4: string | null;
  }

  export interface BillingDetails {
    /**
     * Billing address.
     */
    address: Address | null;

    /**
     * Email address.
     */
    email: string | null;

    /**
     * Full name.
     */
    name: string | null;

    /**
     * Billing phone number (including extension).
     */
    phone: string | null;
  }

  export interface Card {
    /**
     * Card brand. Can be `amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`.
     */
    brand: string;

    /**
     * Checks on Card address and CVC if provided.
     */
    checks: Card.Checks | null;

    /**
     * Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.
     */
    country: string | null;

    /**
     * Two-digit number representing the card's expiration month.
     */
    exp_month: number;

    /**
     * Four-digit number representing the card's expiration year.
     */
    exp_year: number;

    /**
     * Uniquely identifies this particular card number. You can use this attribute to check whether two customers who've signed up with you are using the same card number.
     */
    fingerprint?: string | null;

    /**
     * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
     */
    funding: string;

    /**
     * The last four digits of the card.
     */
    last4: string;

    /**
     * Contains details on how this Card maybe be used for 3D Secure authentication.
     */
    three_d_secure_usage: Card.ThreeDSecureUsage | null;

    /**
     * If this Card is part of a card wallet, this contains the details of the card wallet.
     */
    wallet: null | {[k: string]: any};
  }

  export namespace Card {
    export interface Checks {
      /**
       * If a address line1 was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.
       */
      address_line1_check: string | null;

      /**
       * If a address postal code was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.
       */
      address_postal_code_check: string | null;

      /**
       * If a CVC was provided, results of the check, one of `pass`, `fail`, `unavailable`, or `unchecked`.
       */
      cvc_check: string | null;
    }

    export interface ThreeDSecureUsage {
      /**
       * Whether 3D Secure is supported on this card.
       */
      supported: boolean;
    }
  }

  export interface CardPresent {}

  export interface Eps {
    /**
     * The customer's bank.
     */
    bank: string;
  }

  export interface Fpx {
    /**
     * The customer's bank.
     */
    bank: string;
  }

  export interface GrabPay {}

  export interface Ideal {
    /**
     * The customer's bank, if provided.
     */
    bank: string | null;

    /**
     * The Bank Identifier Code of the customer's bank, if the bank was provided.
     */
    bic: string | null;
  }

  export interface P24 {
    /**
     * The customer's bank.
     */
    bank: string;
  }

  export interface SepaDebit {
    /**
     * Bank code of bank associated with the bank account.
     */
    bank_code: string | null;

    /**
     * Branch code of bank associated with the bank account.
     */
    branch_code: string | null;

    /**
     * Two-letter ISO code representing the country the bank account is located in.
     */
    country: string | null;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
     */
    fingerprint: string | null;

    /**
     * Last four characters of the IBAN.
     */
    last4: string | null;
  }

  export interface Affirm {}

  export interface AfterpayClearpay {}

  export interface AcssDebit {
    /**
     * Customer’s bank account number.
     */
    account_number: string;

    /**
     * Institution number of the customer’s bank.
     */
    institution_number: string;

    /**
     * Transit number of the customer’s bank.
     */
    transit_number: string;
  }

  export interface UsBankAccount {
    /**
     * Customer’s bank account number.
     */
    account_number: string;

    /**
     * The routing transit number for the bank account.
     */
    routing_number: string;

    /**
     * The type of entity that holds the account. This can be either `individual` or `company`.
     */
    account_holder_type: string;

    /**
     * Account type: checkings or savings. Defaults to checking if omitted.
     */
    account_type: string;

    /**
     * The name of the bank.
     */
    bank_name: string;

    /**
     * The ID of the Financial Connections Account used to create the payment method.
     */
    financial_connections_account: string;

    /**
     * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
     */
    fingerprint: string;

    /**
     * Last four digits of the bank account number.
     */
    last4: string;

    /**
     * Contains information about US bank account networks that can be used.
     */
    networks: {
      /**
       * The preferred network.
       */
      preferred: string;

      /**
       * All supported networks.
       */
      supported: string[];
    };
  }
}

interface CreatePaymentMethodFromElements {
  /**
   * The Elements instance
   *
   * @docs https://stripe.com/docs/js/elements_object
   */
  elements: StripeElements;

  /**
   * Parameters that will be passed on to the PaymentMethod API
   *
   * @docs https://stripe.com/docs/api/payment_methods/create
   */
  params?: PaymentMethodCreateParams;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
   */
  metadata?: MetadataParam;
}
interface CreatePaymentMethodFromElement {
  /**
   * The specific Element used to collect payment details
   *
   * @docs https://stripe.com/docs/js/element
   */
  element: StripeElement;

  /**
   * Parameters that will be passed on to the PaymentMethod API
   *
   * @docs https://stripe.com/docs/api/payment_methods/create
   */
  params?: PaymentMethodCreateParams;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
   */
  metadata?: MetadataParam;
}

interface PaymentMethodCreateParams {
  /**
   * Billing information associated with the PaymentMethod that may be used or required by particular types of payment methods.
   */
  billing_details?: PaymentMethodCreateParams.BillingDetails;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
   */
  metadata?: MetadataParam;

  /**
   * The PaymentMethod to share.
   */
  payment_method?: string;

  /**
   * The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type. Required unless `payment_method` is specified (see the [Cloning PaymentMethods](https://stripe.com/docs/payments/payment-methods/connect#cloning-payment-methods) guide)
   */
  type?: string;
}

declare namespace PaymentMethodCreateParams {
  export interface BillingDetails {
    /**
     * Billing address.
     */
    address?: BillingDetails.Address;

    /**
     * Email address.
     */
    email?: string;

    /**
     * Full name.
     */
    name?: string;

    /**
     * Billing phone number (including extension).
     */
    phone?: string;
  }

  export namespace BillingDetails {
    export interface Address {
      /**
       * City, district, suburb, town, or village.
       */
      city?: string;

      /**
       * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
       */
      country?: string;

      /**
       * Address line 1 (e.g., street, PO Box, or company name).
       */
      line1?: string;

      /**
       * Address line 2 (e.g., apartment, suite, unit, or building).
       */
      line2?: string;

      /**
       * ZIP or postal code.
       */
      postal_code?: string;

      /**
       * State, county, province, or region.
       */
      state?: string;
    }
  }
}

/**
 * The PaymentIntent object.
 */
interface PaymentIntent {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'payment_intent';

  /**
   * Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
   */
  amount: number;

  /**
   * Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch.
   */
  canceled_at: number | null;

  /**
   * Reason for cancellation of this PaymentIntent, either user-provided (`duplicate`, `fraudulent`, `requested_by_customer`, or `abandoned`) or generated by Stripe internally (`failed_invoice`, `void_invoice`, or `automatic`).
   */
  cancellation_reason: PaymentIntent.CancellationReason | null;

  /**
   * Controls when the funds will be captured from the customer's account.
   */
  capture_method: PaymentIntent.CaptureMethod;

  /**
   * The client secret of this PaymentIntent. Used for client-side retrieval using a publishable key.
   *
   * The client secret can be used to complete a payment from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
   *
   * Refer to our docs to [accept a payment](https://stripe.com/docs/payments/accept-a-payment) and learn about how `client_secret` should be handled.
   */
  client_secret: string | null;

  confirmation_method: PaymentIntent.ConfirmationMethod;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description: string | null;

  /**
   * The payment error encountered in the previous PaymentIntent confirmation. It will be cleared if the PaymentIntent is later updated for any reason.
   */
  last_payment_error: PaymentIntent.LastPaymentError | null;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * If present, this property tells you what actions you need to take in order for your customer to fulfill a payment using the provided source.
   */
  next_action: PaymentIntent.NextAction | null;

  /**
   * ID of the payment method used in this PaymentIntent, or the PaymentMethod itself if this field is expanded.
   */
  payment_method: string | null | PaymentMethod;

  /**
   * The list of payment method types (e.g. card) that this PaymentIntent is allowed to use.
   */
  payment_method_types: Array<string>;

  /**
   * Email address that the receipt for the resulting payment will be sent to.
   */
  receipt_email: string | null;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent's payment method.
   *
   * If present, the payment method used with this PaymentIntent can be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer, even after the transaction completes.
   *
   * For more, learn to [save card details after a payment](https://stripe.com/docs/payments/save-after-payment).
   *
   * Stripe uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules. For example, if your customer is impacted by [SCA](https://stripe.com/docs/strong-customer-authentication), using `off_session` will ensure that they are authenticated while processing this PaymentIntent. You will then be able to collect [off-session payments](https://stripe.com/docs/payments/cards/charging-saved-cards#off-session-payments-with-saved-cards) for this customer.
   */
  setup_future_usage: PaymentIntent.SetupFutureUsage | null;

  /**
   * Shipping information for this PaymentIntent.
   */
  shipping: PaymentIntent.Shipping | null;

  /**
   * Status of this PaymentIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`. Read more about each PaymentIntent [status](https://stripe.com/docs/payments/intents#intent-statuses).
   */
  status: PaymentIntent.Status;
}

declare namespace PaymentIntent {
  export type CancellationReason =
    | 'abandoned'
    | 'automatic'
    | 'duplicate'
    | 'failed_invoice'
    | 'fraudulent'
    | 'requested_by_customer'
    | 'void_invoice';

  export type CaptureMethod = 'automatic' | 'manual';

  export type ConfirmationMethod = 'automatic' | 'manual';

  export interface LastPaymentError {
    /**
     * For card errors, the ID of the failed charge.
     */
    charge?: string;

    /**
     * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
     */
    code?: string;

    /**
     * For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
     */
    decline_code?: string;

    /**
     * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
     */
    doc_url?: string;

    /**
     * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
     */
    message?: string;

    /**
     * If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
     */
    param?: string;

    payment_method?: PaymentMethod;

    /**
     * The type of error returned. One of `api_connection_error`, `api_error`, `authentication_error`, `card_error`, `idempotency_error`, `invalid_request_error`, or `rate_limit_error`
     */
    type: LastPaymentError.Type;
  }

  export namespace LastPaymentError {
    export type Type =
      | 'api_connection_error'
      | 'api_error'
      | 'authentication_error'
      | 'card_error'
      | 'idempotency_error'
      | 'invalid_request_error'
      | 'rate_limit_error';
  }

  export interface NextAction {
    redirect_to_url?: NextAction.RedirectToUrl;

    /**
     * Type of the next action to perform, one of `redirect_to_url`, `use_stripe_sdk` or `wechat_pay_display_qr_code`.
     */
    type: string;

    /**
     * Wechat Pay display qrcode
     */
    wechat_pay_display_qr_code?: NextAction.WechatPayDisplayQrCode;
  }

  export namespace NextAction {
    export interface RedirectToUrl {
      /**
       * If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.
       */
      return_url: string | null;

      /**
       * The URL you must redirect your customer to in order to authenticate the payment.
       */
      url: string | null;
    }
    export interface WechatPayDisplayQrCode {
      /**
       * Render and display `paymentIntent.next_action.wechat_pay_display_qr_code.data` as a QR code on your checkout page.
       */
      data: string;

      /**
       * Use `paymentIntent.next_action.wechat_pay_display_qr_code.image_data_url` as an image source.
       */
      image_data_url: string;
    }
  }

  export type SetupFutureUsage = 'off_session' | 'on_session';

  export interface Shipping {
    address?: Address;

    /**
     * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
     */
    carrier?: string | null;

    /**
     * Recipient name.
     */
    name?: string | null;

    /**
     * Recipient phone (including extension).
     */
    phone?: string | null;

    /**
     * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
     */
    tracking_number?: string | null;
  }

  export type Status =
    | 'canceled'
    | 'processing'
    | 'requires_action'
    | 'requires_capture'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';
}

interface PaymentIntentConfirmParams {
  /**
   * This hash contains details about the Mandate to create
   */
  mandate_data?: {[k: string]: any};

  /**
   * Email address that the receipt for the resulting payment will be sent to.
   */
  receipt_email?: string | '';

  /**
   * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site.
   * If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
   * This parameter is only used for cards and other redirect-based payment methods.
   */
  return_url?: string;

  /**
   * If the PaymentIntent has a `payment_method` and a `customer` or if you're attaching a payment method to the PaymentIntent in this request, you can pass `save_payment_method=true` to save the payment method to the customer. Defaults to `false`.
   *
   * If the payment method is already saved to a customer, this does nothing. If this type of payment method cannot be saved to a customer, the request will error.
   *
   * _Note that saving a payment method using this parameter does not guarantee that the payment method can be charged._ To ensure that only payment methods which can be charged are saved to a customer, you can [manually save](https://stripe.com/docs/api/customers/create#create_customer-source) the payment method in response to the [`payment_intent.succeeded` webhook](https://stripe.com/docs/api/events/types#event_types-payment_intent.succeeded).
   */
  save_payment_method?: boolean;

  /**
   * Indicates that you intend to make future payments with this PaymentIntent's payment method.
   *
   * If present, the payment method used with this PaymentIntent can be [attached](https://stripe.com/docs/api/payment_methods/attach) to a Customer, even after the transaction completes.
   *
   * Use `on_session` if you intend to only reuse the payment method when your customer is present in your checkout flow. Use `off_session` if your customer may or may not be in your checkout flow.
   *
   * Stripe uses `setup_future_usage` to dynamically optimize your payment flow and comply with regional legislation and network rules. For example, if your customer is impacted by [SCA](https://stripe.com/docs/strong-customer-authentication), using `off_session` will ensure that they are authenticated while processing this PaymentIntent. You will then be able to collect [off-session payments](https://stripe.com/docs/payments/cards/charging-saved-cards#off-session-payments-with-saved-cards) for this customer.
   *
   * If `setup_future_usage` is already set and you are performing a request using a publishable key, you may only update the value from `on_session` to `off_session`.
   */
  setup_future_usage?: PaymentIntentConfirmParams.SetupFutureUsage | null;

  /**
   * Shipping information for this PaymentIntent.
   */
  shipping?: PaymentIntentConfirmParams.Shipping | null;
}

declare namespace PaymentIntentConfirmParams {
  export type SetupFutureUsage = 'off_session' | 'on_session';

  export interface Shipping {
    /**
     * Shipping address.
     */
    address: AddressParam;

    /**
     * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
     */
    carrier?: string;

    /**
     * Recipient name.
     */
    name: string;

    /**
     * Recipient phone (including extension).
     */
    phone?: string;

    /**
     * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
     */
    tracking_number?: string;
  }
}

/**
 * The Order object.
 */
interface Order {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'order';

  /**
   * Total order cost after discounts and taxes are applied. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). To submit an order, the total must be either 0 or at least $0.50 USD or [equivalent in charge currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts).
   */
  amount_total: number;

  /**
   * Order cost before any discounts or taxes are applied. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency).
   */
  amount_subtotal: number;

  /**
   * Customer billing details associated with the order.
   */
  billing_details: Order.Billing | null;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Customer shipping information associated with the order.
   */
  shipping_details: Order.Shipping | null;

  /**
   * Payment information associated with the order.
   */
  payment: Order.Payment;

  /**
   * The overall status of the order.
   */
  status: Order.Status;
}

declare namespace Order {
  export interface Billing {
    /**
     * Billing address for the order.
     */
    address?: Address;

    /**
     * Email address for the order.
     */
    email?: string | null;

    /**
     * Full name for the order.
     */
    name?: string | null;

    /**
     * Billing phone number for the order (including extension).
     */
    phone?: string | null;
  }

  export interface Shipping {
    /**
     * Recipient shipping address. Required if the order includes products that are shippable.
     */
    address?: Address;

    /**
     * Recipient name.
     */
    name?: string | null;

    /**
     * Recipient phone (including extension).
     */
    phone?: string | null;
  }

  export interface Payment {
    /**
     * Payment intent associated with this order. Null when the order is `open`.
     */
    payment_intent?: PaymentIntent | null;

    /**
     * The status of the underlying payment associated with this order, if any. Null when the order is `open`.
     */
    status?: PaymentIntent.Status | null;
  }

  export type Status =
    | 'open'
    | 'submitted'
    | 'processing'
    | 'complete'
    | 'canceled';
}

/**
 * The SetupIntent object.
 */
interface SetupIntent {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'setup_intent';

  /**
   * Reason for cancellation of this SetupIntent, one of `abandoned`, `requested_by_customer`, or `duplicate`.
   */
  cancellation_reason: SetupIntent.CancellationReason | null;

  /**
   * The client secret of this SetupIntent. Used for client-side retrieval using a publishable key.
   *
   * The client secret can be used to complete payment setup from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
   */
  client_secret: string | null;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  description: string | null;

  /**
   * The error encountered in the previous SetupIntent confirmation.
   */
  last_setup_error: SetupIntent.LastSetupError | null;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * If present, this property tells you what actions you need to take in order for your customer to continue payment setup.
   */
  next_action: SetupIntent.NextAction | null;

  /**
   * ID of the payment method used with this SetupIntent, or the PaymentMethod itself if this field is expanded.
   */
  payment_method: string | null | PaymentMethod;

  /**
   * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up.
   */
  payment_method_types: Array<string>;

  /**
   * [Status](https://stripe.com/docs/payments/intents#intent-statuses) of this SetupIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `canceled`, or `succeeded`.
   */
  status: SetupIntent.Status;

  /**
   * Indicates how the payment method is intended to be used in the future.
   *
   * Use `on_session` if you intend to only reuse the payment method when the customer is in your checkout flow. Use `off_session` if your customer may or may not be in your checkout flow. If not provided, this value defaults to `off_session`.
   */
  usage: string;
}

declare namespace SetupIntent {
  export type CancellationReason =
    | 'abandoned'
    | 'duplicate'
    | 'requested_by_customer';

  export interface LastSetupError {
    /**
     * For card errors, the ID of the failed charge.
     */
    charge?: string;

    /**
     * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
     */
    code?: string;

    /**
     * For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
     */
    decline_code?: string;

    /**
     * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
     */
    doc_url?: string;

    /**
     * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
     */
    message?: string;

    /**
     * If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
     */
    param?: string;

    payment_method?: PaymentMethod;

    /**
     * The type of error returned. One of `api_connection_error`, `api_error`, `authentication_error`, `card_error`, `idempotency_error`, `invalid_request_error`, or `rate_limit_error`
     */
    type: LastSetupError.Type;
  }

  export namespace LastSetupError {
    export type Type =
      | 'api_connection_error'
      | 'api_error'
      | 'authentication_error'
      | 'card_error'
      | 'idempotency_error'
      | 'invalid_request_error'
      | 'rate_limit_error';
  }

  export interface NextAction {
    redirect_to_url?: NextAction.RedirectToUrl;

    /**
     * Type of the next action to perform, one of `redirect_to_url` or `use_stripe_sdk`.
     */
    type: string;

    /**
     * When confirming a SetupIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.
     */
    use_stripe_sdk?: NextAction.UseStripeSdk;
  }

  export namespace NextAction {
    export interface RedirectToUrl {
      /**
       * If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.
       */
      return_url: string | null;

      /**
       * The URL you must redirect your customer to in order to authenticate.
       */
      url: string | null;
    }

    export interface UseStripeSdk {}
  }

  export type Status =
    | 'canceled'
    | 'processing'
    | 'requires_action'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';
}

interface SetupIntentConfirmParams {
  /**
   * This hash contains details about the Mandate to create
   */
  mandate_data?: {[k: string]: any};

  /**
   * The URL to redirect your customer back to after they authenticate on the payment method's app or site.
   * If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
   * This parameter is only used for cards and other redirect-based payment methods.
   */
  return_url?: string;
}

/**
 * The Source object.
 */
interface Source {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'source';

  ach_credit_transfer?: Source.AchCreditTransfer;

  ach_debit?: Source.AchDebit;

  acss_debit?: Source.AcssDebit;

  alipay?: Source.Alipay;

  /**
   * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount associated with the source. This is the amount for which the source will be chargeable once ready. Required for `single_use` sources.
   */
  amount: number | null;

  au_becs_debit?: Source.AuBecsDebit;

  bancontact?: Source.Bancontact;

  card?: Source.Card;

  card_present?: Source.CardPresent;

  /**
   * The client secret of the source. Used for client-side retrieval using a publishable key.
   */
  client_secret: string;

  code_verification?: Source.CodeVerification;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) associated with the source. This is the currency for which the source will be chargeable once ready. Required for `single_use` sources.
   */
  currency: string | null;

  /**
   * The ID of the customer to which this source is attached. This will not be present when the source has not been attached to a customer.
   */
  customer?: string;

  eps?: Source.Eps;

  /**
   * The authentication `flow` of the source. `flow` is one of `redirect`, `receiver`, `code_verification`, `none`.
   */
  flow: string;

  giropay?: Source.Giropay;

  ideal?: Source.Ideal;

  klarna?: Source.Klarna;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Metadata | null;

  multibanco?: Source.Multibanco;

  /**
   * Information about the owner of the payment instrument that may be used or required by particular source types.
   */
  owner: Source.Owner | null;

  p24?: Source.P24;

  receiver?: Source.Receiver;

  redirect?: Source.Redirect;

  sepa_credit_transfer?: Source.SepaCreditTransfer;

  sepa_debit?: Source.SepaDebit;

  sofort?: Source.Sofort;

  source_order?: Source.SourceOrder;

  /**
   * Extra information about a source. This will appear on your customer's statement every time you charge the source.
   */
  statement_descriptor: string | null;

  /**
   * The status of the source, one of `canceled`, `chargeable`, `consumed`, `failed`, or `pending`. Only `chargeable` sources can be used to create a charge.
   */
  status: string;

  three_d_secure?: Source.ThreeDSecure;

  /**
   * The `type` of the source. The `type` is a payment method, one of `ach_credit_transfer`, `ach_debit`, `alipay`, `bancontact`, `card`, `card_present`, `eps`, `giropay`, `ideal`, `multibanco`, `klarna`, `p24`, `sepa_debit`, `sofort`, `three_d_secure`, or `wechat`. An additional hash is included on the source with a name matching this value. It contains additional information specific to the [payment method](https://stripe.com/docs/sources) used.
   */
  type: Source.Type;

  /**
   * Either `reusable` or `single_use`. Whether this source should be reusable or not. Some source types may or may not be reusable by construction, while others may leave the option at creation. If an incompatible value is passed, an error will be returned.
   */
  usage: string | null;

  wechat?: Source.Wechat;
}

declare namespace Source {
  export interface AchCreditTransfer {
    account_number?: string | null;

    bank_name?: string | null;

    fingerprint?: string | null;

    refund_account_holder_name?: string | null;

    refund_account_holder_type?: string | null;

    refund_routing_number?: string | null;

    routing_number?: string | null;

    swift_code?: string | null;
  }

  export interface AchDebit {
    bank_name?: string | null;

    country?: string | null;

    fingerprint?: string | null;

    last4?: string | null;

    routing_number?: string | null;

    type?: string | null;
  }

  export interface AcssDebit {
    bank_address_city?: string | null;

    bank_address_line_1?: string | null;

    bank_address_line_2?: string | null;

    bank_address_postal_code?: string | null;

    bank_name?: string | null;

    category?: string | null;

    country?: string | null;

    fingerprint?: string | null;

    last4?: string | null;

    routing_number?: string | null;
  }

  export interface Alipay {
    data_string?: string | null;

    native_url?: string | null;

    statement_descriptor?: string | null;
  }

  export interface AuBecsDebit {
    bsb_number?: string | null;

    fingerprint?: string | null;

    last4?: string | null;
  }

  export interface Bancontact {
    bank_code?: string | null;

    bank_name?: string | null;

    bic?: string | null;

    iban_last4?: string | null;

    preferred_language?: string | null;

    statement_descriptor?: string | null;
  }

  export interface Card {
    address_line1_check?: string | null;

    address_zip_check?: string | null;

    brand?: string | null;

    country?: string | null;

    cvc_check?: string | null;

    description?: string;

    dynamic_last4?: string | null;

    exp_month?: number | null;

    exp_year?: number | null;

    fingerprint?: string;

    funding?: string | null;

    iin?: string;

    issuer?: string;

    last4?: string | null;

    name?: string | null;

    three_d_secure?: string;

    tokenization_method?: string | null;
  }

  export interface CardPresent {
    application_cryptogram?: string;

    application_preferred_name?: string;

    authorization_code?: string | null;

    authorization_response_code?: string;

    brand?: string | null;

    country?: string | null;

    cvm_type?: string;

    data_type?: string | null;

    dedicated_file_name?: string;

    description?: string;

    emv_auth_data?: string;

    evidence_customer_signature?: string | null;

    evidence_transaction_certificate?: string | null;

    exp_month?: number | null;

    exp_year?: number | null;

    fingerprint?: string;

    funding?: string | null;

    iin?: string;

    issuer?: string;

    last4?: string | null;

    pos_device_id?: string | null;

    pos_entry_mode?: string;

    read_method?: string | null;

    reader?: string | null;

    terminal_verification_results?: string;

    transaction_status_information?: string;
  }

  export interface CodeVerification {
    /**
     * The number of attempts remaining to authenticate the source object with a verification code.
     */
    attempts_remaining: number;

    /**
     * The status of the code verification, either `pending` (awaiting verification, `attempts_remaining` should be greater than 0), `succeeded` (successful verification) or `failed` (failed verification, cannot be verified anymore as `attempts_remaining` should be 0).
     */
    status: string;
  }

  export interface Eps {
    reference?: string | null;

    statement_descriptor?: string | null;
  }

  export interface Giropay {
    bank_code?: string | null;

    bank_name?: string | null;

    bic?: string | null;

    statement_descriptor?: string | null;
  }

  export interface Ideal {
    bank?: string | null;

    bic?: string | null;

    iban_last4?: string | null;

    statement_descriptor?: string | null;
  }

  export interface Klarna {
    background_image_url?: string;

    client_token?: string | null;

    first_name?: string;

    last_name?: string;

    locale?: string;

    logo_url?: string;

    page_title?: string;

    pay_later_asset_urls_descriptive?: string;

    pay_later_asset_urls_standard?: string;

    pay_later_name?: string;

    pay_later_redirect_url?: string;

    pay_now_asset_urls_descriptive?: string;

    pay_now_asset_urls_standard?: string;

    pay_now_name?: string;

    pay_now_redirect_url?: string;

    pay_over_time_asset_urls_descriptive?: string;

    pay_over_time_asset_urls_standard?: string;

    pay_over_time_name?: string;

    pay_over_time_redirect_url?: string;

    payment_method_categories?: string;

    purchase_country?: string;

    purchase_type?: string;

    redirect_url?: string;

    shipping_first_name?: string;

    shipping_last_name?: string;
  }

  export interface Multibanco {
    entity?: string | null;

    reference?: string | null;

    refund_account_holder_address_city?: string | null;

    refund_account_holder_address_country?: string | null;

    refund_account_holder_address_line1?: string | null;

    refund_account_holder_address_line2?: string | null;

    refund_account_holder_address_postal_code?: string | null;

    refund_account_holder_address_state?: string | null;

    refund_account_holder_name?: string | null;

    refund_iban?: string | null;
  }

  export interface Owner {
    /**
     * Owner's address.
     */
    address: Address | null;

    /**
     * Owner's email address.
     */
    email: string | null;

    /**
     * Owner's full name.
     */
    name: string | null;

    /**
     * Owner's phone number (including extension).
     */
    phone: string | null;

    /**
     * Verified owner's address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
     */
    verified_address: Address | null;

    /**
     * Verified owner's email address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
     */
    verified_email: string | null;

    /**
     * Verified owner's full name. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
     */
    verified_name: string | null;

    /**
     * Verified owner's phone number (including extension). Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.
     */
    verified_phone: string | null;
  }

  export interface P24 {
    reference?: string | null;
  }

  export interface Receiver {
    /**
     * The address of the receiver source. This is the value that should be communicated to the customer to send their funds to.
     */
    address: string | null;

    /**
     * The total amount that was charged by you. The amount charged is expressed in the source's currency.
     */
    amount_charged: number;

    /**
     * The total amount received by the receiver source. `amount_received = amount_returned + amount_charged` is true at all time. The amount received is expressed in the source's currency.
     */
    amount_received: number;

    /**
     * The total amount that was returned to the customer. The amount returned is expressed in the source's currency.
     */
    amount_returned: number;

    /**
     * Type of refund attribute method, one of `email`, `manual`, or `none`.
     */
    refund_attributes_method: string;

    /**
     * Type of refund attribute status, one of `missing`, `requested`, or `available`.
     */
    refund_attributes_status: string;
  }

  export interface Redirect {
    /**
     * The failure reason for the redirect, either `user_abort` (the customer aborted or dropped out of the redirect flow), `declined` (the authentication failed or the transaction was declined), or `processing_error` (the redirect failed due to a technical error). Present only if the redirect status is `failed`.
     */
    failure_reason: string | null;

    /**
     * The URL you provide to redirect the customer to after they authenticated their payment.
     */
    return_url: string;

    /**
     * The status of the redirect, either `pending` (ready to be used by your customer to authenticate the transaction), `succeeded` (succesful authentication, cannot be reused) or `not_required` (redirect should not be used) or `failed` (failed authentication, cannot be reused).
     */
    status: string;

    /**
     * The URL provided to you to redirect a customer to as part of a `redirect` authentication flow.
     */
    url: string;
  }

  export interface SepaCreditTransfer {
    bank_name?: string | null;

    bic?: string | null;

    iban?: string | null;

    refund_account_holder_address_city?: string | null;

    refund_account_holder_address_country?: string | null;

    refund_account_holder_address_line1?: string | null;

    refund_account_holder_address_line2?: string | null;

    refund_account_holder_address_postal_code?: string | null;

    refund_account_holder_address_state?: string | null;

    refund_account_holder_name?: string | null;

    refund_iban?: string | null;
  }

  export interface SepaDebit {
    bank_code?: string | null;

    branch_code?: string | null;

    country?: string | null;

    fingerprint?: string | null;

    last4?: string | null;

    mandate_reference?: string | null;

    mandate_url?: string | null;
  }

  export interface Sofort {
    bank_code?: string | null;

    bank_name?: string | null;

    bic?: string | null;

    country?: string | null;

    iban_last4?: string | null;

    preferred_language?: string | null;

    statement_descriptor?: string | null;
  }

  export interface SourceOrder {
    /**
     * A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the order.
     */
    amount: number;

    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
     */
    currency: string;

    /**
     * The email address of the customer placing the order.
     */
    email?: string;

    /**
     * List of items constituting the order.
     */
    items: Array<SourceOrder.Item> | null;

    shipping?: SourceOrder.Shipping;
  }

  export namespace SourceOrder {
    export interface Item {
      /**
       * The amount (price) for this order item.
       */
      amount: number | null;

      /**
       * This currency of this order item. Required when `amount` is present.
       */
      currency: string | null;

      /**
       * Human-readable description for this order item.
       */
      description: string | null;

      /**
       * The quantity of this order item. When type is `sku`, this is the number of instances of the SKU to be ordered.
       */
      quantity?: number;

      /**
       * The type of this order item. Must be `sku`, `tax`, or `shipping`.
       */
      type: string | null;
    }

    export interface Shipping {
      address?: Address;

      /**
       * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
       */
      carrier?: string | null;

      /**
       * Recipient name.
       */
      name?: string | null;

      /**
       * Recipient phone (including extension).
       */
      phone?: string | null;

      /**
       * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
       */
      tracking_number?: string | null;
    }
  }

  export interface ThreeDSecure {
    address_line1_check?: string | null;

    address_zip_check?: string | null;

    authenticated?: boolean | null;

    brand?: string | null;

    card?: string | null;

    country?: string | null;

    customer?: string | null;

    cvc_check?: string | null;

    description?: string;

    dynamic_last4?: string | null;

    exp_month?: number | null;

    exp_year?: number | null;

    fingerprint?: string;

    funding?: string | null;

    iin?: string;

    issuer?: string;

    last4?: string | null;

    name?: string | null;

    three_d_secure?: string;

    tokenization_method?: string | null;
  }

  export type Type =
    | 'ach_credit_transfer'
    | 'ach_debit'
    | 'acss_debit'
    | 'alipay'
    | 'au_becs_debit'
    | 'bancontact'
    | 'card'
    | 'card_present'
    | 'eps'
    | 'giropay'
    | 'ideal'
    | 'klarna'
    | 'multibanco'
    | 'p24'
    | 'sepa_credit_transfer'
    | 'sepa_debit'
    | 'sofort'
    | 'three_d_secure'
    | 'wechat';

  export interface Wechat {
    prepay_id?: string;

    qr_code_url?: string | null;

    statement_descriptor?: string;
  }
}

interface SourceCreateParams {
  /**
   * Amount associated with the source. This is the amount for which the source will be chargeable once ready. Required for `single_use` sources. Not supported for `receiver` type sources, where charge amount may not be specified until funds land.
   */
  amount?: number;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) associated with the source. This is the currency for which the source will be chargeable once ready.
   */
  currency?: string;

  /**
   * The `Customer` to whom the original source is attached to. Must be set when the original source is not a `Source` (e.g., `Card`).
   */
  customer?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;

  /**
   * The authentication `flow` of the source to create. `flow` is one of `redirect`, `receiver`, `code_verification`, `none`. It is generally inferred unless a type supports multiple flows.
   */
  flow?: SourceCreateParams.Flow;

  /**
   * Information about a mandate possibility attached to a source object (generally for bank debits) as well as its acceptance status.
   */
  mandate?: SourceCreateParams.Mandate;

  metadata?: MetadataParam;

  /**
   * The source to share.
   */
  original_source?: string;

  /**
   * Information about the owner of the payment instrument that may be used or required by particular source types.
   */
  owner?: SourceCreateParams.Owner;

  /**
   * Optional parameters for the receiver flow. Can be set only if the source is a receiver (`flow` is `receiver`).
   */
  receiver?: SourceCreateParams.Receiver;

  /**
   * Parameters required for the redirect flow. Required if the source is authenticated by a redirect (`flow` is `redirect`).
   */
  redirect?: SourceCreateParams.Redirect;

  /**
   * Information about the items and shipping associated with the source. Required for transactional credit (for example Klarna) sources before you can charge it.
   */
  source_order?: SourceCreateParams.SourceOrder;

  /**
   * An arbitrary string to be displayed on your customer's statement. As an example, if your website is `RunClub` and the item you're charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket.` While many payment types will display this information, some may not display it at all.
   */
  statement_descriptor?: string;

  /**
   * An optional token used to create the source. When passed, token properties will override source parameters.
   */
  token?: string;

  /**
   * The `type` of the source to create. Required unless `customer` and `original_source` are specified (see the [Cloning card Sources](https://stripe.com/docs/sources/connect#cloning-card-sources) guide)
   */
  type?: string;

  usage?: SourceCreateParams.Usage;
}

declare namespace SourceCreateParams {
  export type Flow = 'code_verification' | 'none' | 'receiver' | 'redirect';

  export interface Mandate {
    /**
     * The parameters required to notify Stripe of a mandate acceptance or refusal by the customer.
     */
    acceptance?: Mandate.Acceptance;

    /**
     * The amount specified by the mandate. (Leave null for a mandate covering all amounts)
     */
    amount?: number | '';

    /**
     * The currency specified by the mandate. (Must match `currency` of the source)
     */
    currency?: string;

    /**
     * The interval of debits permitted by the mandate. Either `one_time` (just permitting a single debit), `scheduled` (with debits on an agreed schedule or for clearly-defined events), or `variable`(for debits with any frequency)
     */
    interval?: Mandate.Interval;

    /**
     * The method Stripe should use to notify the customer of upcoming debit instructions and/or mandate confirmation as required by the underlying debit network. Either `email` (an email is sent directly to the customer), `manual` (a `source.mandate_notification` event is sent to your webhooks endpoint and you should handle the notification) or `none` (the underlying debit network does not require any notification).
     */
    notification_method?: Mandate.NotificationMethod;
  }

  export namespace Mandate {
    export interface Acceptance {
      /**
       * The Unix timestamp (in seconds) when the mandate was accepted or refused by the customer.
       */
      date?: number;

      /**
       * The IP address from which the mandate was accepted or refused by the customer.
       */
      ip?: string;

      /**
       * The parameters required to store a mandate accepted offline. Should only be set if `mandate[type]` is `offline`
       */
      offline?: Acceptance.Offline;

      /**
       * The parameters required to store a mandate accepted online. Should only be set if `mandate[type]` is `online`
       */
      online?: Acceptance.Online;

      /**
       * The status of the mandate acceptance. Either `accepted` (the mandate was accepted) or `refused` (the mandate was refused).
       */
      status: Acceptance.Status;

      /**
       * The type of acceptance information included with the mandate. Either `online` or `offline`
       */
      type?: Acceptance.Type;

      /**
       * The user agent of the browser from which the mandate was accepted or refused by the customer.
       */
      user_agent?: string;
    }

    export namespace Acceptance {
      export interface Offline {
        /**
         * An email to contact you with if a copy of the mandate is requested, required if `type` is `offline`.
         */
        contact_email: string;
      }

      export interface Online {
        /**
         * The Unix timestamp (in seconds) when the mandate was accepted or refused by the customer.
         */
        date?: number;

        /**
         * The IP address from which the mandate was accepted or refused by the customer.
         */
        ip?: string;

        /**
         * The user agent of the browser from which the mandate was accepted or refused by the customer.
         */
        user_agent?: string;
      }

      export type Status = 'accepted' | 'pending' | 'refused' | 'revoked';

      export type Type = 'offline' | 'online';
    }

    export type Interval = 'one_time' | 'scheduled' | 'variable';

    export type NotificationMethod =
      | 'deprecated_none'
      | 'email'
      | 'manual'
      | 'none'
      | 'stripe_email';
  }

  export interface Owner {
    /**
     * Owner's address.
     */
    address?: Owner.Address;

    /**
     * Owner's email address.
     */
    email?: string;

    /**
     * Owner's full name.
     */
    name?: string;

    /**
     * Owner's phone number.
     */
    phone?: string;
  }

  export namespace Owner {
    export interface Address {
      /**
       * City, district, suburb, town, or village.
       */
      city?: string;

      /**
       * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
       */
      country?: string;

      /**
       * Address line 1 (e.g., street, PO Box, or company name).
       */
      line1?: string;

      /**
       * Address line 2 (e.g., apartment, suite, unit, or building).
       */
      line2?: string;

      /**
       * ZIP or postal code.
       */
      postal_code?: string;

      /**
       * State, county, province, or region.
       */
      state?: string;
    }
  }

  export interface Receiver {
    /**
     * The method Stripe should use to request information needed to process a refund or mispayment. Either `email` (an email is sent directly to the customer) or `manual` (a `source.refund_attributes_required` event is sent to your webhooks endpoint). Refer to each payment method's documentation to learn which refund attributes may be required.
     */
    refund_attributes_method?: Receiver.RefundAttributesMethod;
  }

  export namespace Receiver {
    export type RefundAttributesMethod = 'email' | 'manual' | 'none';
  }

  export interface Redirect {
    /**
     * The URL you provide to redirect the customer back to you after they authenticated their payment. It can use your application URI scheme in the context of a mobile application.
     */
    return_url: string;
  }

  export interface SourceOrder {
    /**
     * List of items constituting the order.
     */
    items?: Array<SourceOrder.Item>;

    /**
     * Shipping address for the order. Required if any of the SKUs are for products that have `shippable` set to true.
     */
    shipping?: SourceOrder.Shipping;
  }

  export namespace SourceOrder {
    export interface Item {
      amount?: number;

      currency?: string;

      description?: string;

      /**
       * The ID of the SKU being ordered.
       */
      parent?: string;

      /**
       * The quantity of this order item. When type is `sku`, this is the number of instances of the SKU to be ordered.
       */
      quantity?: number;

      type?: Item.Type;
    }

    export namespace Item {
      export type Type = 'discount' | 'shipping' | 'sku' | 'tax';
    }

    export interface Shipping {
      /**
       * Shipping address.
       */
      address: AddressParam;

      /**
       * The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.
       */
      carrier?: string;

      /**
       * Recipient name.
       */
      name?: string;

      /**
       * Recipient phone (including extension).
       */
      phone?: string;

      /**
       * The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.
       */
      tracking_number?: string;
    }
  }

  export type Usage = 'reusable' | 'single_use';
}

/**
 * The Card object.
 */
interface Card {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'card';

  /**
   * City/District/Suburb/Town/Village.
   */
  address_city: string | null;

  /**
   * Billing address country, if provided when creating card.
   */
  address_country: string | null;

  /**
   * Address line 1 (Street address/PO Box/Company name).
   */
  address_line1: string | null;

  /**
   * If `address_line1` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_line1_check: string | null;

  /**
   * Address line 2 (Apartment/Suite/Unit/Building).
   */
  address_line2: string | null;

  /**
   * State/County/Province/Region.
   */
  address_state: string | null;

  /**
   * ZIP or postal code.
   */
  address_zip: string | null;

  /**
   * If `address_zip` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  address_zip_check: string | null;

  /**
   * Card brand. Can be `American Express`, `Diners Club`, `Discover`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.
   */
  brand: string;

  /**
   * Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.
   */
  country: string | null;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency?: string | null;

  /**
   * The customer that this card belongs to. This attribute will not be in the card object if the card belongs to an account or recipient instead.
   */
  customer?: string | null;

  /**
   * If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.
   */
  cvc_check: string | null;

  /**
   * (For tokenized numbers only.) The last four digits of the device account number.
   */
  dynamic_last4: string | null;

  /**
   * Two-digit number representing the card's expiration month.
   */
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  exp_year: number;

  /**
   * Uniquely identifies this particular card number. You can use this attribute to check whether two customers who've signed up with you are using the same card number, for example.
   */
  fingerprint?: string | null;

  /**
   * Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.
   */
  funding: string;

  /**
   * The last four digits of the card.
   */
  last4: string;

  /**
   * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Metadata;

  /**
   * Cardholder name.
   */
  name: string | null;

  /**
   * If the card number is tokenized, this is the method that was used. Can be `apple_pay` or `google_pay`.
   */
  tokenization_method: string | null;
}

declare namespace Card {
  export type AvailablePayoutMethod = 'instant' | 'standard';
}

/**
 * The BankAccount object.
 */
interface BankAccount {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'bank_account';

  /**
   * The name of the person or business that owns the bank account.
   */
  account_holder_name: string | null;

  /**
   * The type of entity that holds the account. This can be either `individual` or `company`.
   */
  account_holder_type: string | null;

  /**
   * Name of the bank associated with the routing number (e.g., `WELLS FARGO`).
   */
  bank_name: string | null;

  /**
   * Two-letter ISO code representing the country the bank account is located in.
   */
  country: string;

  /**
   * Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.
   */
  currency: string;

  /**
   * Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.
   */
  fingerprint: string | null;

  /**
   * The last four digits of the bank account number.
   */
  last4: string;

  /**
   * The routing transit number for the bank account.
   */
  routing_number: string | null;

  /**
   * For bank accounts, possible values are `new`, `validated`, `verified`, `verification_failed`, or `errored`. A bank account that hasn't had any activity or validation performed is `new`. If Stripe can determine that the bank account exists, its status will be `validated`. Note that there often isn't enough information to know (e.g., for smaller credit unions), and the validation is not always run. If customer bank account verification has succeeded, the bank account status will be `verified`. If the verification failed for any reason, such as microdeposit failure, the status will be `verification_failed`. If a transfer sent to this bank account fails, we'll set the status to `errored` and will not continue to send transfers until the bank details are updated.
   *
   * For external accounts, possible values are `new` and `errored`. Validations aren't run against external accounts because they're only used for payouts. This means the other statuses don't apply. If a transfer fails, the status is set to `errored` and transfers are stopped until account details are updated.
   */
  status: string;
}

/**
 * The Token object.
 */
interface Token {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: 'token';

  bank_account?: BankAccount;

  card?: Card;

  /**
   * IP address of the client that generated the token.
   */
  client_ip: string | null;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * Type of the token: `account`, `bank_account`, `card`, or `pii`.
   */
  type: string;

  /**
   * Whether this token has already been used (tokens can be used only once).
   */
  used: boolean;
}

type BankAccountToken = Omit<Token, 'card'> & {
  bank_account: BankAccount;
};

declare namespace TokenCreateParams {
  export interface Account {
    /**
     * The business type.
     */
    business_type?: Account.BusinessType;

    /**
     * Information about the company or business.
     */
    company?: Account.Company;

    /**
     * Information about the person represented by the account.
     */
    individual?: Account.Individual;

    /**
     * Whether the user described by the data in the token has been shown [the Stripe Connected Account Agreement](https://stripe.com/docs/connect/account-tokens#stripe-connected-account-agreement). When creating an account token to create a new Connect account, this value must be `true`.
     */
    tos_shown_and_accepted?: boolean;
  }

  export namespace Account {
    export type BusinessType =
      | 'company'
      | 'government_entity'
      | 'individual'
      | 'non_profit';

    export interface Company {
      /**
       * The company's primary address.
       */
      address?: Company.Address;

      /**
       * The Kana variation of the company's primary address (Japan only).
       */
      address_kana?: JapanAddressParam;

      /**
       * The Kanji variation of the company's primary address (Japan only).
       */
      address_kanji?: JapanAddressParam;

      /**
       * Whether the company's directors have been provided. Set this Boolean to `true` after creating all the company's directors with [the Persons API](https://stripe.com/docs/api/persons) for accounts with a `relationship.director` requirement. This value is not automatically set to `true` after creating directors, so it needs to be updated to indicate all directors have been provided.
       */
      directors_provided?: boolean;

      /**
       * Whether the company's executives have been provided. Set this Boolean to `true` after creating all the company's executives with [the Persons API](https://stripe.com/docs/api/persons) for accounts with a `relationship.executive` requirement.
       */
      executives_provided?: boolean;

      /**
       * The company's legal name.
       */
      name?: string;

      /**
       * The Kana variation of the company's legal name (Japan only).
       */
      name_kana?: string;

      /**
       * The Kanji variation of the company's legal name (Japan only).
       */
      name_kanji?: string;

      /**
       * Whether the company's owners have been provided. Set this Boolean to `true` after creating all the company's owners with [the Persons API](https://stripe.com/docs/api/persons) for accounts with a `relationship.owner` requirement.
       */
      owners_provided?: boolean;

      /**
       * The company's phone number (used for verification).
       */
      phone?: string;

      /**
       * The category identifying the legal structure of the company or legal entity. See [Business structure](https://stripe.com/docs/connect/identity-verification#business-structure) for more details.
       */
      structure?: Company.Structure | null;

      /**
       * The business ID number of the company, as appropriate for the company's country. (Examples are an Employer ID Number in the U.S., a Business Number in Canada, or a Company Number in the UK.)
       */
      tax_id?: string;

      /**
       * The jurisdiction in which the `tax_id` is registered (Germany-based companies only).
       */
      tax_id_registrar?: string;

      /**
       * The VAT number of the company.
       */
      vat_id?: string;

      /**
       * Information on the verification state of the company.
       */
      verification?: Company.Verification;
    }

    export namespace Company {
      export interface Address {
        /**
         * City, district, suburb, town, or village.
         */
        city?: string;

        /**
         * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
         */
        country?: string;

        /**
         * Address line 1 (e.g., street, PO Box, or company name).
         */
        line1?: string;

        /**
         * Address line 2 (e.g., apartment, suite, unit, or building).
         */
        line2?: string;

        /**
         * ZIP or postal code.
         */
        postal_code?: string;

        /**
         * State, county, province, or region.
         */
        state?: string;
      }

      export type Structure =
        | 'government_instrumentality'
        | 'governmental_unit'
        | 'incorporated_non_profit'
        | 'limited_liability_partnership'
        | 'multi_member_llc'
        | 'private_company'
        | 'private_corporation'
        | 'private_partnership'
        | 'public_company'
        | 'public_corporation'
        | 'public_partnership'
        | 'sole_proprietorship'
        | 'tax_exempt_government_instrumentality'
        | 'unincorporated_association'
        | 'unincorporated_non_profit';

      export interface Verification {
        /**
         * A document verifying the business.
         */
        document?: Verification.Document;
      }

      export namespace Verification {
        export interface Document {
          /**
           * The back of a document returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `additional_verification`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          back?: string;

          /**
           * The front of a document returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `additional_verification`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          front?: string;
        }
      }
    }

    export interface Individual {
      /**
       * The individual's primary address.
       */
      address?: Individual.Address;

      /**
       * The Kana variation of the the individual's primary address (Japan only).
       */
      address_kana?: JapanAddressParam;

      /**
       * The Kanji variation of the the individual's primary address (Japan only).
       */
      address_kanji?: JapanAddressParam;

      /**
       * The individual's date of birth.
       */
      dob?: Individual.Dob | null;

      /**
       * The individual's email address.
       */
      email?: string;

      /**
       * The individual's first name.
       */
      first_name?: string;

      /**
       * The Kana variation of the the individual's first name (Japan only).
       */
      first_name_kana?: string;

      /**
       * The Kanji variation of the individual's first name (Japan only).
       */
      first_name_kanji?: string;

      /**
       * The individual's gender (International regulations require either "male" or "female").
       */
      gender?: string;

      /**
       * The government-issued ID number of the individual, as appropriate for the representative's country. (Examples are a Social Security Number in the U.S., or a Social Insurance Number in Canada). Instead of the number itself, you can also provide a [PII token created with Stripe.js](https://stripe.com/docs/stripe.js#collecting-pii-data).
       */
      id_number?: string;

      /**
       * The individual's last name.
       */
      last_name?: string;

      /**
       * The Kana varation of the individual's last name (Japan only).
       */
      last_name_kana?: string;

      /**
       * The Kanji varation of the individual's last name (Japan only).
       */
      last_name_kanji?: string;

      /**
       * The individual's maiden name.
       */
      maiden_name?: string;

      /**
       * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
       */
      metadata?: MetadataParam | null;

      /**
       * The individual's phone number.
       */
      phone?: string;

      /**
       * Indicates if the person or any of their representatives, family members, or other closely related persons, declares that they hold or have held an important public job or function, in any jurisdiction.
       */
      political_exposure?: Individual.PoliticalExposure;

      /**
       * The last four digits of the individual's Social Security Number (U.S. only).
       */
      ssn_last_4?: string;

      /**
       * The individual's verification document information.
       */
      verification?: Individual.Verification;
    }

    export namespace Individual {
      export interface Address {
        /**
         * City, district, suburb, town, or village.
         */
        city?: string;

        /**
         * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
         */
        country?: string;

        /**
         * Address line 1 (e.g., street, PO Box, or company name).
         */
        line1?: string;

        /**
         * Address line 2 (e.g., apartment, suite, unit, or building).
         */
        line2?: string;

        /**
         * ZIP or postal code.
         */
        postal_code?: string;

        /**
         * State, county, province, or region.
         */
        state?: string;
      }

      export interface Dob {
        /**
         * The day of birth, between 1 and 31.
         */
        day: number;

        /**
         * The month of birth, between 1 and 12.
         */
        month: number;

        /**
         * The four-digit year of birth.
         */
        year: number;
      }

      export type PoliticalExposure = 'none' | 'existing';

      export interface Verification {
        /**
         * A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
         */
        additional_document?: Verification.AdditionalDocument;

        /**
         * An identifying document, either a passport or local ID card.
         */
        document?: Verification.Document;
      }

      export namespace Verification {
        export interface AdditionalDocument {
          /**
           * The back of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          back?: string;

          /**
           * The front of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          front?: string;
        }

        export interface Document {
          /**
           * The back of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          back?: string;

          /**
           * The front of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
           */
          front?: string;
        }
      }
    }
  }

  export interface Person {
    /**
     * The person's address.
     */
    address?: Person.Address;

    /**
     * The Kana variation of the person's address (Japan only).
     */
    address_kana?: JapanAddressParam;

    /**
     * The Kanji variation of the person's address (Japan only).
     */
    address_kanji?: JapanAddressParam;

    /**
     * The person's date of birth.
     */
    dob?: Person.Dob | null;

    /**
     * The person's email address.
     */
    email?: string;

    /**
     * The person's first name.
     */
    first_name?: string;

    /**
     * The Kana variation of the person's first name (Japan only).
     */
    first_name_kana?: string;

    /**
     * The Kanji variation of the person's first name (Japan only).
     */
    first_name_kanji?: string;

    /**
     * The person's gender (International regulations require either "male" or "female").
     */
    gender?: string;

    /**
     * The person's ID number, as appropriate for their country. For example, a social security number in the U.S., social insurance number in Canada, etc. Instead of the number itself, you can also provide a [PII token provided by Stripe.js](https://stripe.com/docs/stripe.js#collecting-pii-data).
     */
    id_number?: string;

    /**
     * The person's last name.
     */
    last_name?: string;

    /**
     * The Kana variation of the person's last name (Japan only).
     */
    last_name_kana?: string;

    /**
     * The Kanji variation of the person's last name (Japan only).
     */
    last_name_kanji?: string;

    /**
     * The person's maiden name.
     */
    maiden_name?: string;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
     */
    metadata?: MetadataParam | null;

    /**
     * The person's phone number.
     */
    phone?: string;

    /**
     * The relationship that this person has with the account's legal entity.
     */
    relationship?: Person.Relationship;

    /**
     * The last 4 digits of the person's social security number.
     */
    ssn_last_4?: string;

    /**
     * The person's verification status.
     */
    verification?: Person.Verification;
  }

  export namespace Person {
    export interface Address {
      /**
       * City, district, suburb, town, or village.
       */
      city?: string;

      /**
       * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
       */
      country?: string;

      /**
       * Address line 1 (e.g., street, PO Box, or company name).
       */
      line1?: string;

      /**
       * Address line 2 (e.g., apartment, suite, unit, or building).
       */
      line2?: string;

      /**
       * ZIP or postal code.
       */
      postal_code?: string;

      /**
       * State, county, province, or region.
       */
      state?: string;
    }

    export interface Dob {
      /**
       * The day of birth, between 1 and 31.
       */
      day: number;

      /**
       * The month of birth, between 1 and 12.
       */
      month: number;

      /**
       * The four-digit year of birth.
       */
      year: number;
    }

    export interface Relationship {
      /**
       * Whether the person is a director of the account's legal entity. Currently only required for accounts in the EU. Directors are typically members of the governing board of the company, or responsible for ensuring the company meets its regulatory obligations.
       */
      director?: boolean;

      /**
       * Whether the person has significant responsibility to control, manage, or direct the organization.
       */
      executive?: boolean;

      /**
       * Whether the person is an owner of the account's legal entity.
       */
      owner?: boolean;

      /**
       * The percent owned by the person of the account's legal entity.
       */
      percent_ownership?: number | null;

      /**
       * Whether the person is authorized as the primary representative of the account. This is the person nominated by the business to provide information about themselves, and general information about the account. There can only be one representative at any given time. At the time the account is created, this person should be set to the person responsible for opening the account.
       */
      representative?: boolean;

      /**
       * The person's title (e.g., CEO, Support Engineer).
       */
      title?: string;
    }

    export interface Verification {
      /**
       * A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
       */
      additional_document?: Verification.AdditionalDocument;

      /**
       * An identifying document, either a passport or local ID card.
       */
      document?: Verification.Document;
    }

    export namespace Verification {
      export interface AdditionalDocument {
        /**
         * The back of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
         */
        back?: string;

        /**
         * The front of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
         */
        front?: string;
      }

      export interface Document {
        /**
         * The back of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
         */
        back?: string;

        /**
         * The front of an ID returned by a [file upload](https://stripe.com/docs/api#create_file) with a `purpose` value of `identity_document`. The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG, PNG, or PDF format, and less than 10 MB in size.
         */
        front?: string;
      }
    }
  }
}

/**
 * The VerificationSession object.
 */
interface VerificationSession {
  /**
   * Unique identifier for the object.
   */
  id: string;
}

type SupportedPaymentMethodType = 'us_bank_account' | 'link';

interface CommonBalance {
  /**
   * The time that the external institution calculated this balance. Measured
   * in seconds since the Unix epoch.
   */
  as_of: number;

  /**
   * The balances owed to (or by) the account holder.
   *
   * Each key is a three-letter ISO currency code, in lowercase.
   *
   * Each value is a integer amount. A positive amount indicates money owed to
   * the account holder. A negative amount indicates money owed by the account
   * holder.
   */
  current: {
    [key: string]: number | undefined;
  };
}

interface CashBalance {
  /**
   * Information on a `cash` balance. Only set if `balance.type` is `cash`.
   */
  cash: {
    /**
     * The funds available to the account holder. Typically this is the
     * current balance less any holds.
     *
     * Each key is a three-letter ISO currency code, in lowercase.
     *
     * Each value is a integer amount. A positive amount indicates money owed
     * to the account holder. A negative amount indicates money owed by the
     * account holder.
     */
    available: {[key: string]: number | undefined};
  };

  type: 'cash';
}

interface CreditBalance {
  /**
   * Information on a `credit` balance. Only set if `balance.type` is `credit`.
   */
  credit: {
    /**
     * The credit that has been used by the account holder.
     *
     * Each key is a three-letter ISO currency code, in lowercase
     *
     * Each value is a integer amount. A positive amount indicates money owed
     * to the account holder. A negative amount indicates money owed by the
     * account holder.
     */
    used: {[key: string]: number | undefined};
  };

  type: 'credit';
}

type Balance = (CommonBalance & CashBalance) | (CommonBalance & CreditBalance);

interface BalanceRefresh {
  /**
   * The status of the Balance Refresh
   */
  status: 'pending' | 'succeeded' | 'failed';

  /**
   * Time at which the Balance Refresh was attempted. Measured in seconds since the Unix epoch.
   */
  last_attempted_at: number;
}

interface OwnershipRefresh {
  /**
   * The status of the Ownership Refresh
   */
  status: 'pending' | 'succeeded' | 'failed';

  /**
   * Time at which the Ownersip Refresh was attempted. Measured in seconds since the Unix epoch.
   */
  last_attempted_at: number;
}

/**
 * The Financial Connections Session object
 */
interface FinancialConnectionsSession {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * List of accounts collected by the Session
   */
  accounts: FinancialConnectionsSession.Account[];

  /**
   * Filters applied to the Session
   */
  filters?: FinancialConnectionsSession.Filters;

  /**
   * List of data permissions requested in the Session
   */
  permissions?: FinancialConnectionsSession.Permission[];

  /**
   * For webview integrations only. The user will be redirected to this URL to return to your app.
   */
  return_url?: string;
}

declare namespace FinancialConnectionsSession {
  /**
   * The Financial Connections Account object
   */
  export interface Account {
    /**
     * Unique identifier for the object.
     */
    id: string;

    /**
     * String representing the object's type. `'linked_account'` is present for backwards-compatibility.
     */
    object: 'linked_account' | 'financial_connections.account';

    /**
     * The balance for this Account
     */
    balance: null | Balance;

    /**
     * The most recent Balance Refresh for this Account
     */
    balance_refresh: null | BalanceRefresh;

    /**
     * The type of the account.
     */
    category: 'cash' | 'credit' | 'investment' | 'other';

    /**
     * Time at which the object was created. Measured in seconds since the Unix epoch.
     */
    created: number;

    /**
     * A human-readable name that has been assigned to this account, either by the account holder or by the institution.
     */
    display_name: string;

    /**
     * The name of the institution that holds this account.
     */
    institution_name: string;

    /**
     * The last 4 digits of the account number. If present, this will be 4 numeric characters.
     */
    last4: string | null;

    /**
     * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
     */
    livemode: boolean;

    /**
     * The ID of this account's Ownership resource.
     */
    ownership: string | null;

    /**
     * The most recent Ownership Refresh for this Account
     */
    ownership_refresh: null | OwnershipRefresh;

    /**
     * Permissions granted on this Account
     */
    permissions: Permission[];

    /**
     * The status of the Account
     */
    status: 'active' | 'inactive' | 'disconnected';

    /**
     * The sub-category of the Account
     */
    subcategory:
      | 'checking'
      | 'savings'
      | 'mortgage'
      | 'line_of_credit'
      | 'credit_card'
      | 'other';

    /**
     * The types of Payment Methods which can be set up by this Account
     */
    supported_payment_method_types: SupportedPaymentMethodType[];
  }

  /**
   * Filters to restrict the kinds of accounts to collect.
   */
  export interface Filters {
    /**
     * List of countries from which to collect accounts.
     */
    countries?: string[];
  }

  /**
   * Data features to which access can be requested
   */
  export type Permission =
    | 'payment_method'
    | 'balances'
    | 'transactions'
    | 'ownership'
    | 'account_numbers';
}

declare const loadStripe: (
  publishableKey: string,
  options?: StripeConstructorOptions | undefined
) => Promise<Stripe | null>;

declare global {
  interface Window {
    // Stripe.js must be loaded directly from https://js.stripe.com/v3, which
    // places a `Stripe` object on the window
    Stripe?: StripeConstructor;
  }
}

export { type AccountAddressParam, type Address, type AddressMode, type AddressParam, type Appearance, type ApplePayButtonTheme, type ApplePayButtonType, type AvailablePaymentMethods, type BankAccount, type BankAccountToken, BillingDetails, type ButtonThemeOption, type ButtonTypeOption, type CanMakePaymentResult, Card, type CardNetworkBrand, type CartDescriptor, type CartItemDetails, type CartShowOnAdd, type ChangeResolveDetails, type CheckoutLocale, type ClickResolveDetails, type CollectBankAccountForPaymentOptions, type CollectBankAccountForSetupOptions, type CollectBankAccountParams, type CollectBankAccountPaymentMethodData, type CollectBankAccountTokenOptions, type CollectBankAccountTokenResult, type CollectFinancialConnectionsAccountsOptions, type ConfirmAcssDebitPaymentData, type ConfirmAcssDebitPaymentOptions, type ConfirmAcssDebitSetupData, type ConfirmAcssDebitSetupOptions, type ConfirmAffirmPaymentData, type ConfirmAffirmPaymentOptions, type ConfirmAfterpayClearpayPaymentData, type ConfirmAfterpayClearpayPaymentOptions, type ConfirmAlipayPaymentData, type ConfirmAlipayPaymentOptions, type ConfirmAuBecsDebitPaymentData, type ConfirmAuBecsDebitSetupData, type ConfirmBacsDebitSetupData, type ConfirmBancontactPaymentData, type ConfirmBancontactPaymentOptions, type ConfirmBancontactSetupData, type ConfirmBlikPaymentData, type ConfirmBlikPaymentOptions, type ConfirmBoletoPaymentData, type ConfirmBoletoPaymentOptions, type ConfirmCardPaymentData, type ConfirmCardPaymentOptions, type ConfirmCardSetupData, type ConfirmCardSetupOptions, type ConfirmCashappPaymentData, type ConfirmCashappPaymentOptions, type ConfirmCashappSetupData, type ConfirmCashappSetupOptions, type ConfirmCustomerBalancePaymentData, type ConfirmCustomerBalancePaymentOptions, type ConfirmEpsPaymentData, type ConfirmEpsPaymentOptions, type ConfirmFpxPaymentData, type ConfirmFpxPaymentOptions, type ConfirmGiropayPaymentData, type ConfirmGiropayPaymentOptions, type ConfirmGrabPayPaymentData, type ConfirmGrabPayPaymentOptions, type ConfirmIdealPaymentData, type ConfirmIdealPaymentOptions, type ConfirmIdealSetupData, type ConfirmKlarnaPaymentData, type ConfirmKlarnaPaymentOptions, type ConfirmKonbiniPaymentData, type ConfirmKonbiniPaymentOptions, type ConfirmOxxoPaymentData, type ConfirmOxxoPaymentOptions, type ConfirmP24PaymentData, type ConfirmP24PaymentOptions, type ConfirmPayNowPaymentData, type ConfirmPayNowPaymentOptions, type ConfirmPayPalPaymentData, type ConfirmPayPalSetupData, type ConfirmPaymentData, type ConfirmPixPaymentData, type ConfirmPixPaymentOptions, type ConfirmPromptPayPaymentData, type ConfirmPromptPayPaymentOptions, type ConfirmSepaDebitPaymentData, type ConfirmSepaDebitSetupData, type ConfirmSofortPaymentData, type ConfirmSofortPaymentOptions, type ConfirmSofortSetupData, type ConfirmSofortSetupOptions, type ConfirmUsBankAccountPaymentData, type ConfirmUsBankAccountSetupData, type ConfirmWechatPayPaymentData, type ConfirmWechatPayPaymentOptions, type ContactOption, type CreatePaymentMethodAcssDebitData, type CreatePaymentMethodAffirmData, type CreatePaymentMethodAfterpayClearpayData, type CreatePaymentMethodAlipayData, type CreatePaymentMethodAuBecsDebitData, type CreatePaymentMethodBacsDebitData, type CreatePaymentMethodBancontactData, type CreatePaymentMethodBlikData, type CreatePaymentMethodBoletoData, type CreatePaymentMethodCardData, type CreatePaymentMethodCashappData, type CreatePaymentMethodCustomerBalanceData, type CreatePaymentMethodData, type CreatePaymentMethodEpsData, type CreatePaymentMethodFpxData, type CreatePaymentMethodFromElement, type CreatePaymentMethodFromElements, type CreatePaymentMethodGiropayData, type CreatePaymentMethodGrabPayData, type CreatePaymentMethodIdealData, type CreatePaymentMethodKlarnaData, type CreatePaymentMethodKonbiniData, type CreatePaymentMethodOxxoData, type CreatePaymentMethodP24Data, type CreatePaymentMethodPayNowData, type CreatePaymentMethodPayPalData, type CreatePaymentMethodPixData, type CreatePaymentMethodPromptPayData, type CreatePaymentMethodSepaDebitData, type CreatePaymentMethodSofortData, type CreatePaymentMethodUsBankAccountData, type CreatePaymentMethodWechatPayData, CreateSourceData, type CreateTokenBankAccountData, type CreateTokenCardData, type CreateTokenIbanData, type CreateTokenPiiData, type CssFontSource, type CustomFontSource, type CustomerOptions, type DefaultValuesOption, type DeliveryEstimate, type DeliveryUnit, type EphemeralKeyNonceOptions, type EphemeralKeyNonceResult, type ExpressCheckoutAddress, type ExpressCheckoutPartialAddress, type ExpressCheckoutWalletOption, type ExpressCheckoutWalletsOption, type ExpressPaymentType, type FieldOption, type FieldsOption, FinancialConnectionsSession, type FinancialConnectionsSessionResult, type GooglePayButtonTheme, type GooglePayButtonType, type JapanAddressParam, type Layout, type LayoutObject, type LayoutOption, type LineItem, type Metadata, type MetadataParam, Order, PaymentIntent, PaymentIntentConfirmParams, type PaymentIntentOrSetupIntentResult, type PaymentIntentResult, PaymentMethod, PaymentMethodCreateParams, type PaymentMethodResult, type PaymentRequest, type PaymentRequestCompleteStatus, type PaymentRequestEvent, type PaymentRequestItem, type PaymentRequestOptions, type PaymentRequestPaymentMethodEvent, type PaymentRequestShippingAddress, type PaymentRequestShippingAddressEvent, type PaymentRequestShippingOption, type PaymentRequestShippingOptionEvent, type PaymentRequestSourceEvent, type PaymentRequestTokenEvent, type PaymentRequestUpdateDetails, type PaymentRequestUpdateDetailsStatus, type PaymentRequestUpdateOptions, type PaymentRequestWallet, type PaymentWalletOption, type PaymentWalletsOption, type ProcessOrderParams, type ProcessOrderResult, type RadarSessionPayload, type RedirectToCheckoutClientOptions, type RedirectToCheckoutOptions, type RedirectToCheckoutServerOptions, type RetrieveOrderResult, type RetrieveSourceParam, SetupIntent, type SetupIntentConfirmParams, type SetupIntentResult, type ShippingAddress, type ShippingRate, Source, SourceCreateParams, type SourceResult, type Stripe, type StripeAddressElement, type StripeAddressElementChangeEvent, type StripeAddressElementOptions, type StripeAffirmMessageElement, type StripeAffirmMessageElementOptions, type StripeAfterpayClearpayMessageElement, type StripeAfterpayClearpayMessageElementOptions, type StripeAuBankAccountElement, type StripeAuBankAccountElementChangeEvent, type StripeAuBankAccountElementOptions, type StripeCardCvcElement, type StripeCardCvcElementChangeEvent, type StripeCardCvcElementOptions, type StripeCardElement, type StripeCardElementChangeEvent, type StripeCardElementOptions, type StripeCardElementUpdateOptions, type StripeCardExpiryElement, type StripeCardExpiryElementChangeEvent, type StripeCardExpiryElementOptions, type StripeCardNumberElement, type StripeCardNumberElementChangeEvent, type StripeCardNumberElementOptions, type StripeCardNumberElementUpdateOptions, type StripeCartElement, type StripeCartElementLineItemClickEvent, type StripeCartElementOptions, type StripeCartElementPayloadEvent, type StripeCartElementUpdateOptions, type StripeConstructor, type StripeConstructorOptions, type StripeCustomCheckout, type StripeCustomCheckoutAddress, type StripeCustomCheckoutAddressElementOptions, type StripeCustomCheckoutAdjustableQuantity, type StripeCustomCheckoutBillingInterval, type StripeCustomCheckoutConfirmationRequirement, type StripeCustomCheckoutContact, type StripeCustomCheckoutDeliveryEstimate, type StripeCustomCheckoutDiscountAmount, type StripeCustomCheckoutDueNext, type StripeCustomCheckoutElementsOptions, type StripeCustomCheckoutEstimate, type StripeCustomCheckoutExpressCheckoutElement, type StripeCustomCheckoutExpressCheckoutElementConfirmEvent, type StripeCustomCheckoutExpressCheckoutElementOptions, type StripeCustomCheckoutLastPaymentError, type StripeCustomCheckoutLineItem, type StripeCustomCheckoutOptions, type StripeCustomCheckoutPaymentElementOptions, type StripeCustomCheckoutRecurring, type StripeCustomCheckoutResult, type StripeCustomCheckoutSession, type StripeCustomCheckoutShipping, type StripeCustomCheckoutShippingOption, type StripeCustomCheckoutStatus, type StripeCustomCheckoutTaxAmount, type StripeCustomCheckoutTaxStatus, type StripeCustomCheckoutTotalSummary, type StripeCustomCheckoutTrial, type StripeCustomCheckoutUpdateHandler, type StripeElement, type StripeElementBase, type StripeElementCSSProperties, type StripeElementChangeEvent, type StripeElementClasses, type StripeElementLocale, type StripeElementStyle, type StripeElementStyleVariant, type StripeElementType, type StripeElements, type StripeElementsOptions, type StripeElementsOptionsClientSecret, type StripeElementsOptionsMode, type StripeElementsUpdateOptions, type StripeEmbeddedCheckout, type StripeEmbeddedCheckoutOptions, type StripeEpsBankElement, type StripeEpsBankElementChangeEvent, type StripeEpsBankElementOptions, type StripeError, type StripeErrorType, type StripeExpressCheckoutElement, type StripeExpressCheckoutElementClickEvent, type StripeExpressCheckoutElementConfirmEvent, type StripeExpressCheckoutElementOptions, type StripeExpressCheckoutElementReadyEvent, type StripeExpressCheckoutElementShippingAddressChangeEvent, type StripeExpressCheckoutElementShippingRateChangeEvent, type StripeExpressCheckoutElementUpdateOptions, type StripeFpxBankElement, type StripeFpxBankElementChangeEvent, type StripeFpxBankElementOptions, type StripeIbanElement, type StripeIbanElementChangeEvent, type StripeIbanElementOptions, type StripeIdealBankElement, type StripeIdealBankElementChangeEvent, type StripeIdealBankElementOptions, type StripeIssuingCardCopyButtonElement, type StripeIssuingCardCopyButtonElementOptions, type StripeIssuingCardCvcDisplayElement, type StripeIssuingCardCvcDisplayElementOptions, type StripeIssuingCardExpiryDisplayElement, type StripeIssuingCardExpiryDisplayElementOptions, type StripeIssuingCardNumberDisplayElement, type StripeIssuingCardNumberDisplayElementOptions, type StripeIssuingCardPinDisplayElement, type StripeIssuingCardPinDisplayElementOptions, type StripeLinkAuthenticationElement, type StripeLinkAuthenticationElementChangeEvent, type StripeLinkAuthenticationElementOptions, type StripeP24BankElement, type StripeP24BankElementChangeEvent, type StripeP24BankElementOptions, type StripePaymentElement, type StripePaymentElementChangeEvent, type StripePaymentElementOptions, type StripePaymentMethodMessagingElement, type StripePaymentMethodMessagingElementOptions, type StripePaymentRequestButtonElement, type StripePaymentRequestButtonElementClickEvent, type StripePaymentRequestButtonElementOptions, type StripeShippingAddressElement, type StripeShippingAddressElementChangeEvent, type StripeShippingAddressElementOptions, type TermOption, type TermsOption, type Token, TokenCreateParams, type TokenResult, type VerificationSession, type VerificationSessionResult, type VerifyMicrodepositsForPaymentData, type VerifyMicrodepositsForSetupData, type WrapperLibrary, loadStripe };

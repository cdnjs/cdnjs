export * from './api';
export * from './stripe-js';

import {StripeConstructor} from './stripe-js';

export {loadStripe} from './shared';

declare global {
  interface Window {
    // Stripe.js must be loaded directly from https://js.stripe.com/v3, which
    // places a `Stripe` object on the window
    Stripe?: StripeConstructor;
  }
}

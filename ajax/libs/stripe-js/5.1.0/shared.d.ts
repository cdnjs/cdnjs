import {StripeConstructorOptions, Stripe} from './stripe-js';

export const loadStripe: (
  publishableKey: string,
  options?: StripeConstructorOptions | undefined
) => Promise<Stripe | null>;

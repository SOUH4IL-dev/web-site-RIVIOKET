import Stripe from 'stripe';
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

// Server-side Stripe instance (NEVER expose to browser/client components)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
  typescript: true,
});

// Client-side Stripe loader for Stripe Elements
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
    );
  }
  return stripePromise;
};

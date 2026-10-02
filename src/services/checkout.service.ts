import { stripe } from '@/lib/stripe';

export class CheckoutService {
  static async createPaymentIntent(amountCents: number, currency: string = 'eur') {
    return stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      automatic_payment_methods: { enabled: true },
    });
  }
}

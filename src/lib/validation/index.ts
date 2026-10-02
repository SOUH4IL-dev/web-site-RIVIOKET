import { z } from 'zod';

export const cartItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
});

export const checkoutSchema = z.object({
  customerEmail: z.string().email(),
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    stateProvince: z.string().optional(),
    postalCode: z.string().min(1),
    countryCode: z.string().length(2),
    phone: z.string().min(5),
  }),
  billingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    stateProvince: z.string().optional(),
    postalCode: z.string().min(1),
    countryCode: z.string().length(2),
    phone: z.string().min(5),
  }),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;

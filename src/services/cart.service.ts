import { prisma } from '@/lib/prisma';

export class CartService {
  static async getCartBySessionToken(sessionToken: string) {
    return prisma.cart.findUnique({
      where: { sessionToken },
      include: {
        cartItems: {
          include: {
            variant: {
              include: {
                product: {
                  include: { images: true },
                },
              },
            },
          },
        },
      },
    });
  }
}

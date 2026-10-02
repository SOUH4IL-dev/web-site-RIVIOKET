import { prisma } from '@/lib/prisma';

export class OrderService {
  static async getOrderByNumber(orderNumber: string) {
    return prisma.order.findUnique({
      where: { orderNumber },
      include: {
        orderItems: true,
        payments: true,
      },
    });
  }
}

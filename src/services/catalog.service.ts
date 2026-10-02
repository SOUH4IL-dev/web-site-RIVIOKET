import { prisma } from '@/lib/prisma';

export class CatalogService {
  static async getCategories() {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  static async getFeaturedProducts() {
    return prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        variants: true,
      },
      take: 8,
    });
  }
}

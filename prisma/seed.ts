import { PrismaClient } from '../src/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create users
    console.log('Creating users...');
    const adminPassword = await hash('Admin123!', 10);
    const userPassword = await hash('User123!', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const user = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
      },
    });

    console.log(`Created users: ${admin.id}, ${user.id}`);

    // Create categories
    console.log('Creating categories...');
    const tshirtCategory = await prisma.category.upsert({
      where: { slug: 't-shirts' },
      update: {},
      create: {
        name: 'T-shirts',
        description: 'Comfortable and stylish t-shirts for all occasions',
        slug: 't-shirts',
        image: '/images/c-tshirts.jpg',
        featured: true,
      },
    });

    const jeansCategory = await prisma.category.upsert({
      where: { slug: 'jeans' },
      update: {},
      create: {
        name: 'Jeans',
        description: 'Durable and fashionable jeans for everyday wear',
        slug: 'jeans',
        image: '/images/c-jeans.jpg',
        featured: true,
      },
    });

    const shoesCategory = await prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        name: 'Shoes',
        description: 'Stylish and comfortable shoes for all occasions',
        slug: 'shoes',
        image: '/images/c-shoes.jpg',
        featured: true,
      },
    });

    console.log(`Created categories: ${tshirtCategory.id}, ${jeansCategory.id}, ${shoesCategory.id}`);

    // Create products
    console.log('Creating products...');

    // T-shirt products
    const tshirt1 = await prisma.product.upsert({
      where: { slug: 'classic-white-tshirt' },
      update: {},
      create: {
        id: 'prod_tshirt_01',
        name: 'Classic White T-shirt',
        description: 'A timeless white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.',
        price: 29.99,
        images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
        stock: 100,
        sku: 'TS-001',
        slug: 'classic-white-tshirt',
        featured: true,
        categoryId: tshirtCategory.id,
      },
    });

    // Add second t-shirt product
    const tshirt2 = await prisma.product.upsert({
      where: { slug: 'graphic-print-tshirt' },
      update: {},
      create: {
        id: 'prod_tshirt_02',
        name: 'Graphic Print T-shirt',
        description: 'Express your style with this unique graphic print t-shirt. Made from soft, breathable fabric for all-day comfort.',
        price: 34.99,
        images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
        stock: 75,
        sku: 'TS-002',
        slug: 'graphic-print-tshirt',
        featured: false,
        categoryId: tshirtCategory.id,
      },
    });

    // Jeans products
    const jeans1 = await prisma.product.upsert({
      where: { slug: 'slim-fit-blue-jeans' },
      update: {},
      create: {
        id: 'prod_jeans_01',
        name: 'Slim Fit Blue Jeans',
        description: 'Classic slim fit jeans in a versatile blue wash. Made from premium denim with just the right amount of stretch for comfort.',
        price: 59.99,
        images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
        stock: 50,
        sku: 'JN-001',
        slug: 'slim-fit-blue-jeans',
        featured: true,
        categoryId: jeansCategory.id,
      },
    });

    // Add second jeans product
    const jeans2 = await prisma.product.upsert({
      where: { slug: 'distressed-black-jeans' },
      update: {},
      create: {
        id: 'prod_jeans_02',
        name: 'Distressed Black Jeans',
        description: 'Trendy distressed black jeans with a modern fit. Perfect for creating an edgy, casual look.',
        price: 64.99,
        images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
        stock: 40,
        sku: 'JN-002',
        slug: 'distressed-black-jeans',
        featured: false,
        categoryId: jeansCategory.id,
      },
    });

    // Shoes products
    // Add first shoes product
    const shoes1 = await prisma.product.upsert({
      where: { slug: 'classic-white-sneakers' },
      update: {},
      create: {
        id: 'prod_shoes_01',
        name: 'Classic White Sneakers',
        description: 'Timeless white sneakers that go with everything. Features cushioned insoles and durable outsoles for all-day comfort.',
        price: 79.99,
        images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
        stock: 60,
        sku: 'SH-001',
        slug: 'classic-white-sneakers',
        featured: true,
        categoryId: shoesCategory.id,
      },
    });

    // Add second shoes product
    const shoes2 = await prisma.product.upsert({
      where: { slug: 'casual-brown-loafers' },
      update: {},
      create: {
        id: 'prod_shoes_02',
        name: 'Casual Brown Loafers',
        description: 'Versatile brown loafers crafted from premium leather. Perfect for both casual and semi-formal occasions.',
        price: 89.99,
        images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
        stock: 35,
        sku: 'SH-002',
        slug: 'casual-brown-loafers',
        featured: false,
        categoryId: shoesCategory.id,
      },
    });

    console.log('Created products for each category');

    // Add some reviews
    console.log('Creating reviews...');
    // Review for tshirt1
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: tshirt1.id } },
      update: {},
      create: {
        userId: user.id,
        productId: tshirt1.id,
        rating: 5,
        comment: 'Great quality t-shirt! Very comfortable and fits perfectly.',
      },
    });

    // Review for tshirt2
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: tshirt2.id } },
      update: {},
      create: {
        userId: user.id,
        productId: tshirt2.id,
        rating: 4,
        comment: 'Nice design but the fabric could be better. Still a good purchase.',
      },
    });

    // Review for jeans1
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: jeans1.id } },
      update: {},
      create: {
        userId: user.id,
        productId: jeans1.id,
        rating: 4,
        comment: 'Good quality jeans, slightly tight but overall satisfied.',
      },
    });
    
    // Review for jeans2
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: jeans2.id } },
      update: {},
      create: {
        userId: user.id,
        productId: jeans2.id,
        rating: 5,
        comment: 'These distressed jeans look amazing! Perfect fit and very stylish.',
      },
    });
    
    // Review for shoes1
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: shoes1.id } },
      update: {},
      create: {
        userId: user.id,
        productId: shoes1.id,
        rating: 5,
        comment: 'These sneakers are so comfortable! They go with everything in my wardrobe.',
      },
    });
    
    // Review for shoes2
    await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: shoes2.id } },
      update: {},
      create: {
        userId: user.id,
        productId: shoes2.id,
        rating: 4,
        comment: 'Great quality loafers. The leather is premium and they look very elegant.',
      },
    });

    console.log('Database seeding completed successfully! 🎉');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

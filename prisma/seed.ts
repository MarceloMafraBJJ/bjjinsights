const { PrismaClient } = require("@prisma/client");
const { categories } = require("@/constants/index");
const prisma = new PrismaClient();

async function seedCategories() {
  //await prisma.category.deleteMany({});

  for (const categoryData of categories) {
    const { slug, title, subcategories } = categoryData;

    const category = await prisma.category.create({
      data: {
        slug,
        title,
        subcategories: {
          create: subcategories.map(
            (subcategory: { slug: string; title: string }) => ({
              slug: subcategory.slug,
              title: subcategory.title,
            }),
          ),
        },
      },
    });
    console.log(`Created category: ${category.title}`);
  }
}

seedCategories()
  .catch((error) => {
    console.error("Error seeding categories:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

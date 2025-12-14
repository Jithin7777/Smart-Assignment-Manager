import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; 

console.log("DATABASE_URL check:", process.env.DATABASE_URL ? "Loaded" : "NOT Loaded");

async function main() {
  console.log(" Starting seed...");

  const teacherPassword = await bcrypt.hash("teacher123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // Teacher
  await prisma.user.upsert({
    where: { email: "teacher@example.com" },
    update: {},
    create: {
      name: "John Teacher",
      email: "teacher@example.com",
      password: teacherPassword,
      role: "TEACHER",
    },
  });

  // Students
  await prisma.user.upsert({
    where: { email: "student1@example.com" },
    update: {},
    create: {
      name: "Alice Student",
      email: "student1@example.com",
      password: studentPassword,
      role: "STUDENT",
    },
  });

  await prisma.user.upsert({
    where: { email: "student2@example.com" },
    update: {},
    create: {
      name: "Bob Student",
      email: "student2@example.com",
      password: studentPassword,
      role: "STUDENT",
    },
  });

  console.log(" Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(" Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

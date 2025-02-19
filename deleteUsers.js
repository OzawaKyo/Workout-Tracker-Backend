import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAllUsers = async () => {
    try {
        await prisma.user.deleteMany(); // Deletes all users
        console.log("All test users deleted successfully.");
    } catch (error) {
        console.error("Error deleting users:", error);
    } finally {
        await prisma.$disconnect();
    }
};

deleteAllUsers();

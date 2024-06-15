import { prismaClient } from "../src/application/database.js";
import bcript from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({ where: { username: "test" } });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcript.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({ where: { username: "test" } });
};

export const removeAllTestContact = async () => {
  return prismaClient.contact.deleteMany({ where: { username: "test" } });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@pzn.com",
      phone: "082220890338",
    },
  });
};

export const getTesContact = async () => {
  return prismaClient.contact.findFirst({ where: { username: "test" } });
};

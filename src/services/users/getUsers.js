import { PrismaClient } from '@prisma/client';

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();

  let whereInput = {};

  if (username) {
    whereInput = { username: username };
  } else if (email) {
    whereInput = { email: email };
  }

  const users = await prisma.user.findMany({
    where: whereInput,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  if (users.length > 0) {
    return users;
  }

  return { message: 'No users found with the provided criteria.' };
};

export default getUsers;

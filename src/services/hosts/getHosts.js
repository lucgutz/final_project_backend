import { PrismaClient } from '@prisma/client';

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  if (name) {
    const hosts = await prisma.host.findMany({
      where: {
        name: name,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });

    if (hosts.length > 0) {
      return hosts;
    } else {
      return { message: `No hosts found with the name "${name}"` };
    }
  } else {
    const hosts = await prisma.host.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });

    return hosts;
  }
};

export default getHosts;

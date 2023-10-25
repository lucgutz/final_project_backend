import { PrismaClient } from '@prisma/client';

const getBookings = async (userId) => {
  const prisma = new PrismaClient();

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) {
      return { message: `User with userId "${userId}" was not found.` };
    }
  }

  const bookings = await prisma.booking.findMany({
    where: userId ? { userId: userId } : {},
  });

  return bookings;
};

export default getBookings;

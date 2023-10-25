import { PrismaClient } from '@prisma/client';

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  const query = {};

  if (location) {
    query.location = location;
  }

  if (pricePerNight) {
    query.pricePerNight = +pricePerNight;
  }

  if (amenities) {
    query.amenities = {
      some: {
        amenity: {
          name: amenities,
        },
      },
    };
  }

  const properties = await prisma.property.findMany({
    where: query,
  });

  return properties;
};

export default getProperties;

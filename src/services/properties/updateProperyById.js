import { PrismaClient } from '@prisma/client';

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const { hostId, ...rest } = updatedProperty;

  const propertyExists = await prisma.property.findUnique({
    where: { id },
  });

  if (!propertyExists) {
    return null;
  }

  const property = await prisma.property.update({
    where: { id },
    data: {
      ...rest,
      host: hostId
        ? {
            connect: { id: hostId },
          }
        : undefined,
    },
  });

  return property;
};

export default updatePropertyById;

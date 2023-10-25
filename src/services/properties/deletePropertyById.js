import { PrismaClient } from '@prisma/client';

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  await prisma.property.delete({
    where: { id },
  });

  return id;
};

export default deletePropertyById;

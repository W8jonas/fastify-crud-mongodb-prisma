import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

async function routes(fastify: FastifyInstance) {
  const prisma = new PrismaClient();

  fastify.post("/user", async (request, reply) => {
    const { name, email } = request.body as any;

    const result = await prisma.user.create({
      data: {
        name, email,
      },
    });
    
    return result;
  });

  fastify.get("/user", async (request, reply) => {
    const result = await prisma.user.findMany();

    if (result.length === 0) {
      throw new Error("No users found");
    }
    return result;
  });

  fastify.get("/animals/:animalId", async (request, reply) => {
    const { animalId } = request.params as any;

    if (!animalId) {
      throw new Error("No animalId");
    }

    const result = await prisma.animals.findUnique({
      where: {
        id: animalId,
      },
    });

    if (!result) {
      throw new Error("No animal found");
    }

    return result;
  });
}

export default routes;

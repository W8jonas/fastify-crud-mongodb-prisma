import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

async function routes(fastify: FastifyInstance) {
  const prisma = new PrismaClient();

  fastify.post("/animals", async (request, reply) => {
    const { animal } = request.body as any;

    const result = await prisma.animals.create({
      data: {
        animal: animal,
      },
    });
    return result;
  });

  fastify.get("/animals", async (request, reply) => {
    const result = await prisma.animals.findMany();

    if (result.length === 0) {
      throw new Error("No animals found");
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

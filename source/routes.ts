import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

async function routes(fastify: FastifyInstance) {
  const prisma = new PrismaClient();

  fastify.post("/user", async (request, reply) => {

    const userSchema = z.object({
      name: z.string(),
      email: z.string().email()
    })

    const { name, email } = userSchema.parse(request.body)

    const result = await prisma.user.create({
      data: {
        name, email,
      },
    });
    
    return reply.status(201).send(result);
  });

  fastify.put("/user/:userId", async (request, reply) => {

    const userSchema = z.object({
      name: z.string(),
      email: z.string().email()
    })
    const { name, email } = userSchema.parse(request.body)

    const userIdSchema = z.object({
      userId: z.string()
    })
    const { userId } = userIdSchema.parse(request.params)
    
    const result = await prisma.user.update({
      data: {
        name, email,
      },
      where: {
        id: userId
      }
    });
    
    return reply.status(201).send(result);
  });

  fastify.patch("/user/:userId", async (request, reply) => {

    const userSchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional()
    })
    const { name, email } = userSchema.parse(request.body)

    const userIdSchema = z.object({
      userId: z.string()
    })
    const { userId } = userIdSchema.parse(request.params)
    
    const result = await prisma.user.update({
      data: {
        name, email,
      },
      where: {
        id: userId
      }
    });
    
    return reply.status(201).send(result);
  });


  fastify.get("/user", async (request, reply) => {
    const result = await prisma.user.findMany();

    if (result.length === 0) {
      throw new Error("No users found");
    }
    return result;
  });

  
  fastify.get("/user/:userId", async (request, reply) => {
    
    const userIdSchema = z.object({
      userId: z.string()
    })

    const { userId } = userIdSchema.parse(request.params)

    if (!userId) {
      throw new Error("No userId");
    }

    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) {
      throw new Error("No user found");
    }

    return result;
  });
}

export default routes;

import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import redis from 'ioredis';


async function routes(fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const redisClient = redis.createClient();


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
    
    const redisResponse = await redisClient.incr('total_users')
    
    return reply.status(201).send({newUser: result, totalUsers: redisResponse});
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


  fastify.delete("/user/:userId", async (request, reply) => {

    const userIdSchema = z.object({
      userId: z.string()
    })
    const { userId } = userIdSchema.parse(request.params)
    
    await prisma.user.delete({
      where: {
        id: userId
      }
    });
    
    const redisResponse = await redisClient.decr('total_users')
    
    return reply.status(200).send({message: 'User deleted successfully', totalUsers: redisResponse});
  });


  fastify.get("/user", async (request, reply) => {
    const result = await prisma.user.findMany();

    if (result.length === 0) {
      throw new Error("No users found");
    }

    const redisResponse = await redisClient.get('total_users')
    
    return reply.status(201).send({users: result, totalUsers: redisResponse});
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

    const redisResponse = await redisClient.get('total_users')
    
    return reply.status(201).send({user: result, totalUsers: redisResponse});
  });
}

export default routes;

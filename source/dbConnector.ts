import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyInstance } from "fastify";


async function dbConnectorInstance(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: process.env.MONGODB_DATABASE_URL,
  });
}

export const dbConnector = fastifyPlugin(dbConnectorInstance);

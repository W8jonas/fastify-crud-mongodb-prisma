import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyInstance } from "fastify";
import { env } from "./env";


async function dbConnectorInstance(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: env.MONGODB_DATABASE_URL,
  });
}

export const dbConnector = fastifyPlugin(dbConnectorInstance);

import fastify from "fastify";
import routes from "./routes";

const fastifyInstance = fastify({
    logger: true,
});

fastifyInstance.register(routes);

export { fastifyInstance }

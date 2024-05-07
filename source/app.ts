import fastify from "fastify";
import routes from "./routes";

export function createFastifyInstance() {
    const fastifyInstance = fastify({
        logger: true,
    });

    fastifyInstance.register(routes);

    return fastifyInstance;
}

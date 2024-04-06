import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  const collection = fastify?.mongo?.db?.collection("animals");

  if (!collection) return 

  const animalBodyJsonSchema = {
    type: "object",
    required: ["animal"],
    properties: {
      animal: { type: "string" },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/animals", { schema }, async (request, reply) => {
    
    const {animal} = request.body as any

    const result = await collection.insertOne({ animal: animal  || '' });
    return result;
  });

}

export default routes;

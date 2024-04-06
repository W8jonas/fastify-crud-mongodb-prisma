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


  fastify.get("/animals", async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error("No animals found");
    }
    return result;
  });

  
  fastify.get("/animals/:animal", async (request, reply) => {

    const {animal} = request.body as any
 
    const result = await collection.findOne({ animal: animal });

    if (!result) {
      throw new Error("No animal found");
    }

    return result;
  });

}

export default routes;

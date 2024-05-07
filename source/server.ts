import 'dotenv/config'
import { createFastifyInstance } from './app';

const fastifyInstance = createFastifyInstance()

fastifyInstance.listen({ port: 3333 }, (err, address) => {
  console.log("listening on port ", address);
  if (err) {
    console.error('Error on server:', err);
    process.exit(1);
  }
})

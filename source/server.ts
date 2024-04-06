import 'dotenv/config'

import fastify from "fastify";
import {dbConnector} from "./dbConnector";
import routes from "./routes";

const app = fastify({
  logger: true,
});

app.register(dbConnector);
app.register(routes);

app.listen({ port: 3333 }).then(() => {
  console.log("listening on port 3333");
});

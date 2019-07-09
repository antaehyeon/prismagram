require("dotenv").config();

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "src/schema.js";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev")); // 미들웨어 추가

server.start({ port: PORT }, () => console.log(`✅ Server Running On Port http://localhost:${PORT}`));

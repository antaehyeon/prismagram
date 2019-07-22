import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "src/schema.js";
// 이런식으로 import 되어야 함
// server.js 에서는 passport.js 파일이 무언가를 받아서 사용할 필요가 없기 때문에 (= 무슨일이 일어나는지 알 필요가 없음)
import "src/passport.js";

console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev")); // 미들웨어 추가
server.express.use(passport.authenticate("jwt")); // 경로를 미들웨어로 보호하고 싶을 때 사용

server.start({ port: PORT }, () => console.log(`✅ Server Running On Port http://localhost:${PORT}`));

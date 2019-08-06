import "src/env.js"; // 이런식으로 임포트하면 전체적으로 사용가능
import "src/passport.js";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "generated/prisma-client";
import { authenticateJwt } from "src/passport.js";
import { sendSecretMail } from "src/utils.js";
import logger from "morgan";
import schema from "src/schema.js";
// 이런식으로 import 되어야 함
// server.js 에서는 passport.js 파일이 무언가를 받아서 사용할 필요가 없기 때문에 (= 무슨일이 일어나는지 알 필요가 없음)

// console.log(process.env.PORT);
// console.log("[SERVER] prisma", prisma);

// sendSecretMail("ansunghoo7@gmail.com", "123");

const PORT = process.env.PORT || 4000;

// context는 resolver 사이에서 정보를 공유할 때 사용 (모든 resolver 에 정보를 전달하기 위해 context 를 사용할 수 있음)
// context 안에 request 존재 이유
/*
    1. 서버에 전달되는 모든 요청은 authenticateJwt 를 통과한다
    2. authenticateJwt 함수에서는 [passport.authenticate('jwt') = 콜백함수] 를 실행
    2-1. 내부의 passport.authenticate('jwt') 는 (req, res, next)를 받아서 실행되게 되는데 (콜백함수임, 지금 실행안됨)
    3. 이후 줄의 passport.use(new Strategy(jwtOptions, verifyUser)) 가 실행됨
    3-1. 해당 함수는 new Strategy 를 활용해서 jwt 토큰을 추출함
    4. 토큰이 추출되면 verifyUser(payload, done) 와 payload 를 함께 실행
    5. payload는 토큰이 해석된 id를 받아서 primsa를 통해 해당 user를 찾아서 리턴함
    6. 이제 2번의 콜백함수가 실행되면서, 사용자가 있으면 [if (user) req.user = user] 사용자를 req(est)에 추가
    7. 여기서(server.js) context에 request를 context 로 전부 뿌림
    
    -> 모든 resolver 에서 context 를 통해 request 를 받을 수 있음
    -> request 안에서 user를 확인할 수 있음
*/
const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, prisma }) });

server.express.use(logger("dev")); // 미들웨어 추가
// server.express.use(passport.authenticate("jwt")); // 경로를 미들웨어로 보호하고 싶을 때 사용
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`✅ Server Running On Port http://localhost:${PORT}`));

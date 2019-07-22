import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { primsa } from "generated/prisma-client";

// passport 는 인증 관련된 모든 일을 담당
// jwt 토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 저장(serialize)한다
// 자동으로 토큰을 가져와서 express의 request에 붙여줌 (= 토큰을 가져와서 해독한 후에 사용자 객체를 request에 추가)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt를 찾는 역할
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(error, false);
  }
};

// 이런식으로 Passport 의 원하는 Strategy 를 사용하면 된다.
// 해당 Strategy 가 모든 작업을 한 후에 결과물을 payload 에 전달한다.
passport.use(new Strategy(jwtOptions, verifyUser));

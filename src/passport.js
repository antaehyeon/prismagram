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

// 사용자를 받아온다
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(error, false);
  }
};

// sessions: false -> passport 에 어떤것도 입력되지 않게하기 위함
// 안쪽은 함수(graphQL 함수)를 리턴 -> 리턴된 함수를 (req, res, next)로 실행해주는 것
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) req.user = user; // 사용자가 존재하면 사용자 정보를 req 객체에 붙여줌, express 에서는 미들웨어를 지나 라우트가 실행됨
    next();
  })(req, res, next);

// 이런식으로 Passport 의 원하는 Strategy 를 사용하면 된다.
// 해당 Strategy 가 모든 작업을 한 후에 결과물을 payload 에 전달한다.
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

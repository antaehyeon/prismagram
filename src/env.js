// .env 를 프로젝트에 뿌려주기 위해 작성된 JS 코드
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

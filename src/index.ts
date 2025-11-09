import { Elysia } from "elysia";
import userRouter from "./module/user/router";
import roleRouter from "./module/role/router";
import eventRouter from "./module/event/router";
import oauthRouter from "./module/oauth/router";
import fileRouter from "./module/file/router";
import profileRouter from "./module/profile/router";

const app = new Elysia({
  prefix: '/api/v1'
})
.get("/", () => "Hello Elysia")
.use(roleRouter).use(userRouter).use(eventRouter).use(oauthRouter).use(fileRouter).use(profileRouter).listen(process.env.PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

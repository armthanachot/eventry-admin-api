import { Elysia } from "elysia";
import userRouter from "./module/user/router";
import roleRouter from "./module/role/router";
import eventRouter from "./module/event/router";
const app = new Elysia({
  prefix: '/api/v1'
}).get("/", () => "Hello Elysia").use(roleRouter).use(userRouter).use(eventRouter).listen(process.env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

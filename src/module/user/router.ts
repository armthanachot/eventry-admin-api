import { Elysia } from "elysia"
import UserService from "./service"
import { CreateUser } from "./model/request"
import { CreateUserResponse, FindAllUsersResponse } from "./model/response"

const userRouter = new Elysia({
    prefix: '/users'
})
    .post('/', async ({ body }) => {
        return await UserService.createUser(body)
    },{
        body: CreateUser,
        response: CreateUserResponse
    })
    .get('/', async () => {
        return await UserService.findAllUsers()
    },{
        response: FindAllUsersResponse
    })
export default userRouter
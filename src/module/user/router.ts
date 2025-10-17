import { Elysia } from "elysia"
import UserService from "./service"
import { CreateUser, UpdateUser, UserIdParam } from "./model/request"
import { CreateUserResponse, FindAllUsersResponse, FindUserByIdResponse, UpdateUserResponse } from "./model/response"

const userRouter = new Elysia({
    prefix: '/users'
})
    .post('/', async ({ body }) => {
        return await UserService.createUser(body)
    }, {
        body: CreateUser,
        response: CreateUserResponse
    })
    .get('/', async () => {
        return await UserService.findAllUsers()
    }, {
        response: FindAllUsersResponse
    })
    .get('/:id', async ({ params }) => {
        return await UserService.findUserById(params.id)
    }, {
        params: UserIdParam,
        response: FindUserByIdResponse
    })
    .patch('/:id', async ({ params, body }) => {
        return await UserService.updateUser(params.id, body)
    }, {
        params: UserIdParam,
        body: UpdateUser,
        response: UpdateUserResponse
    })
export default userRouter
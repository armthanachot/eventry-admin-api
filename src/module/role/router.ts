import { Elysia } from "elysia"
import RoleService from "./service"
import { CreateRole } from "./model/request"
import { CreateRoleResponse, FindAllRolesResponse } from "./model/response"

const roleRouter = new Elysia({
    prefix: '/roles'
})
    .post('/', async ({ body }) => {
        return await RoleService.createRole(body)
    },{
        body: CreateRole,
        response: CreateRoleResponse
    })
    .get('/', async () => {
        return await RoleService.findAllRoles()
    },{
        response: FindAllRolesResponse
    })

export default roleRouter
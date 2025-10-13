import { desc } from "drizzle-orm"
import db from "../../pkg/db/conn"
import { roles } from "../../pkg/db/schema"
import { TCreateRole } from "./model/request"
import { TCreateRoleResponse, TFindAllRolesResponse } from "./model/response"

class RoleService {
    async createRole(payload: TCreateRole): Promise<TCreateRoleResponse> {
        const [role] = await db.insert(roles).values(payload).returning()
        return {
            data: {
                id: role.id,
                name: role.name
            },
            success: true,
            message: "Role created successfully"
        }
    }

    async findAllRoles(): Promise<TFindAllRolesResponse> {
        const data = await db.select().from(roles).orderBy(desc(roles.name))
        return {
            data: data.map((role) => ({
                id: role.id,
                name: role.name
            })),
            success: true,
            message: "Roles fetched successfully"
        }
    }
}

export default new RoleService()
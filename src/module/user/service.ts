import { desc, eq } from "drizzle-orm";
import db from "../../pkg/db/conn";
import { roles, users } from "../../pkg/db/schema";
import { encrypt } from "../../pkg/util/hash";
import { TCreateUser } from "./model/request";
import { TCreateUserResponse, TFindAllUsersResponse } from "./model/response";

class UserService {
    async createUser(payload: TCreateUser): Promise<TCreateUserResponse> {
        payload.password = payload.password ? await encrypt(payload.password) : undefined
        const [user] = await db.insert(users).values(payload).returning()
        return {
            data: {
                id: user.id,
                email: user.email || "",
            },
            success: true,
            message: "User created successfully"
        }
    }

    async findAllUsers(): Promise<TFindAllUsersResponse> {
        const data = await db.select().from(users).orderBy(desc(users.email)).innerJoin(roles, eq(users.roleId, roles.id))
        return {
            data: data.map((user) => ({
                id: user.users.id,
                email: user.users.email || "",
                role: user.roles.name
            })),
            success: true,
            message: "Users fetched successfully"
        }
    }
}

export default new UserService;
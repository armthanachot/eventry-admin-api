import { desc, eq } from "drizzle-orm";
import db from "../../pkg/db/conn";
import { roles, users } from "../../pkg/db/schema";
import { comparePassword, encrypt } from "../../pkg/util/hash";
import { TCreateUser, TUpdateUser } from "./model/request";
import { TCreateUserResponse, TFindAllUsersResponse, TFindUserByIdResponse, TUpdateUserResponse } from "./model/response";
import { Role } from "../../pkg/constant/role";

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

    async findUserById(id: string): Promise<TFindUserByIdResponse> {
        const [data] = await db.select().from(users).where(eq(users.id, id)).innerJoin(roles, eq(users.roleId, roles.id))
        if (!data) {
            return {
                success: false,
                message: "User not found"
            }
        }
        return {
            data: {
                id: data.users.id,
                email: data.users.email || "",
                role: data.roles.name as Role
            },
            success: true,
            message: "User fetched successfully"
        }
    }

    async updateUser(id: string, payload: TUpdateUser): Promise<TUpdateUserResponse> {
        const [user] = await db.select().from(users).where(eq(users.id, id))
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        if (!comparePassword(payload.oldPassword, user.password || "")) {
            return {
                success: false,
                message: "Old password is incorrect"
            }
        }

        await db.update(users).set({
            password: encrypt(payload.newPassword)
        }).where(eq(users.id, id)).returning()

        return {
            data: {
                id: user.id,
                email: user.email || "",
            },
            success: true,
            message: "User updated successfully"
        }
    }
}

export default new UserService;
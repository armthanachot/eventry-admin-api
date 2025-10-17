import { t, Static } from "elysia"
import { response } from "../../../model/response"
export const CreateUserResponse = response(t.Object({
    id: t.String(),
    email: t.String()
}))

export const FindAllUsersResponse = response(t.Array(t.Object({
    id: t.String(),
    email: t.String(),
    role: t.String()
})))

export const FindUserByIdResponse = response(t.Object({
    id: t.String(),
    email: t.String(),
    role: t.String()
}))

export const UpdateUserResponse = response(t.Object({
    id: t.String(),
    email: t.String(),
}))

export type TCreateUserResponse = Static<typeof CreateUserResponse>
export type TFindAllUsersResponse = Static<typeof FindAllUsersResponse>
export type TFindUserByIdResponse = Static<typeof FindUserByIdResponse>
export type TUpdateUserResponse = Static<typeof UpdateUserResponse>
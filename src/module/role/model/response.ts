import { t, Static } from "elysia"
import { response } from "../../../model/response"

export const CreateRoleResponse = response(t.Object({
    id: t.String(),
    name: t.String()
}))

export const FindAllRolesResponse = response(t.Array(t.Object({
    id: t.String(),
    name: t.String()
})))
export type TCreateRoleResponse = Static<typeof CreateRoleResponse>
export type TFindAllRolesResponse = Static<typeof FindAllRolesResponse>
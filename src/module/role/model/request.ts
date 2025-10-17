import {t, Static} from "elysia"
import { Role } from "../../../pkg/constant/role"

export const CreateRole = t.Object({
    name: t.Enum(Role)
})

export type TCreateRole = Static<typeof CreateRole>
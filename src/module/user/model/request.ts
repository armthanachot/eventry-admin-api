import { t, Static } from "elysia"
import { PASSWORD_REGEX } from "../../../pkg/constant/regex"

export const CreateUser = t.Object({
    roleId: t.String({ format: 'uuid' }),
    provider: t.Enum({
        APP: 'APP',
        FACEBOOK: 'FACEBOOK',
        GOOGLE: 'GOOGLE'
    }),
    providerUserId: t.Optional(t.String()),
    email: t.String(),
    password: t.Optional(t.String({ regex: PASSWORD_REGEX }))
})

export const UpdateUser = t.Object({
    oldPassword: t.String({ regex: PASSWORD_REGEX }),
    newPassword: t.String({ regex: PASSWORD_REGEX })
})

export const UserIdParam = t.Object({
    id: t.String({ format: 'uuid' })
})


export type TCreateUser = Static<typeof CreateUser>
export type TUpdateUser = Static<typeof UpdateUser>
export type TUserIdParam = Static<typeof UserIdParam>
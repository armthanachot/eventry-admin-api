import { t, Static } from "elysia"

export const CreateUser = t.Object({
    roleId: t.String({ format: 'uuid' }),
    provider: t.Enum({
        APP: 'APP',
        FACEBOOK: 'FACEBOOK',
        GOOGLE: 'GOOGLE'
    }),
    providerUserId: t.Optional(t.String()),
    email: t.String(),
    password: t.Optional(t.String({ regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ }))
})

export type TCreateUser = Static<typeof CreateUser>
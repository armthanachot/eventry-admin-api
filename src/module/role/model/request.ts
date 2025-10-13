import {t, Static} from "elysia"

export const CreateRole = t.Object({
    name: t.Enum({
        ORGANIZER: 'ORGANIZER',
        PARTICIPANTS: 'PARTICIPANTS',
        ADMIN: 'ADMIN'
    })
})

export type TCreateRole = Static<typeof CreateRole>
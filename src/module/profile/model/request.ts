import {t, Static} from "elysia"

const CreateProfile = t.Object({
    fullName: t.String(),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
})

type TCreateProfile = Static<typeof CreateProfile>

export { CreateProfile, TCreateProfile }


import {t, Static} from "elysia"

const CreateProfile = t.Object({
    fullName: t.String(),
    userId: t.String({format:'uuid'}),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
})

const UserIdParam = t.Object({
    userId: t.String({format:'uuid'}),
})

const UpdateProfile = t.Object({
    fullName: t.String(),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
})

const ProfileIdParam = t.Object({
    profileId: t.String({format:'uuid'}),
})

type TCreateProfile = Static<typeof CreateProfile>
type TUserIdParam = Static<typeof UserIdParam>
type TUpdateProfile = Static<typeof UpdateProfile>
type TProfileIdParam = Static<typeof ProfileIdParam>

export { CreateProfile, TCreateProfile, UserIdParam, TUserIdParam, UpdateProfile, TUpdateProfile, ProfileIdParam, TProfileIdParam }


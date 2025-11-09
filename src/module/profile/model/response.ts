import { Static, t } from "elysia";
import { response } from "../../../model/response";

export const CreateUserProfileResponse = response(t.Object({
    profileId: t.String(),
    fullName: t.String(),
    userId: t.String({format:'uuid'}),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
}))

export const GetUserProfileResponse = response(t.Object({
    profileId: t.String(),
    fullName: t.String(),
    userId: t.String({format:'uuid'}),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
}))

export const UpdateUserProfileResponse = response(t.Object({
    profileId: t.String(),
    fullName: t.String(),
    userId: t.String({format:'uuid'}),
    displayName: t.String(),
    phone: t.String(),
    avatarUrl: t.String(),
}))

export type TCreateUserProfileResponse = Static<typeof CreateUserProfileResponse>
export type TGetUserProfileResponse = Static<typeof GetUserProfileResponse>
export type TUpdateUserProfileResponse = Static<typeof UpdateUserProfileResponse>
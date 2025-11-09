import { t, Static } from "elysia"
import { Provider } from "../../../pkg/constant/provider"

export const CreateUser = t.Object({
    provider: t.Enum(Provider),
    providerUserId: t.Optional(t.String()),
    email: t.String(),
})

export type TGetUserInfo = {
    accessToken: string
    provider: Provider
    scopeFieldName: string
    scopes: string[]
}

export type TCreateUser = Static<typeof CreateUser>


export const GoogleRefreshToken = t.Object({
    refreshToken: t.String()
})

export type TGoogleRefreshToken = Static<typeof GoogleRefreshToken>
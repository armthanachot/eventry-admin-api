import { t, Static } from "elysia"
import { response } from "../../../model/response"
export const OAuthCallbackResponse = response(t.Object({
    userId: t.String(),
    name: t.String(),
    email: t.String({ format: "email" })
}))
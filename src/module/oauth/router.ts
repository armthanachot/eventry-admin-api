import { Elysia } from "elysia"
import { oauth2 } from "elysia-oauth2"
import OAuthService from "./service"
import { OAuthCallbackResponse } from "./model/response"

const oauthRouter = new Elysia({
    prefix: '/oauth'
}).state({
    facebookURL: {
        tokenInfo: `https://graph.facebook.com/debug_token`,
        userInfo: `https://graph.facebook.com/me`
    },
    googleURL: {
        tokenInfo: `https://www.googleapis.com/oauth2/v3/tokeninfo`,
        userInfo: `https://www.googleapis.com/oauth2/v3/userinfo`
    },
}).use(
    oauth2({
        Facebook: [process.env.FACEBOOK_CLIENT_ID!, process.env.FACEBOOK_CLIENT_SECRET!, process.env.FACEBOOK_REDIRECT_URI!],
        Google: [process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URI!]
    }, {
        cookie: {
            // defaults
            secure: true,
            sameSite: "lax",
            path: "/",
            httpOnly: true,
            maxAge: 60 * 30, // 30 min
        },
    })
)
    .get('/facebook/auth', ({ oauth2 }) => oauth2.redirect("Facebook", ["email", "public_profile", "user_birthday"]))
    .get('/facebook/callback', async ({ oauth2 }) => await OAuthService.FacebookCallback(await oauth2.authorize("Facebook")), {
        // response: OAuthCallbackResponse
    }).get('/facebook/validate-token', async ({ headers, store }) => {
        try {
            const authorization = headers.authorization
            console.log(authorization);

            const [_, bearerToken] = authorization?.split(" ") || [];
            console.log({ bearerToken });

            const resp = await fetch(
                `${store.facebookURL.tokenInfo}?input_token=${bearerToken}&access_token=${process.env.FACEBOOK_APP_TOKEN}`
            );
            return {
                success: true,
                message: "Facebook token validated successfully",
                data: await resp.json()
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Facebook token validation failed",
                error: (error as Error).message
            }
        }
    })
    .get('/google/auth', ({ oauth2 }) => oauth2.redirect("Google", ["openid", "email", "profile"]))
    .get('/google/callback', async ({ oauth2 }) => await OAuthService.GoogleCallback(await oauth2.authorize("Google"))
        , {
            // response: OAuthCallbackResponse
        })
    .get('/google/validate-token', async ({ headers, store }) => {
        try {
            const authorization = headers.authorization
            console.log(authorization);

            const [_, bearerToken] = authorization?.split(" ") || [];
            const res = await fetch(`${store.googleURL.tokenInfo}?access_token=${bearerToken}`)

            return {
                success: true,
                message: "Google token validated successfully",
                data: await res.json()
            }
        } catch (error) {
            console.log(error);
        }
    })

export default oauthRouter
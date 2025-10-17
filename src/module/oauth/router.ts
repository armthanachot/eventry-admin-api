import { Elysia } from "elysia"
import { oauth2 } from "elysia-oauth2"
import * as arctic from "arctic";

const oauthRouter = new Elysia({
    prefix: '/oauth'
}).state({
    facebook: new arctic.Facebook(process.env.FACEBOOK_CLIENT_ID || '', process.env.FACEBOOK_CLIENT_SECRET || '', process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/v1/oauth/facebook/callback')
}).use(
    oauth2({
        Facebook: [process.env.FACEBOOK_CLIENT_ID || '', process.env.FACEBOOK_CLIENT_SECRET || '', process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/v1/oauth/facebook/callback']
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
    .get('/facebook/callback', async ({ oauth2 }) => {
        const tokens = await oauth2.authorize("Facebook")
        const accessToken = tokens.accessToken()

        const searchParams = new URLSearchParams();
        searchParams.set("access_token", accessToken);
        searchParams.set("fields", ["id", "name", "picture", "email"].join(","));
        const response = await fetch("https://graph.facebook.com/me" + "?" + searchParams.toString());
        const user = await response.json();
        return {
            success: true,
            message: "Facebook callback successful",
            data: {
                accessToken: accessToken,
                user: user
            }
        }
    }).get('/facebook/validate-token', async ({ headers, store }) => {
        try {
            const authorization = headers.authorization
            console.log(authorization);
            
            const [_, bearerToken] = authorization?.split(" ") || [];
            console.log({bearerToken});
            
            const resp = await fetch(
                `https://graph.facebook.com/debug_token?input_token=${bearerToken}&access_token=${process.env.FACEBOOK_APP_TOKEN}`
              );

              /**
               * 
               * {
                    data: {
                        error: {
                        code: 190,
                        message: "Invalid OAuth access token - Cannot parse access token",
                        },
                        is_valid: false,
                        scopes: [],
                    },
                    }
               */
              console.log(await resp.json()); 
              

            return {
                success: true,
                message: "Facebook token validated successfully",
                data: {
                }
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

export default oauthRouter
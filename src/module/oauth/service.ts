import { oauth2, OAuth2Tokens } from "elysia-oauth2"
import { TGetUserInfo } from "./model/request";
import { Provider } from "../../pkg/constant/provider";
import axios from "axios";

class OAuthService {
    async FacebookCallback(tokens: OAuth2Tokens) {
        const accessToken = tokens.accessToken()
        const userInfo = await this._getUserInfo({
            accessToken,
            provider: Provider.FACEBOOK,
            scopeFieldName: "fields",
            scopes: ["id", "name", "picture", "email"],
        })

        console.log(accessToken);
        console.log(JSON.stringify(userInfo, null, 2));
        console.log("expirde: ",tokens.accessTokenExpiresAt()?.toISOString()); //long live token
        return {
            success: true,
            message: "Facebook callback successful",
            data: userInfo
        }
    }

    async GoogleCallback(tokens: OAuth2Tokens) {
        const accessToken = tokens.accessToken()
        console.log("expirde: ",tokens.accessTokenExpiresAt()?.toISOString());
        
        const refreshToken = tokens.refreshToken()
        const userInfo = await this._getUserInfo({
            accessToken,
            provider: Provider.GOOGLE,
            scopeFieldName: "scope",
            scopes: ["openid", "email", "profile"]
        })

        return {
            success: true,
            message: "Google callback successful",
            data: {
                userInfo,
                accessToken,
                refreshToken
            }
        }
    }

    async GoogleRefreshToken(oldrefreshToken: string) {
    }

    private async _getUserInfo(payload: TGetUserInfo): Promise<Response> {
        const uri = payload.provider === Provider.FACEBOOK ? process.env.FACEBOOK_USER_INFO_URI! : (payload.provider === Provider.GOOGLE ? process.env.GOOGLE_USER_INFO_URI! : "")
        const searchParams = new URLSearchParams();
        searchParams.set("access_token", payload.accessToken);
        searchParams.set(payload.scopeFieldName, payload.scopes.join(","));
        const response = await fetch(`${uri}?${searchParams.toString()}`);
        return await response.json()
    }
}

export default new OAuthService()
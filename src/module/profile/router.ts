import Elysia from "elysia"
import ProfileService from "./service"
import { CreateProfile, ProfileIdParam, UpdateProfile, UserIdParam } from "./model/request"
import { CreateUserProfileResponse, GetUserProfileResponse, UpdateUserProfileResponse } from "./model/response"

const profileRouter = new Elysia({
    prefix: '/profiles'
})
    .post('/', async ({ body }) => {
        return await ProfileService.createProfile(body)
        }, {
        body: CreateProfile,
        response: CreateUserProfileResponse
    })
    .get('/:userId', async ({ params }) => {
        return await ProfileService.getProfileByUserId(params.userId)
    }, {
        params: UserIdParam,
        response: GetUserProfileResponse
    })
    .patch('/:profileId', async ({ params, body }) => {
        return await ProfileService.updateProfile(params.profileId, body)
    }, {
        params: ProfileIdParam,
        body: UpdateProfile,
        response: UpdateUserProfileResponse
    })
export default profileRouter
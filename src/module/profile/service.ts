import { eq } from "drizzle-orm";
import db from "../../pkg/db/conn";
import { userProfiles } from "../../pkg/db/schema";
import { TCreateProfile, TUpdateProfile } from "./model/request";
import { TCreateUserProfileResponse, TGetUserProfileResponse, TUpdateUserProfileResponse } from "./model/response";

class ProfileService {

    async createProfile(payload: TCreateProfile): Promise<TCreateUserProfileResponse> {
        try {

            const [profile] = await db.insert(userProfiles).values([{
                fullName: payload.fullName,
                displayName: payload.displayName,
                userId: payload.userId,
                phone: payload.phone,
                avatarUrl: payload.avatarUrl,
            }]).returning()
            return {
                success: true,
                message: "Profile created successfully",
                data: {
                    profileId: profile.id,
                    fullName: profile.fullName,
                    userId: profile.userId,
                    avatarUrl: profile.avatarUrl || "",
                    displayName: profile.displayName,
                    phone: profile.phone || "",
                }
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Failed to create profile",
            }
        }
    }

    async getProfileByUserId(userId: string): Promise<TGetUserProfileResponse> {
        try {
            const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId))
            if (!profile) {
                return {
                    success: false,
                    message: "Profile not found",
                }
            }
            return {
                success: true,
                message: "Profile fetched successfully",
                data: {
                    profileId: profile.id,
                    fullName: profile.fullName,
                    userId: profile.userId,
                    avatarUrl: profile.avatarUrl || "",
                    displayName: profile.displayName,
                    phone: profile.phone || "",
                }
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Failed to get profile",
            }
        }
    }

    async updateProfile(profileId: string, payload: TUpdateProfile): Promise<TUpdateUserProfileResponse> {
        try {
            const [profile] = await db.update(userProfiles).set(payload).where(eq(userProfiles.id, profileId)).returning()
            return {
                success: true,
                message: "Profile updated successfully",
                data: {
                    profileId: profile.id,
                    fullName: profile.fullName,
                    userId: profile.userId,
                    avatarUrl: profile.avatarUrl || "",
                    displayName: profile.displayName,
                    phone: profile.phone || "",
                }
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Failed to update profile",
            }
        }
    }
}

export default new ProfileService()
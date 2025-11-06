import { t, Static } from "elysia"

export const FileUploadRequest = t.Object({
    bucketName: t.String(),
    files: t.Files()
})

export type TFileUploadRequest = Static<typeof FileUploadRequest>
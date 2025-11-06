import { t, Static } from "elysia"
import { response } from "../../../model/response"

export const FileUploadResponse = response(t.Object({
    fileUrl: t.Array(t.String({ format: 'uri' })),
}))

export type TFileUploadResponse = Static<typeof FileUploadResponse>
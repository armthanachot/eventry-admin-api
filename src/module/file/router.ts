import { Elysia } from "elysia"
import FileService from "./service"
import { FileUploadRequest } from "./model/request"
import { FileUploadResponse } from "./model/response"

const fileRouter = new Elysia({
    prefix: '/files'
}).post('/upload', async ({ body }) => {
    return await FileService.uploadFile(body.bucketName, body.files)
}, {
    body: FileUploadRequest,
    response: FileUploadResponse
})

export default fileRouter
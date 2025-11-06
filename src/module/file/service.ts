import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { TFileUploadResponse } from './model/response';
import { v4 as uuidv4 } from 'uuid';
class FileService {
    private _s3 = new S3Client({
        forcePathStyle: true,
        region: process.env.SUPABASE_FILE_STORAGE_REGION!,
        endpoint: process.env.SUPABASE_FILE_STORAGE_URL!,
        credentials: {
            accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
            secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
        },
    })

    async uploadFile(bucketName: string, files: File[]): Promise<TFileUploadResponse> {
        try {

            const fileUrls: string[] = [];

            for (const file of files) {
                const fileBuffer = await file.arrayBuffer();
                const filename = `${uuidv4()}-${file.name}`
                await this._s3.send(new PutObjectCommand({
                    Bucket: bucketName,
                    Key: filename,
                    Body: new Uint8Array(fileBuffer),
                    ContentType: file.type,
                }))

                fileUrls.push(`${process.env.SUPABASE_FILE_STORAGE_PUBLIC_URL}/${bucketName}/${filename}`);
            }

            return {
                success: true,
                message: "File uploaded successfully",
                data: {
                    fileUrl: fileUrls
                }
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Failed to upload file",
            }
        }
    }
}

export default new FileService()
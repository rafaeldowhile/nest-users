import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileService {
  async uploadS3(dataBuffer: Buffer, filename: string, directory?: string) {
    const s3 = new S3();
    const newFilename = `${uuid()}-${filename}`;
    const newPath = path.join(directory, newFilename);

    const uploadedFile = await s3
      .upload({
        Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
        Body: dataBuffer,
        Key: newPath,
      })
      .promise();

    return {
      key: uploadedFile.Key,
      url: uploadedFile.Location,
      bucket: uploadedFile.Bucket,
      filename: newFilename,
    };
  }
}

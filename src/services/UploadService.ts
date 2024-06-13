import path from "path";
import fs from "fs";
import { MultipartFile } from "@fastify/multipart";
import { validateFile } from "../utils/validateFile";
import { DecryptToken } from "./DecryptToken";
import { verifyFileExists } from "../utils/verifyFileExists";

interface UploadProps {
  file: MultipartFile,
  token: string
};

export class UploadServide {
  async upload({ file, token }: UploadProps) {
    try {
      const chunks: Buffer[] = [];
      let fileSize = 0;
      for await (const chunk of file.file) {
        fileSize += chunk.length;
        chunks.push(chunk)
      };

      const fileValidation = validateFile({ file, fileSize });
      if (fileValidation != null) return fileValidation;

      const userId = new DecryptToken().decrypt(token);

      const buffer = Buffer.concat(chunks);
      const uploadDir = path.resolve(__dirname, "../../public/uploads", userId);
      const filePath = path.join(uploadDir, file.filename);

      const fileExists = await verifyFileExists(filePath);
      if (fileExists) return "File already exist";

      fs.writeFileSync(filePath, buffer);

      return "Upload succesfully";
    }
    catch (err) {
      console.log(err)
    };
  };
}

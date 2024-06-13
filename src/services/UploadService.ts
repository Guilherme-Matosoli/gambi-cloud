import path from "path";
import fs from "fs";
import { MultipartFile } from "@fastify/multipart";
import { validateFile } from "../utils/validateFile";
import { DecryptTokenService } from "./DecryptTokenService";
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

      const userId = new DecryptTokenService().decrypt(token);

      const buffer = Buffer.concat(chunks);
      const uploadDir = path.resolve(__dirname, "../../public/uploads", userId);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

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

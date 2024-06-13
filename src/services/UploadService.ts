import path from "path";
import fs from "fs";
import { MultipartFile } from "@fastify/multipart";
import { validateFile } from "../utils/validateFile";

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

      const buffer = Buffer.concat(chunks);
      const uploadDir = path.resolve(__dirname, "../../public/uploads");
      const filePath = path.join(uploadDir, file.filename);

      fs.writeFileSync(filePath, buffer);

      return "Upload succesfully";
    }
    catch (err) {
      console.log(err)
    };
  };
}

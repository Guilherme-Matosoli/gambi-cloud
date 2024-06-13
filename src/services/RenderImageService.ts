import path from "path";
import fs from "fs";
import { verifyFileExists } from "../utils/verifyFileExists";

interface RenderImageProps {
  userId: string,
  filename: string
};

export class RenderImageService {
  async render({ userId, filename }: RenderImageProps) {
    try {
      const filePath = path.resolve(__dirname, "../../public/uploads/", userId, filename);
      const fileExists = verifyFileExists(filePath);
      if (!fileExists) return "Image does not exists";

      const stream = fs.createReadStream(filePath);

      return stream;
    }
    catch (err) {
      console.log(err);
    }
  };
}

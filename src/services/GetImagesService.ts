import path from "path";
import fs from "fs";

export class GetImagesController {
  async get(userId: string) {
    try {
      const filePath = path.resolve(__dirname, "../../public/uploads/", userId);
      const files = await fs.promises.readdir(filePath);

      const images = await Promise.all(
        files.map(async image => {
          const imagePath = path.join(filePath, image);
          const buffer = await fs.promises.readFile(imagePath);

          return { filename: image, data: buffer.toString('base64') };
        })
      );

      return images;
    }
    catch (err) {
      console.log(err);
    }
  };
};

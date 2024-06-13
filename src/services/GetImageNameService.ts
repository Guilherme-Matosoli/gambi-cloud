import path from "path";
import fs from "fs";

export class GetImageNameService {
  async get(userId: string) {
    try {
      const filePath = path.resolve(__dirname, "../../public/uploads/", userId);
      const files = await fs.promises.readdir(filePath);

      const images = await Promise.all(
        files.map(async image => {
          return { filename: image };
        })
      );

      return images;
    }
    catch (err) {
      console.log(err);
    }
  };
};

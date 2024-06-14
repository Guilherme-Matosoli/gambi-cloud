import path from "path";
import fs from "fs";

export class GetImageNameService {
  async get(token: string) {
    try {
      const filePath = path.resolve(__dirname, "../../public/uploads/", token);
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

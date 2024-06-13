import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";

export class UploadController {
  async upload(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return reply.status(401).send({ message: "User without authorization token" })
      };

      const data = await req.file();
      if (!data) {
        return reply.status(400).send({ message: "No file uploaded" })
      };

      const chunks: Buffer[] = [];
      for await (const chunk of data.file) {
        chunks.push(chunk);
      };
      const buffer = Buffer.concat(chunks);
      const uploadDir = path.resolve(__dirname, "../../public/uploads");
      const filePath = path.join(uploadDir, data.filename)

      fs.writeFileSync(filePath, buffer);

      return reply.status(200).send({ token });
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" })
    };
  }
};

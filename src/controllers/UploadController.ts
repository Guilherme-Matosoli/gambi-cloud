import { FastifyReply, FastifyRequest } from "fastify";
import { UploadServide } from "../services/UploadService";

export class UploadController {
  async upload(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { token } = req.params as { token: string };
      if (!token) {
        return reply.status(401).send({ message: "User without authorization token" });
      };

      const data = await req.file();
      if (!data) {
        return reply.status(400).send({ message: "No file uploaded" });
      };

      const uploadService = new UploadServide();
      const uploadedImage = await uploadService.upload({ file: data, token });

      if (
        uploadedImage == "File extension not accept" ||
        uploadedImage == "Max size exceeded limit (2MB)" ||
        uploadedImage == "File already exist"
      ) return reply.status(415).send({ message: uploadedImage });

      return reply.status(201).send({ message: uploadedImage });
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" })
    };
  }
};

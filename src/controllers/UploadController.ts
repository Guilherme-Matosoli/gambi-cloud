import { FastifyReply, FastifyRequest } from "fastify";
import { UploadServide } from "../services/UploadService";

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

      const uploadService = new UploadServide();


      const uploadedImage = uploadService.upload({ file: data, token });

      return reply.status(201).send({ message: uploadedImage });
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" })
    };
  }
};

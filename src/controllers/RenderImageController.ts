import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";

interface RequestParams {
  userId: string,
  filename: string
};

export class RenderImageController {
  async provide(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, filename } = req.params as RequestParams;
      const filePath = path.resolve(__dirname, "../../public/uploads/", userId, filename);

      const stream = fs.createReadStream(filePath);

      return reply.status(200).type('application/octet-stream').send(stream);
    }
    catch (err) {
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

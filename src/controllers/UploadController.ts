import { FastifyReply, FastifyRequest } from "fastify";


export class UploadController {
  async upload(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await req.file();
    }
    catch (err) {
      return reply.status(500).send({ message: "Internal Server Error" })
    };
  }
};

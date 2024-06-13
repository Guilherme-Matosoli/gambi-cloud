import { FastifyReply, FastifyRequest } from "fastify";
import { GetImageNameService } from "../services/GetImageNameService";

export class GetImageNameController {
  async get(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.params as { userId: string };

      const getImageService = new GetImageNameService();
      const images = await getImageService.get(userId);

      reply.status(200).send(images);
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

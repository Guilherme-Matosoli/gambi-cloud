import { FastifyReply, FastifyRequest } from "fastify";
import { GetImagesService } from "../services/GetImagesService";

export class GetImagesController {
  async get(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.params as { userId: string };

      const getImageService = new GetImagesService();
      const images = await getImageService.get(userId);

      reply.status(200).send(images);
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

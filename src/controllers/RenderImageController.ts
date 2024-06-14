import { FastifyReply, FastifyRequest } from "fastify";
import { RenderImageService } from "../services/RenderImageService";

interface RequestParams {
  token: string,
  filename: string
};

export class RenderImageController {
  async provide(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { filename, token } = req.params as RequestParams;

      const renderImageService = new RenderImageService();

      const image = await renderImageService.render({ token, filename });
      if (image == "Image does not exists") return reply.status(404).send({ message: image });

      return reply.status(200).type('application/octet-stream').send(image);
    }
    catch (err) {
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

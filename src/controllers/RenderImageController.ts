import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import { RenderImageService } from "../services/RenderImageService";

interface RequestParams {
  userId: string,
  filename: string
};

export class RenderImageController {
  async provide(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, filename } = req.params as RequestParams;
      const renderImageService = new RenderImageService();

      const image = await renderImageService.render({ userId, filename });
      if (image == "Image does not exists") return reply.status(404).send({ message: image });

      return reply.status(200).type('application/octet-stream').send(image);
    }
    catch (err) {
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

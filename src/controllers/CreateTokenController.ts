import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTokenService } from "../services/CreateTokenService";

export class CreateTokenController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.body as { userId: string };
      if (!userId) return reply.status(401).send({ message: "UserId is missing" });

      const createTokenService = new CreateTokenService();
      const token = await createTokenService.create({ userId });

      return reply.status(201).send({ token })
    }
    catch (err) {
      console.log(err);
      return reply.status(500).send({ message: "Internal Server Error" });
    };
  };
};

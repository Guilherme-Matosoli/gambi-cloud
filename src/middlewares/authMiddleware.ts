import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { DecryptTokenService } from "../services/DecryptTokenService";


export const autMiddleware = (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  try {


    const token = req.headers.authorization as string;
    if (!token) return reply.status(401).send({ message: "Missing authorization token" });

    const userId = new DecryptTokenService().decrypt(token);
    req.headers.cookie = userId;

    done();
  }
  catch (err) {
    return reply.status(401).send({ message: "Invalid token" });
  }
};

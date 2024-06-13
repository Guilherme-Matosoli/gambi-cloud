import 'dotenv/config';
import fastify from "fastify";
import multipart from "@fastify/multipart";

import { UploadController } from "./controllers/UploadController";
import { CreateTokenController } from './controllers/CreateTokenController';
import { GetImageNameController } from './controllers/GetImageNameController';
import { RenderImageController } from './controllers/RenderImageController';
import { autMiddleware } from './middlewares/authMiddleware';

export const app = fastify();
app.register(multipart);


app.post('/upload', new UploadController().upload);

app.post('/token/create', new CreateTokenController().create);

app.route({
  method: 'GET',
  url: '/images',
  preHandler: autMiddleware,
  handler: new GetImageNameController().get
});

app.route({
  method: 'GET',
  url: '/render/:filename',
  preHandler: autMiddleware,
  handler: new RenderImageController().provide
});

app.listen({ port: 4000 }).then(() => {
  console.log("Server is running on port 4000")
});

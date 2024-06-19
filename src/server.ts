import 'dotenv/config';
import fastify from "fastify";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";

import { UploadController } from "./controllers/UploadController";
import { GetImageNameController } from './controllers/GetImageNameController';
import { RenderImageController } from './controllers/RenderImageController';
import { runCleanFunction } from './utils/cleanUploads';


export const app = fastify();
app.register(multipart);
app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

runCleanFunction();

app.post('/upload/:token', new UploadController().upload);

app.get('/images/:token', new GetImageNameController().get);

app.get('/render/:token/:filename', new RenderImageController().provide);

app.listen({ port: 4000 }).then(() => {
  console.log("Server is running on port 4000")
});

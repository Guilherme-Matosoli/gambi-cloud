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

app.get('/r', (req, reply) => { return reply.status(200).send("Ok") });

setInterval(() => {
  fetch("https://gmchat-a91m.onrender.com/r").then(r => console.log(r))
}, 14000)


app.post('/upload/:token', new UploadController().upload);

app.get('/images/:token', new GetImageNameController().get);

app.get('/render/:token/:filename', new RenderImageController().provide);

const PORT = process.env.PORT || 4000;

app.listen({ port: Number(PORT), host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;

  console.log("Server is running on: " + address)
});

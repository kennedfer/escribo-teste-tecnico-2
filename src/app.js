import Fastify from "fastify";
import * as dotenv from 'dotenv'
import { usersController } from "./controllers/users-controller.js";
import mongoose from "mongoose";

dotenv.config();

const fastify = Fastify({ logger: true });
usersController.forEach(controller => fastify.register(controller));

mongoose.connect(process.env.MONGODB_URI);
fastify.listen({ port: process.env.PORT || 3000 });
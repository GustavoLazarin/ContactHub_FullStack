import { PrismaClient } from "@prisma/client";
import express, { Application, json } from "express";

export const app: Application = express();

export const prisma = new PrismaClient();

app.use(json());
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        message: "OK",
      });
      break;
    case "POST":
      try {
        const data = JSON.parse(req.body);
        const createdMovie = await prisma.movie.create({
          data,
        });
        res.status(201).json(createdMovie);
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong!",
        });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};

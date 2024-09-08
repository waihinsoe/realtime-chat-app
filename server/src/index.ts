import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app: Express = express();
const port: number = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world with typescript");
});

io.on("connection", (socket) => {
  console.log(socket);
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

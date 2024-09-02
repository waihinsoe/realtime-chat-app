import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("lala");
  res.send("Hello world with typescript");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

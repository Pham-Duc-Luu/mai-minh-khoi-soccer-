import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import route from "./route/getPlayers";
import coach from "./route/getCoach";
import team from "./route/teams";
import champion from "./route/champion";
import match from "./route/match";

import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/v1", route);
app.use("/v1", coach);
app.use("/v1", team);
app.use("/v1", match);
app.use("/v1", champion);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

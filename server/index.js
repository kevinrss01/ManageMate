import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/Auth.routes.js";
import fileRoutes from "./routes/Files.routes.js";
import userRoutes from "./routes/Users.routes.js";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(req.body);
  next();
});

app.use(cors());
dotenv.config({ path: "./config/.env" });

//USER ROUTES
app.use("/users", userRoutes);

//AUTH ROUTES
app.use("/auth", authRoutes);

//FILE ROUTES
app.use("/files", fileRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

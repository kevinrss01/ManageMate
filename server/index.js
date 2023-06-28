import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import userRoutes from './routes/Users.routes.js';
import authRoutes from "./routes/Auth.routes.js";
import fileRoutes from "./routes/Files.routes.js";
import modifRoutes from "./routes/ModifUser.routes.js";
import userRoutes from "./routes/Users.routes.js";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.json());

app.use(cors());
dotenv.config({ path: "./config/.env" });

//USER ROUTES
app.use("/users", userRoutes);

//AUTH ROUTES
app.use("/auth", authRoutes);

//FILE ROUTES
app.use("/files", fileRoutes);

//UPDATE ROUTES
app.use("/update", modifRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

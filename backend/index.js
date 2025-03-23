import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
import http from "http";
import initSocket from "./lib/socket.js";

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
    console.log(`Backend API:
http://localhost:${PORT}/api`);
})
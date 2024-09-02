import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";
import { logMiddleware } from "./middlewares/logMiddleware.js";
import Routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { setupSocket } from "./socket.js";
import redis from "./config/ioredis.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.js";
import { consumeMessages } from "./utils/helper.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_APP_URL, "https://admin.socket.io"],
    credentials: true,
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

setupSocket(io);

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: false }));

// Logging middleware to log incoming requests
app.use(logMiddleware);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Mount routes
app.use("/api", Routes);

// Root route
app.get("/", (req, res) => {
  return res.send("Hello, I am live");
});

connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages("chats").catch((err) =>
  console.log("The Kafka Consume error", err)
);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

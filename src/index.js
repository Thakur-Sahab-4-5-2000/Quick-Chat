import express from "express";
import cors from "cors";
import "dotenv/config";
import { logMiddleware } from "./middlewares/logMiddleware.js";
import Routes from "./routes/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS
app.use(
  cors({
    // origin: ["http://localhost:8000"], // Allowed origins
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    // Uncomment below if you need them
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    // exposedHeaders: ["Authorization"], // Exposed headers
    // credentials: true, // Allow credentials
    // preflightContinue: false, // Continue to next middleware
    // optionsSuccessStatus: 204, // Status code for successful OPTIONS requests
    // maxAge: 3600, // Cache preflight results for 1 hour
  })
);
// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: false }));

// Logging middleware to log incoming requests
app.use(logMiddleware);

// Serve static files from the "public/images" directory
app.use(express.static(path.join(__dirname, '../public')));

// Mount routes
app.use("/api", Routes);

// Root route
app.get("/", (req, res) => {
  return res.send("Hello, I am live");
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on port", port);
});

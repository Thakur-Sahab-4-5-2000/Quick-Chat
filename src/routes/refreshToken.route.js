import { Router } from "express";
import { refreshToken } from "../controllers/AuthController.js";

const route = Router();

route.get("/", refreshToken);

export default route;

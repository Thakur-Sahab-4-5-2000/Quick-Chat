import { Router } from "express";
import { refreshToken } from "../controllers/AuthController.js";

const route = Router();

route.post("/", refreshToken);

export default route;

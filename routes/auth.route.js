import { Router } from "express";
import { loginSchema, schemaValidator,registerationSchema } from "../validators/index.js";
import {
  login,
  registeration,
} from "../controllers/AuthController.js";
const route = Router();

route.post("/login", schemaValidator(loginSchema), login);
route.post("/register", schemaValidator(registerationSchema), registeration);

export default route;

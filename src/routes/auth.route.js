import { Router } from "express";
import { loginSchema, schemaValidator,registrationSchema } from "../validators/index.js";
import {
  login,
  registeration,
} from "../controllers/AuthController.js";
const route = Router();

route.post("/login", schemaValidator(loginSchema), login);
route.post("/register", schemaValidator(registrationSchema), registeration);

export default route;

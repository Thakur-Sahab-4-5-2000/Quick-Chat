import { Router } from "express";
import {
  createChartGroupSchema,
  schemaValidator,
} from "../validators/index.js";
import {
  createChatGroup,
  deleteChatGroup,
  getAllChatGroup,
  getAllChatGroupById,
} from "../controllers/ChatGroupController.js";

const route = Router();

route.get("/", getAllChatGroup);
route.get("/:id", getAllChatGroupById);
route.post("/", schemaValidator(createChartGroupSchema), createChatGroup);
route.delete("/:id", deleteChatGroup);

export default route;

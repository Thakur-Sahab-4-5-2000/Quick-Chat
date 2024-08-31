import { Router } from "express";
import authRoute from "./auth.route.js";
import refreshTokenRoute from "./refreshToken.route.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import chatGroupRoute from "./chatGroup.route.js";

const router = Router();
const unprotectedRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
];

const protectedRoutes = [
  {
    path: "/refresh-token",
    route: refreshTokenRoute,
  },
  {
    path: "/chat-group",
    route: chatGroupRoute,
  },
];

protectedRoutes.forEach((route) => {
  router.use(route.path, authMiddleware, route.route);
});

unprotectedRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

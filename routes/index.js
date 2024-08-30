import { Router } from "express";
import authRoute from "./auth.route.js";
import refreshTokenRoute from "./refreshToken.route.js";

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
];

protectedRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

unprotectedRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

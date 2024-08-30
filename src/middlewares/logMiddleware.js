import { prisma } from "../config/prisma.js";
import getSystemIPAddress from "../utils/getIpAddress.js";

function logMiddleware(req, res, next) {
  const username = req.user?.username || "Unknown";
  const path = req.route?.path;

  prisma.$use(async (params, next) => {
    if (params.action === "create" && params.model === "PrismaLog") {
      params.args.data.ipAddress = getSystemIPAddress();
      params.args.data.username = username;
      params.args.data.path = path;
    }
    return next(params);
  });

  next();
}

export { logMiddleware };

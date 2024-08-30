import { PrismaClient } from "@prisma/client";
import getSystemIPAddress from "../utils/getIpAddress.js";

const prisma = new PrismaClient({
  log: ["error", "query", "warn"],
});

let isLogging = false;

async function saveLog(level, message, ipAddress, username) {
  if (isLogging) return;

  isLogging = true;
  await prisma.prismaLog.create({
    data: {
      level,
      message,
      ipAddress,
      username,
      path,
    },
  });
  isLogging = false;
}

prisma.$on("query", async (e) => {
  if (!isLogging) {
    await saveLog("query", e.query, getSystemIPAddress(), "N/A", "N/A");
  }
});

prisma.$on("error", async (e) => {
  if (!isLogging) {
    await saveLog("error", e.message, getSystemIPAddress(), "N/A", "N/A");
  }
});

prisma.$on("warn", async (e) => {
  if (!isLogging) {
    await saveLog("warn", e.message, getSystemIPAddress(), "N/A", "N/A");
  }
});

export { prisma, saveLog };

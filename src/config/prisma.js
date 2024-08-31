import { PrismaClient } from "@prisma/client";
import getSystemIPAddress from "../utils/getIpAddress.js";

const prisma = new PrismaClient({
  log: ["error", "query", "warn"],
});

let isLogging = false;

async function saveLog(level, message, ipAddress, username, route) {
  if (isLogging) return;

  isLogging = true;

  try {
    await prisma.prismaLog.create({
      data: {
        level,
        message,
        ipAddress,
        username,
        route,
      },
    });
  } catch (error) {
    console.error("Failed to save log:", error);
  } finally {
    isLogging = false;
  }
}

prisma.$on("query", async (e) => {
  try {
    if (!isLogging) {
      await saveLog("query", e.query, getSystemIPAddress(), "N/A", "N/A");
    }
  } catch (error) {
    console.error("Error logging query:", error);
  }
});

prisma.$on("error", async (e) => {
  try {
    if (!isLogging) {
      await saveLog("error", e.message, getSystemIPAddress(), "N/A", "N/A");
    }
  } catch (error) {
    console.error("Error logging error:", error);
  }
});

prisma.$on("warn", async (e) => {
  try {
    if (!isLogging) {
      await saveLog("warn", e.message, getSystemIPAddress(), "N/A", "N/A");
    }
  } catch (error) {
    console.error("Error logging warning:", error);
  }
});

export { prisma, saveLog };

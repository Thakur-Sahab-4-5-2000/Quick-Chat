import fs from "fs";
import { saveLog } from "../config/prisma.js";

const sendResponse = (res, status, message, data = null) => {
  return res.status(status).json({ message, data });
};

const handleError = async (res, message, ip, user = null, route = null) => {
  console.log("Handling error:", { message, ip, user, route });

  try {
    const errorMessage =
      typeof message === "string" ? message : message.message;
    console.log("Logging error message:", errorMessage);

    await saveLog("error", errorMessage, ip, user, route);
  } catch (logError) {
    console.error("Failed to save log:", logError);
  } finally {
    console.log("Sending response with status 500");
    return sendResponse(res, 500, message);
  }
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

function normalizeRequestData(fields) {
  const normalizedFields = {};
  Object.keys(fields).forEach((key) => {
    normalizedFields[key] = Array.isArray(fields[key])
      ? fields[key][0]
      : fields[key];
  });

  return normalizedFields;
}

export {
  sendResponse,
  handleError,
  ensureDirectoryExists,
  normalizeRequestData,
};

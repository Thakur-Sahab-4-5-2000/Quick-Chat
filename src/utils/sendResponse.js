import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { saveLog } from "../config/prisma.js";

const sendResponse = (res, status, message, data = null) => {
  return res.status(status).json({ message, data });
};

const handleError = async (
  res,
  message,
  ip = null,
  user = null,
  route = null
) => {
  try {
    const errorMessage =
      typeof message === "string" ? message : message.message;

    await saveLog("error", errorMessage, ip, user, route);
  } catch (logError) {
    console.error("Failed to save log:", logError);
  } finally {
    return sendResponse(res, 500, message);
  }
};

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const generateRandomNum = () => {
  return uuidv4();
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

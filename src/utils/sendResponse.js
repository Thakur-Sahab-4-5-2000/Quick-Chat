import fs from "fs";
import { saveLog } from "../config/prisma.js";

const sendResponse = (res, status, message, data = null) => {
  return res.status(status).json({ message, data });
};

const handleError = (res, message, ip, user = null) => {
  saveLog("error", message, ip, user);
  return sendResponse(res, 500, message);
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

export { sendResponse, handleError, ensureDirectoryExists ,normalizeRequestData};

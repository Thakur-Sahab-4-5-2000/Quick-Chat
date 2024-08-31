import { authControllerResponseMessage } from "../responses/index.js";
import {
  sendResponse,
  handleError,
  ensureDirectoryExists,
  normalizeRequestData,
} from "../utils/sendResponse.js";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { IncomingForm } from "formidable";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { imageValidator } from "../utils/helper.js";

// Convert __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);

const login = async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(
        res,
        401,
        authControllerResponseMessage.login.failure.invalidCredentials
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return sendResponse(res, 200, authControllerResponseMessage.login.success, {
      token,
    });
  } catch (error) {
    return handleError(res, error, ip, email, 500);
  }
};
const registeration = async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;

  const uploadDir = path.resolve(process.cwd(), "public/images");

  ensureDirectoryExists(uploadDir);

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return sendResponse(res, 500, "Error parsing form data");
    }

    const normalizedFields = normalizeRequestData(fields);
    const { email, username, password } = normalizedFields;

    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email ? { equals: email } : undefined },
            { username: username ? { equals: username } : undefined },
          ],
        },
      });

      if (existingUser) {
        const errorMessage =
          existingUser.email === email
            ? authControllerResponseMessage.registration.failure.emailExists
            : authControllerResponseMessage.registration.failure.usernameExists;
        return sendResponse(res, 401, errorMessage);
      }

      if (!files.profile) {
        return sendResponse(res, 400, "Profile image is required.");
      }

      const profileImage = Array.isArray(files.profile)
        ? files.profile[0]
        : files.profile;

      if (!profileImage || !profileImage.originalFilename) {
        return sendResponse(res, 400, "Profile image is required.");
      }

      // Optional: Validate image size and type
      // const validationMessage = imageValidator(profileImage.size, profileImage.mimetype);
      // if (validationMessage) {
      //   return sendResponse(res, 400, { errors: { profile: validationMessage } });
      // }

      const imageName = profileImage.originalFilename;

      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );

      await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          image: imageName,
          updatedAt: new Date(),
        },
      });

      return sendResponse(
        res,
        200,
        authControllerResponseMessage.registration.success
      );
    } catch (error) {
      return handleError(res, error, ip, req.user);
    }
  });
};

const refreshToken = async (req, res) => {
  console.log("req.user", req.user);
  const refreshToken = req.headers.authorization || req.headers.Authorization;
  const ip = req.ip || req.connection.remoteAddress;

  if (!refreshToken) {
    return sendResponse(
      res,
      authControllerResponseMessage.refreshToken.failure.noToken
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (!user) {
      return sendResponse(
        res,
        401,
        authControllerResponseMessage.refreshToken.failure.invalidToken
      );
    }

    const newAccessToken = jwt.sign(
      { username: user.username, email: user.email, image: user.image },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return sendResponse(
      res,
      200,
      authControllerResponseMessage.refreshToken.success,
      { accessToken: newAccessToken }
    );
  } catch (error) {
    return handleError(res, error, ip, req.user);
  }
};

export { login, registeration, refreshToken };

import { genSalt } from "bcrypt";
import { authControllerResponseMessage } from "../response message/index.js";
import sendResponse from "../utils/sendResponse.js";
import { imageValidator } from "../utils/helper.js";
import { prisma, saveLog } from "../config/prisma.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return sendResponse(
        res,
        authControllerResponseMessage.login.failure.invalidCredentials
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(
        res,
        authControllerResponseMessage.login.failure.invalidCredentials
      );
    }
    const payloadData = {
      username,
      email,
      image,
    };

    const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return sendResponse(
      res,
      authControllerResponseMessage.login.success,
      token
    );
  } catch (error) {
    saveLog(
      "error",
      authControllerResponseMessage.login.failure.general,
      ip,
      req?.user
    );
    return sendResponse(
      res,
      authControllerResponseMessage.login.failure.general
    );
  }
};

const registeration = async (req, res) => {
  const { email, username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  try {
    const user = await prisma.User.findUnique({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (user.email === email) {
      return sendResponse(
        res,
        authControllerResponseMessage.registration.failure.emailExists
      );
    } else if (user.username === username) {
      return sendResponse(
        res,
        authControllerResponseMessage.registration.failure.usernameExists
      );
    }
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Profile image is required." });
    }

    const profile = req.files.profile;
    const message = imageValidator(profile?.size, profile.mimetype);
    if (message !== null) {
      return res.status(400).json({
        errors: {
          profile: message,
        },
      });
    }

    const imageName = uploadImage(profile);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        image: imageName,
        updatedAt: new Date(),
      },
    });
  } catch (err) {
    saveLog(
      "error",
      authControllerResponseMessage.registration.failure.general,
      ip,
      req?.user
    );
    return sendResponse(
      res,
      authControllerResponseMessage.registration.failure.general
    );
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return sendResponse(
      res,
      authControllerResponseMessage.refreshToken.failure.noToken
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return sendResponse(
        res,
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
      authControllerResponseMessage.refreshToken.success,
      { accessToken: newAccessToken }
    );
  } catch (error) {
    return sendResponse(
      res,
      authControllerResponseMessage.refreshToken.failure.general
    );
  }
};

export { login, registeration, refreshToken };

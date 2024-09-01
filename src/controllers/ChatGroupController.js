import { prisma } from "../config/prisma.js";
import { chartGroupResponseMessage } from "../responses/index.js";
import { sendResponse, handleError } from "../utils/sendResponse.js";
import bcrypt from "bcrypt";

const createChatGroup = async (req, res) => {
  const { title, passcode } = req.body;

  try {
    const { email } = req?.user;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return sendResponse(
        res,
        chartGroupResponseMessage.createChartGroup.failure.notFound.status,
        chartGroupResponseMessage.createChartGroup.failure.notFound.message
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPasscode = await bcrypt.hash(passcode, salt);

    const groupExist = await prisma.chatGroup.findFirst({
      where: {
        title,
      },
    });

    if (groupExist) {
      return sendResponse(
        res,
        chartGroupResponseMessage.createChartGroup.failure.exist.status,
        chartGroupResponseMessage.createChartGroup.failure.exist.message
      );
    }

    await prisma.chatGroup.create({
      data: {
        userId: userExist.id,
        title,
        passcode: hashedPasscode,
        updatedAt: new Date(),
      },
    });

    return sendResponse(
      res,
      chartGroupResponseMessage.createChartGroup.success.status,
      chartGroupResponseMessage.createChartGroup.success.message
    );
  } catch (error) {
    handleError(res, error, "", req.user.username);
  }
};

const getAllChatGroup = async (req, res) => {
  const { page = 1, offset = 10 } = req.query;
  try {
    const { email } = req.user;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return sendResponse(
        res,
        chartGroupResponseMessage.createChartGroup.failure.notFound.status,
        chartGroupResponseMessage.createChartGroup.failure.notFound.message
      );
    }

    const skipData = (page - 1) * offset;

    const data = await prisma.chatGroup.findMany({
      where: { userId: userExist.id },
      skip: parseInt(skipData),
      take: parseInt(offset),
    });
    if (!data || data.length === 0) {
      return sendResponse(
        res,
        chartGroupResponseMessage.getChartGroup.failure.notFound.status,
        chartGroupResponseMessage.getChartGroup.failure.notFound.message
      );
    }
    return sendResponse(
      res,
      chartGroupResponseMessage.getChartGroup.success.status,
      chartGroupResponseMessage.getChartGroup.success.message,
      data
    );
  } catch (error) {
    handleError(res, error, "", req.user.username);
  }
};

const getAllChatGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.chatGroup.findFirst({
      where: { id },
    });
    if (!data) {
      return sendResponse(
        res,
        chartGroupResponseMessage.getChartGroup.failure.notFound.status,
        chartGroupResponseMessage.getChartGroup.failure.notFound.message
      );
    }
    return sendResponse(
      res,
      chartGroupResponseMessage.getChartGroup.success.status,
      chartGroupResponseMessage.getChartGroup.success.message,
      data
    );
  } catch (error) {
    handleError(res, error, "", req.user.username);
  }
};

const deleteChatGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    const data = await prisma.chatGroup.findFirst({
      where: { id },
    });
    if (!data) {
      return sendResponse(
        res,
        chartGroupResponseMessage.deleteChartGroup.failure.notFound.status,
        chartGroupResponseMessage.deleteChartGroup.failure.notFound.message
      );
    }
    const userExist = await prisma.user.findUnique({
      where: { email },
    });
    if (userExist.id !== data.userId) {
      return sendResponse(res, 401, "You can't delete this chat group");
    }

    await prisma.chatGroup.delete({
      where: { id },
    });
    return sendResponse(
      res,
      chartGroupResponseMessage.deleteChartGroup.success.status,
      chartGroupResponseMessage.deleteChartGroup.success.message,
    );
  } catch (error) {
    handleError(res, error, "", req.user.username);
  }
};

export { createChatGroup, getAllChatGroup, getAllChatGroupById, deleteChatGroup};
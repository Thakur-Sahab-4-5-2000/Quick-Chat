import prisma from "../config/prisma.js";

const getChatGroupCusers = async (req, res) => {
  try {
    const { group_id } = req.query;
    const users = await prisma.groupUsers.findMany({
      where: {
        group_id: group_id,
      },
    });

    return res.json({ message: "Date fetched successfully!", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

const createChatGroupUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await prisma.groupUsers.create({
      data: body,
    });
    return res.json({ message: "User created successfully!", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

export { getChatGroupCusers, createChatGroupUser };

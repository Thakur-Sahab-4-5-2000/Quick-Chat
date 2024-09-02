import { supportedMimes } from "../config/filesystem.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { producer, consumer } from "../config/kafka.js";
import { prisma } from "../config/prisma.js";

export const imageValidator = (size, mime) => {
  if (bytesToMb(size) > 2) {
    return "Image size must be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be type of png,jpg,jpeg,svg,webp,gif..";
  }

  return null;
};

export const bytesToMb = (bytes) => {
  return bytes / (1024 * 1024);
};

export const generateRandomNum = () => {
  return uuidv4();
};

export const getImageUrl = (imgName) => {
  return `${process.env.APP_URL}/images/${imgName}`;
};

export const removeImage = (imageName) => {
  const path = process.cwd() + "/public/images/" + imageName;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

// * Upload image
export const uploadImage = (image) => {
  const imgExt = image?.name.split(".");
  const imageName = generateRandomNum() + "." + imgExt[1];
  const uploadPath = process.cwd() + "/public/images/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return imageName;
};

export const produceMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const consumeMessages = async (topic) => {
  console.log("topic", topic);
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log({
        partition,
        offset: message.offset,
        value: data,
      });

      await prisma.chat.create({
        data: {
          groupId: data.groupId,
          userId: data.userId,
          file: data.message,
          name: "Shubham",
        },
      });

      // Process the message (e.g., save to DB, trigger some action, etc.)
    },
  });
};

import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: process.env.MECHANISHM,
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
// export const consumer = kafka.consumer({ groupId: "chats" });
export const consumer = kafka.consumer({
  groupId: 'chats',
  sessionTimeout: 30000, // Increase session timeout (30 seconds)
});

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};

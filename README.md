# Scalable Real-Time Chat Application

This is a scalable real-time chat application that leverages Redis for handling real-time messaging and Kafka for processing and sending emails. The architecture ensures efficient communication, scalability, and fault tolerance.

## Features

- **Real-time messaging:** Supports instant messaging between users with low latency using Socket.IO and Redis as the adapter.
- **Scalable architecture:** Designed to handle a large number of concurrent connections.
- **Email notifications:** Kafka is used for queuing and processing email notifications, ensuring reliable and asynchronous email delivery.
- **Redis adapter:** Redis is utilized for managing real-time data flow between servers.
- **Authentication and authorization:** Secure login and registration system.
- **Optimized performance:** Efficient use of resources with Redis and Kafka.

## Prerequisites

- **Node.js** 
- **Redis** 
- **Kafka**
- **Prisma**
- **Socket.IO** 

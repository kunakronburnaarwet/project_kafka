# Kafka Demo Project

This is a small Kafka demo project for local experimentation.

## What’s included

- `docker-compose.yml` to run Kafka and Zookeeper locally
- `src/producer.js` to send messages to Kafka
- `src/consumer.js` to read messages from Kafka

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start Kafka and Zookeeper:

```bash
npm run docker:up
```

3. Run the consumer in one terminal:

```bash
npm run start:consumer
```

4. Run the producer in another terminal:

```bash
npm run start:producer
```

5. When finished, stop the Docker services:

```bash
npm run docker:down
```

## Notes

- Kafka is available at `localhost:9092`
- The demo uses a topic called `test-topic`
- Messages are published from `producer.js` and consumed by `consumer.js`

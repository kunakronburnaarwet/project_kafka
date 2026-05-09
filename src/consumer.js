const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kfaka-sample-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'kfaka-sample-group' });
const topic = process.env.KAFKA_TOPIC || 'test-topic';

async function run() {
  await consumer.connect();
  console.log('Consumer connected to Kafka');

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`${prefix} - ${message.value.toString()}`);
    }
  });
}

run().catch((error) => {
  console.error('Consumer error:', error);
  process.exit(1);
});

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kfaka-sample-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const topic = 'test-topic';

async function run() {
  await producer.connect();
  console.log('Producer connected to Kafka');

  for (let i = 1; i <= 5; i += 1) {
    const message = `Hello Kafka #${i}`;
    await producer.send({
      topic,
      messages: [{ value: message }]
    });
    console.log(`Sent: ${message}`);
  }

  await producer.disconnect();
  console.log('Producer disconnected');
}

run().catch((error) => {
  console.error('Producer error:', error);
  process.exit(1);
});

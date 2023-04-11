const { Kafka } = require('kafkajs');

// create Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

// create Kafka producer
const producer = kafka.producer();

// create Kafka consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

// create Kafka topic
const topic = 'chatbot-messages';

// export async function runParser() {
//   await producer.connect();
//   await consumer.connect();
// }

// consume messages from Kafka topic
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message:', message.value.toString());
    }
  });
}

// send message to Kafka topic
const runProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: 'Hello KafkaJS!' }]
  });
  console.log('Sent message to Kafka topic');
}

// // run consumer and producer
runConsumer().catch(console.error);
runProducer().catch(console.error);

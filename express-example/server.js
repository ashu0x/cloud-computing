const express = require('express');

const app = express();

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  });

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'chatbot-messages';

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.post('/submit', async(req, res) => {
    const message = req.body;
    console.log(message)
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ value: 'Hello KafkaJS!' }]
    });
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received message:', message.value.toString());
      }
    });
    res.send('Successful response.');
});

app.listen(3001, () => console.log('Example app is listening on port 3000.'));

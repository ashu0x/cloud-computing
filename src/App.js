import React from "react";
import Chatbot from "react-chatbot-kit";
import "./App.css";

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'chatbot-messages';

async function start(){
  await producer.connect();
  // await consumer.connect();
}

export async function getProducer() {
  return producer
}

export async function getConsumer() {
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  return consumer
}

function App() {

  start().catch(console.error);

  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header>
    </div>
  );
}

export default App;

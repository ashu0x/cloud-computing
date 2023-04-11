import { getProducer } from "./App";

// MessageParser starter code in MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  async parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    console.log(lowerCaseMessage)

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }
    
    else{
      try{
        this.actionProvider.handle(lowerCaseMessage);
        const producer = await getProducer();
        await producer.send({
          topic: 'chatbot-messages',
          messages: [{ value: lowerCaseMessage }]
        });
        console.log('Sent message to Kafka topic');
        await this.actionProvider.handle(lowerCaseMessage);
      }catch(err){
        console.log(err)
      }
    }

    // if (lowerCaseMessage.includes("javascript")) {
    //   this.actionProvider.handleJavascriptList();
    // }



  }
}

export default MessageParser;

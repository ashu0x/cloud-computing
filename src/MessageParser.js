const { default: axios } = require("axios");

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
        const res = await axios.post("http://localhost:5000/weather", {location: lowerCaseMessage})
        console.log(res.data.message)
        console.log("sending message")
        await this.actionProvider.handle(res.data.message)
      }catch(err){
        await this.actionProvider.handle("Invalid location")
        console.log(err)
      }
    }

    // if (lowerCaseMessage.includes("javascript")) {
    //   this.actionProvider.handleJavascriptList();
    // }



  }
}

export default MessageParser;

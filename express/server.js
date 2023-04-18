require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

const configuration = new Configuration({
  apiKey: "OPEN_API_KEY",
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5000;

app.post("/weather", async(req,res) => {
  const location = req.body.location;
  try {
    if (location == null) {
      throw new Error("Uh oh, no location was provided");
    }

    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=e49beaad643c4671b6c05915231804&q=${location}&days=1&aqi=no&alerts=no`);

    const message = `The weather condition of ${location}: ${response.data.current.condition.text}, humidity: ${response.data.current.humidity} temperature: ${response.data.current.temp_c} C`;

    return res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 64,
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
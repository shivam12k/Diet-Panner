const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ key: apiKey });

app.get("/", (req, res) => {
  res.send("Server Area");
});

const responseExample = [{ monday: { mealName: "", dish: "", calories: 0 } }];
app.post("/plan", async (req, res) => {
  let dietPlan = req.body.dietPlan; // Extract 'Diet', 'calories', and 'cusion' from req.body
  let prompt = `You are a professional dietitian. Create a personalized five-day ${dietPlan.Diet}  meal plan for ${dietPlan.age} year old person.
   considering a daily caloric intake of ${dietPlan.calories} calories. The plan should align with the user's preference 
   for${dietPlan.cusion} cuisine, adhere to a ${dietPlan.Diet} diet, and include a diverse range of food items to meet essential
   nutrient requirements.Each meal should be designed to be prepared within a one-hour cooking time. Deliver
   your response in valid JSON format with the following [{monday: { meal:"meal name", dish:"put dishes", calories:"Write the number of calories"}}] .
   follow this structure and don't write any thing else just return the json  plan for Mondays put a comma after each meal also write the number of calories contained by the meal " Follow the sequence for 5 days from Monday to Friday`;

  console.log(prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Provide output in valid json .always write the keys in capital word.data schema should be like " + responseExample +"avoid using space",
        },
        { role: "user", content: prompt },
      ],
    });
    const responseText = completion.choices[0];

    console.log(responseText);
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running at port ${PORT}`);
});

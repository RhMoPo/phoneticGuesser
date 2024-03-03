import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/test", (req, res) => {
  const data = { word: "erw", phonetic: "yoyo" }
  randomWord();
  res.json(data);
});


// Route handler for fetching a random word
app.get("/random-word", async (req, res) => {
  const fetchRandomWordAndDictionary = async () => {
    try {
      // Fetch a random word from the external API
      const randomWordResponse = await fetch(
        "https://random-word-api.herokuapp.com/word?length=3"
      );
      if (!randomWordResponse.ok) {
        throw new Error("Failed to fetch random word");
      }
      const randomWordData = await randomWordResponse.json();
      const word = randomWordData[0]; // Extract the word from the response

      // Construct the URL for the dictionary API call
      const dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

      // Fetch the dictionary entry for the random word
      const dictionaryResponse = await fetch(dictionaryUrl, {
        headers: {
          accept: "application/json",
        },
      });
      if (!dictionaryResponse.ok) {
        throw new Error("Failed to fetch dictionary entry");
      }
      const dictionaryData = await dictionaryResponse.json();

      // Extract only the word and phonetic information
      const responseData = {
        word: dictionaryData[0]?.word || "N/A",
        phonetic: dictionaryData[0]?.phonetic || "N/A",
      };

      // Send the extracted data back to the frontend
      res.json(responseData);
    } catch (error) {
      console.error(`Error: ${error.message}. Retrying...`);
      fetchRandomWordAndDictionary();
    }
  };

  // Initial call to fetch random word and dictionary entry
  fetchRandomWordAndDictionary();
});


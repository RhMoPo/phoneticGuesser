//!put function inside here and export

import fetch from "node-fetch";

const fetchRandomWordAndDictionary = async (res) => {
    try {
      const randomLength = Math.floor(Math.random() * 8) + 3;
    // Fetch a random word from the external API
    const randomWordResponse = await fetch(
      `https://random-word-api.herokuapp.com/word?length=${randomLength}`
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
    fetchRandomWordAndDictionary(res);
  }
};

export default fetchRandomWordAndDictionary;
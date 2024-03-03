//Set variables to allow DOManip
const userAnswerInput = document.getElementById("userAnswer");
const phoneticsOutput = document.getElementById("phoneticsOutput");
const submitBtn = document.getElementById("submitBTN");
let word = "";
let phonetic = "";
let score;

document.addEventListener("DOMContentLoaded", getRandomWordFromBackend);
submitBtn.addEventListener("click", checkUserAnswer);

// Make a request to the backend endpoint for a random word
async function getRandomWordFromBackend() {
  try {
    const response = await fetch("http://localhost:3001/random-word");
    if (!response.ok) {
      throw new Error("Failed to fetch random word from backend");
    }
    const data = await response.json();

    if (data.phonetic === "N/A") {
      console.log("Phonetic value is 'N/A'. Retrying...");
      return getRandomWordFromBackend(); // Retry fetching the data
    }

    // Extract the 'word' and 'phonetic' values from the data
    word = data.word;
    phonetic = data.phonetic;

    // Process the extracted data (e.g., store in variables, update UI)
    console.log("Word:", word);
    console.log("Phonetic:", phonetic);

    // You can now use the 'word' and 'phonetic' variables as needed in your frontend
  } catch (error) {
    console.error(error);
  }
   phoneticsOutput.textContent = phonetic;
}

// Call the function to fetch a random word from the backend



function checkUserAnswer() {
  let userAnswer = userAnswerInput.value;
  if (userAnswer.toLowerCase() === wordFromDictionary) {
    alert("correct");
    userAnswerInput.value = "";
    score++;
    getRandomWordAndPhonetic();
  } else {
    alert("wrong");
  }
}


// async function getRandomWordAndPhonetic() {
//   const url = "https://random-word-api.herokuapp.com/word?length=6";

//   const response = await fetch(url, {
//     headers: {
//       accept: "application/json",
//     },
//   });

//   if (!response.ok) {
//     console.error(response.statusText);
//     console.error(await response.text());
//     return;
//   }

//   const randomWord = await response.json();
//   const word = randomWord[0]; // Extract the word from the response

//   const dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

//   const dictionaryResponse = await fetch(dictionaryUrl, {
//     headers: {
//       accept: "application/json",
//     },
//   });

//   if (!dictionaryResponse.ok) {
//     return getRandomWordAndPhonetic(); // Retry if there is an error
//   }

//   const dictionaryObj = await dictionaryResponse.json();

//   if (
//     !dictionaryObj ||
//     !dictionaryObj[0] ||
//     dictionaryObj[0].phonetic === undefined
//   ) {
//     return getRandomWordAndPhonetic(); // Retry if phonetic is undefined
//   }

//   const phonetic = dictionaryObj[0].phonetic;
//   wordFromDictionary = dictionaryObj[0].word;
//   console.log(wordFromDictionary);
//   console.log(phonetic);

//   phoneticsOutput.textContent = phonetic;
// }
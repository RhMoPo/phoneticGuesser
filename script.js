//Set variables to allow DOManip
const userAnswerInput = document.getElementById("userAnswer");
const phoneticsOutput = document.getElementById("phoneticsOutput");
const submitBtn = document.getElementById("submitBTN");
let dictionaryWord = "";

//On click/ on DOM load - initiate function which generates random word
document.addEventListener("DOMContentLoaded", randoWord);
submitBtn.addEventListener("click", checkUserAnswer);
//API call to generate random word
async function randoWord() {
  //currently only for words with a lenght for three - intention to randomise this in future version || offer difficulty levels - see "?length=3"
  const url = "https://random-word-api.herokuapp.com/word?length=4";
  const response = await fetch(url, {
    header: {
      accept: "application/json",
    },
  });
  if (!response.ok) {
    console.error(response.statusText);
    console.error(await response.text());
    return;
  }
  const randomWord = await response.json();
  //once  the API returns a value, pass it through tothe dictionary API and call function
  dictionaryApi(randomWord);
}

async function dictionaryApi(randomWord) {
  //random word is interpolted into the URL which makes an API request for that specific word
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;
  const response = await fetch(url, {
    header: {
      accept: "application/json",
    },
  });
  //due to the dictionary not having all the words genrated by the  random word api, if an error occurs then we need to call for a new random word, starting the loop again. Errors frequently return in console - causes delay
  if (!response.ok) {
    randoWord();
    return;
  }
  //parsing JSON file
  const dictionarObj = await response.json();
  //storing the phonetic and the word in which the phonetic derives from. Phonetic is needed for question, and the dictionary word is needed to compare and check user answer.
  dictionaryWord = dictionarObj[0].word;
  console.log(dictionaryWord);
  const phonetic = dictionarObj[0].phonetic;
  //sometimes, no error would occur but i would get an undefined messge from DictionaryAPI so I added this checker, which calls the randoWord function again  - probably could use some refinement. if all is good, then the phonetic charcters are saved to the phoneti variable
  if (
    !dictionarObj ||
    !dictionarObj[0] ||
    dictionarObj[0].phonetic === undefined
  ) {
    randoWord();
  } else {
    const phonetic = dictionarObj[0].phonetic;
    console.log(phonetic);
  }

  phoneticsOutput.textContent = phonetic;
}

function checkUserAnswer() {
  let userAnswer = userAnswerInput.value;
  if (userAnswer.toLowerCase() === dictionaryWord) {
    alert("correct");
    userAnswerInput.value = "";
    randoWord();
  } else {
    alert("wrong");
  }
}

//need to work out a way to compare user answer and real answer

// function checkAnswer(userInput, correctWord) {
//   if (userInput.toLowerCase() === correctWord.toLowerCase()) {
//     console.log("Correct answer!");
//   } else {
//     console.log("Incorrect answer. Try again!");
//   }
// }

// submitBtn.addEventListener("click", function () {
//   const userInput = document.getElementById("userInput").value;
//   console.log(userInput);
// });

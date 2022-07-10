// import {wordList} from "./js/words.js";
const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
typingInput = document.querySelector(".typing-input"),
wrongLetter = document.querySelector(".wrong-letter span");
let word, maxGuesses, corrects = [], incorrects = [];

function randomWord(){
  // getting random object form wordlist
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randObj.word; // getting word of random object
  maxGuesses = 8; corrects = []; incorrects = [];
  console.log(word);

  hint.innerHTML = randObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrects;

  let html = "";
  for(let i = 0; i<word.length; i++){
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}

randomWord();

function initGame(e){
  let key = e.target.value;
  if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key} `) && !corrects.includes(key)){
    console.log(key)
    if(word.includes(key)){ // if user letter found in the word
      for(let i=0; i<word.length; i++){
        // Showing matched letter in the input value
        if(word[i] === key){
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else{
      maxGuesses--; // Decrements maxGuesses by 1
      incorrects.push(` ${key} `);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    if(corrects.length === word.length){
      alert(`Game OVer! You found the word ${word.toUpperCase()}`);
      randomWord(); // calling the random function so the game resets
    }else if(maxGuesses < 1){ // If user couldn't found all letter
      alert("Game OVer! You don't have remaining guesses");
      for(let i=0; i<word.length; i++){
        // Showing all letter in the input value
        inputs.querySelectorAll("input")[i].value = word[i];
      }
      randomWord();
    }
  }, );
 
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", ()=>{typingInput.focus()});
inputs.addEventListener("click", ()=>{typingInput.focus()});
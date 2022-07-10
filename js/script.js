// import {wordList} from "./js/words.js";

function randomWord(){
  // getting random object form wordlist
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(randObj);
}

randomWord();
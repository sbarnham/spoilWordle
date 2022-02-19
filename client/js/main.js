
document.addEventListener("DOMContentLoaded", () => {
  let newWord = ""
  createSquares();
  getNewWord();

  let guessedWords = [[]];
  let availableSpace = 1;

  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

 async function getNewWord() {
    var today = new Date();
    var date = [today.getFullYear(),(today.getMonth()+1),today.getDate()];
    var now = [2022,2,19]
    const response = await fetch(`http://${window.location.hostname}:8080/words`)
    const words = await response.json();
    var yr = 365*(date[0]-now[0]);
    var month = 30*(date[1]-now[1]);
    var day = date[2]-now[2];
    var tot = yr + month + day;
    newWord = words[tot];

    return newWord
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  const spoil = document.getElementById('number_add_form')
  const numberposition = document.getElementById('number_list')
  var numberlist = []
  spoil.addEventListener('submit', async function(event){
    event.preventDefault()
    const data = new FormData(spoil)
    const number = data.get('number')
    const numstring = number.toString()
    if (((numstring.length == 11 && numstring.slice(0,2) == '44') || (numstring.length == 12 && numstring.slice(0,3) == '+44')) && (numberlist.includes(number) == false)){
      numberlist.push(number)
      var html = `
      ${number}
      `
      numberposition.innerHTML = numberposition.innerHTML + "<br>" + html + "</br>"
      }
    else{
      alert("Not a valid UK number - please try again")
    }
  })

  function getTileColor(letter, index) {
    const isCorrectLetter = newWord.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = newWord.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArr.join("");

    const response = fetch(`http://${window.location.hostname}:8080/currentWord?newWord=${currentWord}`, {
      method: "GET",
    })
      .then((res) => {
        if (JSON.stringify(res) == "No") {
          window.alert("Word not in word list")
        } else {
          const firstLetterId = guessedWordCount * 5 + 1;
          const interval = 200;
          currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);

              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });

          guessedWordCount += 1;

          if (currentWord === newWord) {
            fetch(`http://${window.location.hostname}:8080/spoil`,{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({numberlist})
            })
            setTimeout(function(){window.alert("Congrats! You found the word. It's being spoiled for the numbers listed now.")}, 3000)

            for (let i = 0; i < keys.length; i++) {
              keys[i].onclick = null
            }
          }
          if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The newWord is ${newWord}.`);
          }

          guessedWords.push([]);
        }
      })
      //.catch(() => {
        //window.alert("Word is not recognised!");
      //});
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
});

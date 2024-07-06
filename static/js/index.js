import { getTextFromBackend } from "./requests.js"

document.addEventListener("DOMContentLoaded", function() {
  let newTextButton = document.getElementById("new-text-button");
  let inputContainer = document.getElementById("input-container");
  let currentPosition = 0;

  newTextButton.addEventListener("click", displayNewText);

  async function displayNewText() {
    let backendText = await getTextFromBackend(20);
    inputContainer.innerHTML = "";
    for (let i = 0; i < backendText.length; ++i) {
      let spanElement = document.createElement("span");
      spanElement.id = `character-${i}`;
      spanElement.textContent = backendText[i];
      inputContainer.appendChild(spanElement);
    }
    currentPosition = 0;
    inputContainer.focus();
    updateCursor();
  }

  inputContainer.addEventListener("keydown", event => evaluateKey(event));

  function evaluateKey(event) {
    event.preventDefault();
    let key = event.key;
    let currentChar = document.getElementById(`character-${currentPosition}`);

    if (!currentChar) return;

    if (key === "Backspace") {
      if (currentPosition > 0) {
        currentPosition--;
        let prevChar = document.getElementById(`character-${currentPosition}`);
        prevChar.classList.remove("correct", "incorrect");
      }
    } else if (key.length === 1) {
      if (key === currentChar.textContent) {
        currentChar.classList.add("correct");
        currentChar.classList.remove("incorrect");
      } else {
        currentChar.classList.remove("correct");
        currentChar.classList.add("incorrect");
      } 
      currentPosition++;
    } 

    currentPosition = Math.min(currentPosition, inputContainer.children.length - 1);
    updateCursor();
  }

  function updateCursor() {
    inputContainer.querySelectorAll('span').forEach(span => span.classList.remove('cursor'));
    
    let currentChar = document.getElementById(`character-${currentPosition}`);
    if (currentChar) {
      currentChar.classList.add('cursor');
    }
  }
});
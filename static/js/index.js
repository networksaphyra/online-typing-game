import { getTextFromBackend } from "./requests.js"

document.addEventListener("DOMContentLoaded", function() {
  let newTextButton = document.getElementById("new-text-button");
  let typingText = document.getElementById("text-to-type");
  let currentText = "";
  let currentPosition = 0;

  newTextButton.addEventListener("click", displayNewText);

  async function displayNewText() {
    const backendText = await getTextFromBackend(10);
    currentText = backendText;
    currentPosition = 0;
    
    typingText.innerHTML = ''; 
    
    backendText.split('').forEach((char, index) => {
      let span = document.createElement('span');
      span.textContent = char;
      span.id = `char-${index}`;
      typingText.appendChild(span);
    });

    typingText.focus();
  }

  typingText.addEventListener("keydown", evaluateKey);

  function evaluateKey(event) {
    event.preventDefault();

    let key = event.key;

    if (key === "Backspace") {
      if (currentPosition > 0) {
        currentPosition--;
        updateCharColor(currentPosition, '');
      }
    } else if (key.length === 1) { 
      if (currentPosition < currentText.length) {
        let isCorrect = key === currentText[currentPosition];
        updateCharColor(currentPosition, isCorrect ? 'green' : 'red');
        currentPosition++;
      }
    }
  }

  function updateCharColor(position, color) {
    let charSpan = document.getElementById(`char-${position}`);
    if (charSpan) {
      charSpan.style.color = color;
    }
  }
});
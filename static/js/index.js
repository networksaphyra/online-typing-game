function getTextFromBackend(text_length) {
  fetch("http://localhost:10001/ss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ length: text_length })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Generated Text:", data.generated_text); 
    displayText(data.generated_text); 
  })
  .catch(error => {
    console.error("Could not get your data, maybe the backend is down:", error);
    displayText("Could not get your data, maybe the backend is down.");
  });
}

let textField = document.getElementById("temporary-text");
let textForm = document.getElementById("textForm");

function displayText(text) {
  textField.textContent = text;
}

textForm.addEventListener("submit", function(event) {
  event.preventDefault(); 

  let inputField = document.getElementById("textInput");
  let textLength = 0;

  try {
    textLength = parseInt(inputField.value);
    if (isNaN(textLength) || textLength < 5 || textLength > 40) {
      throw new Error("Input value must be an integer between 5 and 40"); 
    }
  } catch (error) {
    displayText(error.message);
    return;
  }

  getTextFromBackend(textLength);
});

$(document).ready(function() {
  $("#text-form").on("submit", function(event) {
    event.preventDefault();

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: $("#text-input").val() 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      $("#response").html(data.message); 
    })
    .catch(error => {
      console.error('Error:', error);
      $("#response").html('An error occurred.');
    });
  });
});

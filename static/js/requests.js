export async function getTextFromBackend(text_length) {
  let global = "http://99.250.189.181:10001/get_random_text";
  let local = "http://localhost:8080/get_random_text";

  let options = {
    method: "POST",
    body: JSON.stringify( {"length": text_length} ),
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(local, options);
    const data = await response.json();
    return await data.text;

  } catch (error) {
    console.log("Error", error);
    return { error: "couldn't get data from backend. check the server." };
  }
};

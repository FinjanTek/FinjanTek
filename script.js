const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");

function appendMessage(sender, message) {
  const newMessage = document.createElement("div");
  newMessage.className = "chat-message";
  newMessage.textContent = `${sender}: ${message}`;
  chatLog.appendChild(newMessage);
}

function sendMessage() {
  const userMessage = userInput.value;
  appendMessage("You", userMessage);
  userInput.value = "";

  openai_interaction();

  async function openai_interaction() {
    //contains asynchronous operations (like making API calls) that will be awaited

    var setSystem =
      "Answer my question as if you were a customer service representative from a company called FinjanTek. My question is: ";

    var url = "https://api.openai.com/v1/completions"; //stores the API endpoint for the OpenAI API.
    var xhr = new XMLHttpRequest(); //to make an XMLHttpRequest, that used to send the API request.
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json"); //specify the content type
    xhr.setRequestHeader("Authorization", "Bearer "); //specify API authorization bearer token

    //How to generate the chatbot's response.
    //model: language model that the OpenAI API should use for processing the request
    //
    //temperature: controls the randomness of the chatbot's responses. A higher value (e.g., 0.9) makes the responses more creative and diverse
    //max_tokens: Maximum number of tokens (words or characters)
    //top_p: controls the diversity of the generated response. A value of 1 means the model will consider all possibilities during sampling.
    //frequency_penalty: A value of 0.0 means there is no penalty for repetition.
    //presence_penalty: sets the penalty for generating responses that are unlikely to appear in the training data. (creativity)
    //stop: The chatbot's response will be cut off if it contains either " Human:" or " AI:" in the text.
    var data = `{
      "model": "text-davinci-003",
      "prompt": "${setSystem + userMessage}",
      "temperature": 0.9,
      "max_tokens": 50,
      "top_p": 1,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.6,
      "stop": [" Human:", " AI:"]
    }`;

    xhr.onreadystatechange = function () {
      //When the API request is complete (readyState === 4), the response handling code will be executed
      if (xhr.readyState === 4) {
        const jsonObject = JSON.parse(xhr.responseText);
        const botResponse = jsonObject.choices[0].text;
        appendMessage("FinjanTek", botResponse);
      }
    };

    xhr.send(data); //the API request is sent
  }
}

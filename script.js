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

    var setSystem =
      "Answer my question as if you were a customer service representative from a company called FinjanTek. My question is: ";

    var url = "https://api.openai.com/v1/completions"; 
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.setRequestHeader("Authorization", "Bearer "); 

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
      if (xhr.readyState === 4) {
        const jsonObject = JSON.parse(xhr.responseText);
        const botResponse = jsonObject.choices[0].text;
        appendMessage("FinjanTek", botResponse);
      }
    };

    xhr.send(data); 
  }
}

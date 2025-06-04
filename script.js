const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearChat');
const downloadBtn = document.getElementById('downloadChat');
const themeToggle = document.getElementById('themeToggle');
const micBtn = document.getElementById('micBtn');

const heart=document.getElementById("heart");



// Load theme from storage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  const timestamp = new Date().toLocaleTimeString();
  msg.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}</strong> <small>${timestamp}</small><br>${text}`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  if (sender === 'bot') {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}

function botReply(userInput) {
  // Placeholder GPT logic (replace with fetch to GPT API if needed)
  return "You said: " + userInput;
}


heart.addEventListener("click",function(event){
  heart.textContent="WHY 🤬 ";

  setTimeout(() => {
    heart.textContent="❤️"
  }, 2000);

});




sendBtn.onclick = () => {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    const reply = botReply(text);
    appendMessage(reply, 'bot');
    saveChat();
  }, 800);
};

function saveChat() {
  localStorage.setItem('chatHistory', chatWindow.innerHTML);
}

function loadChat() {
  const saved = localStorage.getItem('chatHistory');
  if (saved) chatWindow.innerHTML = saved;
}
loadChat();

clearBtn.onclick = () => {
  chatWindow.innerHTML = '';
  localStorage.removeItem('chatHistory');
};

downloadBtn.onclick = () => {
  const blob = new Blob([chatWindow.innerText], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'chat_history.txt';
  a.click();
};

// Speech to Text
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'en-US';

micBtn.onclick = () => {
  recognition.start();
};

recognition.onresult = (e) => {
  chatInput.value = e.results[0][0].transcript;
};



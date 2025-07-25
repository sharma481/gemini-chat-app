const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

let isResponseGenerating = false;
let userMessage = null;

// Create message element with classes
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Typing effect
const showTypingEffect = (text, textElement, messageDiv) => {
  const words = text.split(" ");
  let index = 0;
  textElement.innerText = "";

  const interval = setInterval(() => {
    textElement.innerText += (index === 0 ? "" : " ") + words[index++];
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    if (index === words.length) {
      clearInterval(interval);
      isResponseGenerating = false;
      localStorage.setItem("saved-chats", chatContainer.innerHTML);
    }
  }, 75);
};

// Call backend API and show response
const generateResponse = async (incomingDiv) => {
  const textElement = incomingDiv.querySelector(".text");

  try {
   const res = await fetch("/api/gemini", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage }),
});


    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "API Error");
    showTypingEffect(data.reply, textElement, incomingDiv);

  } catch (err) {
    textElement.innerText = err.message;
    incomingDiv.classList.add("error");
    isResponseGenerating = false;
  } finally {
    incomingDiv.classList.remove("loading");
  }
};

const showLoading = () => {
  const html = `
    <div class="message-content">
      <img class="avatar" src="image/gemini.svg" alt="Gemini avatar" />
      <p class="text"></p>
      <div class="loading-indicator">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>
    <span class="icon material-symbols-rounded">content_copy</span>
  `;
  const incomingDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  generateResponse(incomingDiv);
};

const handleChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim();
  if (!userMessage || isResponseGenerating) return;

  isResponseGenerating = true;

  const html = `
    <div class="message-content">
      <img class="avatar" src="image/user.svg" alt="User avatar" />
      <p class="text">${userMessage}</p>
    </div>
  `;
  const userDiv = createMessageElement(html, "outgoing");
  chatContainer.appendChild(userDiv);

  typingForm.reset();
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  setTimeout(showLoading, 500);
};

// Event Listeners
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleChat();
});

suggestions.forEach((suggestion) => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleChat();
  });
});

toggleThemeButton.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light_mode");
  toggleThemeButton.innerText = isLight ? "dark_mode" : "light_mode";
  localStorage.setItem("themeColor", isLight ? "light_mode" : "dark_mode");
});

deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("saved-chats");
    chatContainer.innerHTML = "";
    document.body.classList.remove("hide-header");
  }
});

window.onload = () => {
  const saved = localStorage.getItem("saved-chats");
  const isLight = localStorage.getItem("themeColor") === "light_mode";
  document.body.classList.toggle("light_mode", isLight);
  toggleThemeButton.innerText = isLight ? "dark_mode" : "light_mode";

  if (saved) {
    chatContainer.innerHTML = saved;
    document.body.classList.add("hide-header");
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }
};

A simple and responsive Node.js-based chat interface that connects to Google's Gemini API (gemini-1.5-flash) to provide real-time AI-powered question-answering capabilities.

🚀 Features
Chat with Google Gemini API (1.5 Flash model)

Simple and clean frontend using static files

Uses express.js for backend routing

API key securely loaded using dotenv

Handles and displays AI-generated responses

Built-in error handling

🛠️ Tech Stack
Backend: Node.js, Express.js

Frontend: HTML, CSS, JS (static files in /public)

API: Google Gemini API (Generative Language)

Environment Variables: .env

Package Manager: npm

📁 Project Structure
bash
Copy
Edit

/**************************************************************************/


gemini-chat-app/
├── public/              # Frontend files (index.html, style.css, script.js)
├── .env                 # API Key stored here
├── server.js            # Main Express server
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
/**************************************************************************/

🔑 Environment Variables
Create a .env file in the root directory and add your Gemini API key:

env
Copy
Edit
GEMINI_API_KEY=your_google_gemini_api_key
You can obtain your API key from Google AI Studio.

💬 API Endpoint
POST /api/gemini
Request Body:
json
Copy
Edit
{
  "message": "Your input message to Gemini"
}
Response:
json
Copy
Edit
{
  "reply": "Gemini's generated response"
}
🧪 How to Run
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/sharma481/gemini-chat-app.git
cd gemini-chat-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
Add your Gemini API key in a .env file:

bash
Copy
Edit
GEMINI_API_KEY=your_google_gemini_api_key
4. Start the Server
bash
Copy
Edit
npm start
Visit: http://localhost:3000

✅ Example Usage
Type a message like: What is Node.js?

Get an AI-generated answer from Gemini.



            PROJECT DEMO
/********************************************************/
            <img width="147<img width="1470" height="956" alt="4" src="https://github.com/user-attachments/assets/2053e5b1-afc5-49b2-9877-d89f21df00c4" />
0" height="956" alt="1" src="https://github.com/user-attachments/assets/264edef<img width="1470" height="956" alt="3" src="https://github.com/user-attachments/assets/634b46c2-a0c1-4e86-9bef-e7277d34e399" />
5-15eb-4912-ad73-df135b837807" />
<img width="1470" height="956" alt="2" src="https://github.com/user-attachments/assets/a2db7dce-8d77-4244-b66f-19a6c204b527" />

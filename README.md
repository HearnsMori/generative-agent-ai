# Generative Agent AI Chatbot API

A Node.js + Express backend for a generative AI chatbot.
This server sends user messages to a trained AI model and returns structured JSON responses.

---

## Features

* Send messages to an AI agent via a REST API.
* Handles responses in JSON format, even if the AI returns malformed JSON or extra text.
* CORS enabled for cross-origin requests.
* Configurable AI model endpoint via `.env`.

---

## Prerequisites

* Node.js v18+
* npm

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/generative-agent-ai.git
cd generative-agent-ai
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
MODEL=https://your-trained-model-endpoint
PORT=10000
```

---

## Usage

Start the server:

```bash
node server.js
# or with nodemon
nodemon server.js
```

The server will run at `http://localhost:10000`.

---

## API

### POST `/agent`

Send a message to the AI agent and receive a JSON response.

**Request body:**

```json
{
  "msg": "hello",
  "agentJSON": "{'msg':'hi', 'model':'<indicate your model>', 'random': <true or false>, number: <random number 1 to 100>}"
}
```

**Response:**

```json
{
  "msg": "hi",
  "model": "Google Generative AI",
  "random": true,
  "number": 42
}
```

The server automatically extracts valid JSON from the AI response, even if it contains extra text or uses single quotes.

---

## Environment Variables

* `MODEL` – URL of your trained AI model endpoint.
* `PORT` – Port the server listens on (default: 10000).

---

## Dependencies

* [express](https://www.npmjs.com/package/express) – Web framework.
* [cors](https://www.npmjs.com/package/cors) – Cross-Origin Resource Sharing.
* [axios](https://www.npmjs.com/package/axios) – HTTP requests.
* [dotenv](https://www.npmjs.com/package/dotenv) – Load environment variables from `.env`.

---

## License

MIT License

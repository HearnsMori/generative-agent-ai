// nodejs using express web server for generative agentic functionality
// Algo Idea by Mark Lester Dula & Hearns Mori
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

function extractJsonFromString(msgText) {
    // Extract from first { to last } as before
    const firstBrace = msgText.indexOf('{');
    const lastBrace = msgText.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
        return { msg: msgText }; // fallback
    }

    let jsonStr = msgText.substring(firstBrace, lastBrace + 1);

    // Replace single quotes with double quotes
    jsonStr = jsonStr.replace(/'/g, '"');

    try {
        return JSON.parse(jsonStr);
    } catch (err) {
        console.warn("Failed to parse AI JSON:", err.message);
        return { msg: msgText }; // fallback
    }
}



// POST /agent
app.post('/agent', async (req, res) => {
    const { msg, agentJSON } = req.body;

    const url = process.env.MODEL;
    const payload = {
        user: msg,
        system: (
            "You are a generative agent AI chatbot."
            + "\nYour message should be in this format only, don't add any more: \n"
            + agentJSON
            + "\nRespond only with the required format."
        )
    };

    try {
        const response = await axios.post(url, payload);
        const data = response.data;

        let msgText = response.data.msg || response.data.text || response.data;
        const parsed = extractJsonFromString(msgText);
        return res.json(parsed);
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.json({ msg: `Error fetching data: ${err.message}` });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

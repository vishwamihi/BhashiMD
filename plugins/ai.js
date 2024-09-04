const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    desc: "AI chat.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
        return reply(`${data.data}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`)
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

const axios = require('axios');

// Define the AI API endpoint
const ai_api = 'https://api.vihangayt.com/';

// Function to interact with the AI API
async function coderAi(code) {
    const trimcode = code.trim();
    const url = `ai/codemirror?q=${encodeURIComponent(trimcode)}`;
    try {
        const response = await axios.get(ai_api + url);
        const data = response.data;
        return data.data.prediction || "No prediction available.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "❗An error occurred while processing your request.";
    }
}
//=================
// Define the command
cmd({
    pattern: "codeai",
    fromMe: true,
    desc: "Code With Copilot Mirror",
    type: "ai",
    react: "✨",
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return await reply("_Hello! What code do you need help with?_");
        
        await reply("_Analyzing request..._");

        const processedMsg = await coderAi(q);
        
        await conn.sendMessage(from, {
            text: processedMsg,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363327841612745@newsletter",
                    newsletterName: "ᴄᴏᴅᴇᴀɪ"
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error processing request:", error);
        await reply("❗An error occurred while processing your request. Please try again later.");
    }
});
//==========================================

// Define the Bing Search API base URL
const searchApiBaseUrl = 'https://pure-badlands-26930-091903776676.herokuapp.com/search/bing';

// Function to search Bing via the API
async function searchBing(query) {
    const url = `${searchApiBaseUrl}?query=${encodeURIComponent(query)}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        return data.results || "No results found.";
    } catch (error) {
        console.error("Error fetching Bing search results:", error);
        return "❗An error occurred while processing your request.";
    }
}

// Define the command
cmd({
    pattern: "search",
    fromMe: false, // or set it to false if you want the command to be available for all users
    desc: "Search Bing and retrieve results",
    type: "search",
    react: "🔍", // Reaction emoji
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return await reply("Please provide a query to search.");
        
        await reply("_Searching..._");

        const searchResults = await searchBing(q);
        
        let formattedResults = "Here are the top results:\n\n";
        
        // Format the results if available
        if (Array.isArray(searchResults)) {
            searchResults.slice(0, 5).forEach((result, index) => {
                formattedResults += `${index + 1}. *${result.title}*\n${result.url}\n\n`;
            });
        } else {
            formattedResults = searchResults;
        }

        await conn.sendMessage(from, { text: formattedResults }, { quoted: mek });

    } catch (error) {
        console.error("Error processing search command:", error);
        await reply("❗An error occurred while processing your request. Please try again later.");
    }
});



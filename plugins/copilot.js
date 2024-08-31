const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "copilot",
    desc: "copilot chat.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure 'q' is properly encoded for URL
        const query = encodeURIComponent(q);
        const url = `https://apis.vihangayt.com/ai/codemirror?q=${query}`;

        // Fetch data from the API
        let data = await fetchJson(url);

        // Check if 'data.data' exists and is an object
        if (data && data.data) {
            // Convert object to a formatted JSON string or extract relevant information
            const formattedData = JSON.stringify(data.data, null, 2);
            return reply(`**Response from Copilot:**\n\n${formattedData}`);
        } else {
            return reply("No data received from the API.");
        }
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

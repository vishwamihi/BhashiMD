const { cmd } = require('../command');
const axios = require('axios');

// Function to download and send a song using api-dylux
cmd({
    pattern: "song",
    desc: "Download songs using api-dylux.",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title");

        const apiUrl = `https://api-dylux.com/api/dl/youtube?url=${encodeURIComponent(q)}&apikey=your_api_key`;

        // Fetch song details and download link from api-dylux
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) return reply("No results found");

        const song = data.result;
        const filePath = `./${song.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;

        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎧 *Title* : ${song.title}
⏰ *Duration* : ${song.duration}
📤 *Uploaded On* : ${song.uploaded}
🪩 *Views* : ${song.views}
‎
*🚨🪄 Your Song Download Request is Uploading. You Can See the File in Audio and Document Format.*`;

        await conn.sendMessage(from, { image: { url: song.thumbnail }, caption: desc }, { quoted: mek });

        // Send audio and document messages
        await conn.sendMessage(from, { audio: { url: song.url }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: song.url }, mimetype: "audio/mpeg", fileName: `${song.title}.mp3` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

// Function to download and send a video using api-dylux
cmd({
    pattern: "video",
    desc: "Download videos using api-dylux.",
    category: "download",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title");

        const apiUrl = `https://api-dylux.com/api/dl/youtube?url=${encodeURIComponent(q)}&apikey=your_api_key`;

        // Fetch video details and download link from api-dylux
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) return reply("No results found");

        const video = data.result;
        const filePath = `./${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;

        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎥 *Title* : ${video.title}
⏰ *Duration* : ${video.duration}
📤 *Uploaded On* : ${video.uploaded}
🪩 *Views* : ${video.views}
‎
*🚨🪄 Your Video Download Request is Uploading.*`;

        await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: desc }, { quoted: mek });

        // Send video message
        await conn.sendMessage(from, { video: { url: video.url }, caption: video.title }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

module.exports = {
    // Export any additional functions or variables if needed
};

const config = require('../config');
const { cmd, commands } = require('../command');
const yts = require('yt-search'); // Updated import for yt-search
const fg = require('@bochilteam/scraper');

// Function to download and send a song
cmd({
    pattern: "song",
    desc: "Download songs.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title");

        // Search for the song
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎧 *Title* : ${data.title}
⏰ *Duration* : ${data.timestamp}
📤 *Uploaded On* : ${data.ago}
🪩 *Views* : ${data.views}
‎
*🚨🪄 Your Song Download Request is Uploading. You Can See the File in Audio and Document Format.*`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send audio and document messages
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

// Function to download and send a video
cmd({
    pattern: "video",
    desc: "Download videos.",
    category: "download",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or title");

        // Search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎥 *Title* : ${data.title}
⏰ *Duration* : ${data.timestamp}
📤 *Uploaded On* : ${data.ago}
🪩 *Views* : ${data.views}
‎
*🚨🪄 Your Video Download Request is Uploading.*`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Send video message
        await conn.sendMessage(from, { video: { url: downloadUrl }, caption: data.title }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

module.exports = {
    // You can export any additional functions or variables if needed
};

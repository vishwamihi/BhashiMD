const config = require('../config');
const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

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
        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        const stream = ytdl(url, { format: audioFormat });
        const filePath = `./${data.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;

        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on('finish', async () => {
            try {
                // Send audio and document messages
                await conn.sendMessage(from, { audio: fs.readFileSync(filePath), mimetype: "audio/mpeg" }, { quoted: mek });
                await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "" }, { quoted: mek });
            } catch (sendError) {
                console.error("Error sending file:", sendError);
                reply(`🚫 An error occurred while sending the file: ${sendError.message}`);
            } finally {
                // Delete the temporary file
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
            }
        });

    } catch (e) {
        console.error(e);
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
        const info = await ytdl.getInfo(url);
        const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        const stream = ytdl(url, { format: videoFormat });
        const filePath = `./${data.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;

        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on('finish', async () => {
            try {
                // Send video message
                await conn.sendMessage(from, { video: fs.readFileSync(filePath), caption: data.title }, { quoted: mek });
            } catch (sendError) {
                console.error("Error sending file:", sendError);
                reply(`🚫 An error occurred while sending the file: ${sendError.message}`);
            } finally {
                // Delete the temporary file
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
            }
        });

    } catch (e) {
        console.error(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

module.exports = {
    // You can export any additional functions or variables if needed
};

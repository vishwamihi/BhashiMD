const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

//===========song-dl===========

cmd({
    pattern: "song",
    desc: "Download songs.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🪄 Please provide a song URL or name ✨");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `🪄 *ᴛɪᴛʟᴇ*: ${data.title}\n
> 🎥 *ᴄʜᴀɴɴᴇʟ*: ${data.author.name}
> ⏱️ *ᴛɪᴍᴇ ᴅᴜʀᴀᴛɪᴏɴ*: ${data.timestamp}
> 📅 *ᴜᴘʟᴏᴀᴅᴇᴅ*: ${data.ago}
> 🎬 *ᴠɪᴇᴡꜱ*: ${data.views}
> 🚨 *ʟɪᴋᴇꜱ*: ${data.likes || "N/A"}
> 🔗 *ᴜʀʟ*: ${data.url}

🚨🪄 Your song download request is being processed. You will receive the audio file soon.`;

        // Sending video details with a thumbnail image
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Sending audio file + document message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});


//===========video-dl===========

cmd({
    pattern: "video",
    desc: "Download videos.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a video URL or name ✨");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `🪄 *ᴛɪᴛʟᴇ*: ${data.title}\n
> 🎥 *ᴄʜᴀɴɴᴇʟ*: ${data.author.name}
> ⏱️ *ᴛɪᴍᴇ ᴅᴜʀᴀᴛɪᴏɴ*: ${data.timestamp}
> 📅 *ᴜᴘʟᴏᴀᴅᴇᴅ*: ${data.ago}
> 🎬 *ᴠɪᴇᴡꜱ*: ${data.views}
> 🚨 *ʟɪᴋᴇꜱ*: ${data.likes || "N/A"}
> 🔗 *ᴜʀʟ*: ${data.url}

🚨🪄 Your video download request is being processed. You will receive the video file soon.`;

        // Sending video details with a thumbnail image
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Sending video file + document message
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

const fs = require("fs");
const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "viewonce",
    alias: ["vv"],
    desc: "Download view once messages.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!m.quoted) return reply('Please quote a view once message.');
        if (m.quoted.mtype !== "viewOnceMessage") return reply('Please quote a view once message.');
        
        let buff = await Void.downloadAndSaveMediaMessage(m.quoted);
        await conn.sendFile(from, buff);  // Assuming `conn.sendFile` is the method to send the file
        fs.unlinkSync(buff);  // Delete the file after sending
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

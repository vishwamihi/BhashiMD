const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "alive",
    desc: "Check if the bot is online and send an 'alive' message.",
    category: "main",
    react: "👋🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/BhashiMD/BhashiMD/raw/main/Media/media_Gm.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });

        // Send the image message without buttons
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: config.ALIVE_MSG,
            footer: "> BHASHI-MD"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        await reply(`🚫 Error: ${e.message}`);
    }
});

const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "alive",
    desc: "Check if the bot is online and send an 'alive' message with a menu button.",
    category: "main",
    react: "👋🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/BhashiMD/BhashiMD/raw/main/Media/media_Gm.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Define the buttons
        const buttons = [
            { buttonId: `${command}menu`, buttonText: { displayText: 'Menu' }, type: 1 }
        ];
        
        // Button message configuration
        const buttonMessage = {
            image: { url: config.ALIVE_IMG },
            caption: "Hello! Click the button below to see the menu.",
            footer: "Powered by BHASHI-MD",
            buttons: buttons,
            headerType: 4 // Indicates an image and buttons
        };

        // Send the button message
        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        await reply(`Error: ${e.message}`);
    }
});

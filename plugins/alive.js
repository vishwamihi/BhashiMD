const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "alive",
    desc: "Check if the bot is online and send an 'alive' message with a menu button.",
    category: "main",
    react: "👋🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the audio message first
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/BhashiMD/BhashiMD/raw/main/Media/media_Gm.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Then send the image with the alive message
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: config.ALIVE_MSG
        }, { quoted: mek });

        // Define the buttons
        const buttons = [
            {
                buttonId: `${isCmd}menu`, // Button ID to call the menu command
                buttonText: { displayText: 'Menu' },
                type: 1
            }
        ];
        
        // Button message configuration
        const buttonMessage = {
            contentText: 'Hello! Click the button below to see the menu.',
            footerText: 'Powered by BHASHI-MD',
            buttons: buttons,
            headerType: 1 // Indicates that the message has buttons
        };

        // Send the button message
        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

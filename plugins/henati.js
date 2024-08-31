const axios = require('axios');
const { cmd } = require('../command'); // Adjust the path if necessary

cmd({
    pattern: 'hentai',
    desc: 'Fetches NSFW Waifu images',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure this command works only in groups
        if (!isGroup && !isOwner) {
            return reply('⚠️ This command is reserved for groups only.');
        }

        const url = 'https://api.waifu.pics/nsfw/waifu'; // API endpoint for Waifu images

        // Fetch and send 5 images
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            // Send the image
            await conn.sendMessage(from, { image: { url: imageUrl } }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

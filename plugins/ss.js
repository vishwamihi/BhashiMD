const { cmd } = require('../command');
const axios = require('axios'); // Ensure you have axios installed or use a different HTTP client
const { getBuffer } = require('../utils'); // Implement this function to get the buffer from a URL

cmd({
    pattern: 'ss',
    desc: 'Screenshots a website',
    category: 'General',
    react: '🎥',
    fromMe: true
}, async (conn, mek, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply('❌ Please provide a link. Example: .ss https://example.com');
        }

        const url = args.join(' ');
        const screenshotUrl = `https://api.screenshotmachine.com/?key=YOUR_API_KEY&url=${encodeURIComponent(url)}&dimension=720x720`;

        // Fetch the screenshot image buffer
        const response = await axios.get(screenshotUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Send the image
        await conn.sendMessage(from, { image: imageBuffer, caption: 'Powered by *Your Service Name*' }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`🚫 An error occurred: ${error.message}`);
    }
});

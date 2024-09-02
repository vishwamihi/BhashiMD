const axios = require('axios');
const { cmd, commands } = require('../command');

// Short URL command
cmd({
  pattern: "shorturl",
  desc: "Create a short URL using TinyURL API.",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("⚠️ Please provide a URL to shorten.");

    const longUrl = q.trim();
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

    const response = await axios.get(apiUrl);
    const shortUrl = response.data;

    const resultMessage = `
🔗 **URL Shortener**

🌐 **Original URL:** ${longUrl}
✂️ **Shortened URL:** ${shortUrl}

You can now use this short URL to share your link more easily! 🌟
`;
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek });
  } catch (e) {
    console.error('Error shortening URL:', e.message);
    reply(`❌ An error occurred while shortening the URL: ${e.message}`);
  }
});

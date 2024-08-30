const { cmd } = require('../command');
const fs = require('fs').promises;
const axios = require('axios');
const FormData = require('form-data');

cmd({
    pattern: "tourl",
    desc: "Convert a file to a URL",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { from, quoted, pushname }) => {
    if (!quoted) {
        return conn.sendMessage(from, { text: "❌ Please reply to a file, image, or video to convert it to a URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ Processing your file..." }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const mediaMessage = await conn.downloadAndSaveMediaMessage(quoted);
        const fileData = await fs.readFile(mediaMessage);
        const fileStats = await fs.stat(mediaMessage);

        const form = new FormData();
        form.append('file', fileData, {
            filename: 'file',
            contentType: quoted.mimetype,
        });

        const response = await axios.post('https://telegra.ph/upload', form, {
            headers: form.getHeaders()
        });

        if (response.data && response.data[0] && response.data[0].src) {
            const fileUrl = 'https://telegra.ph' + response.data[0].src;
            const fileSizeInMB = (fileStats.size / (1024 * 1024)).toFixed(2);
            
            const caption = `
╭─『 FILE TO URL 』───⊷
│
│ ✨ *Requester:* ${pushname}
│ 🤖 *Bot:* BHASHI-MD
│ 📁 *File Size:* ${fileSizeInMB} MB
│ 🔗 *URL:* ${fileUrl}
│
│ 🌐 Your file has been converted to a URL!
╰────────────────────⊷
            `.trim();

            await conn.sendMessage(from, { text: caption }, { quoted: mek });
            await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        } else {
            throw new Error('Failed to get URL from response');
        }
    } catch (error) {
        console.error('Error in tourl command:', error);
        await conn.sendMessage(from, { text: `❌ An error occurred: ${error.message}` }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

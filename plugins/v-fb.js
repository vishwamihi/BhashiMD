const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

// Fetch API URL
let baseUrl;
(async () => {
    try {
        let baseUrlGet = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
        baseUrl = baseUrlGet.api;
    } catch (error) {
        console.error('Error fetching base URL:', error);
    }
})();

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Facebook Downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "Download Facebook videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid Facebook URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ *Downloading...*" }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${encodeURIComponent(q)}`);

        const fileInfo = data.data || data;
        const captionHeader = `
╭─『 FACEBOOK DL 』───⊷
│
│ ✨ *Requester*: ${pushname}
│ 🤖 *Bot*: BHASHI-MD
│ 📄 *File Name:* ${fileInfo.fileName || fileInfo.title || 'Not available'}
│ 📦 *Size:* ${formatFileSize(fileInfo.fileSize || fileInfo.size || 0)}
│ 📎 *Type:* ${fileInfo.mimeType || fileInfo.file_type || 'Not available'}
│
│ 🤷‍♀️ *We Will Send Your FACEBOOK Content*
╰────────────────────⊷`.trim();

        const videoInfo = fileInfo;
        const caption = `${captionHeader}\n\n> BHASHI-MD`.trim();

        // Prepare quality options
        const qualities = Object.entries(videoInfo)
            .filter(([key, value]) => typeof value === 'string' && value.startsWith('http'))
            .map(([key, value]) => ({ quality: key, url: value }));

        // Send quality selection message
        let qualityMessage = "Available qualities:\n";
        qualities.forEach((q, index) => {
            qualityMessage += `${index + 1}. ${q.quality}\n`;
        });
        qualityMessage += "\nReply with the number of your chosen quality (e.g., '1' for highest quality).";

        await conn.sendMessage(from, { text: qualityMessage }, { quoted: mek });

        // Wait for user's quality selection
        const qualityResponse = await new Promise((resolve) => {
            const messageHandler = (m) => {
                const msg = m.messages[0];
                if (msg.key.remoteJid === from) {
                    conn.ev.off('messages.upsert', messageHandler);
                    resolve(msg.message.conversation);
                }
            };
            conn.ev.on('messages.upsert', messageHandler);
        });

        let selectedQuality;
        if (qualityResponse) {
            selectedQuality = parseInt(qualityResponse) - 1;
        }

        if (selectedQuality >= 0 && selectedQuality < qualities.length) {
            const chosenQuality = qualities[selectedQuality];
            await conn.sendMessage(from, { video: { url: chosenQuality.url }, caption: `Selected Quality: ${chosenQuality.quality}\n\n${caption}` }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: "Invalid selection. Sending the highest available quality." }, { quoted: mek });
            await conn.sendMessage(from, { video: { url: qualities[0].url }, caption: `Selected Quality: ${qualities[0].quality}\n\n${caption}` }, { quoted: mek });
        }

        if (videoInfo.audio) {
            await conn.sendMessage(from, { 
                audio: { url: videoInfo.audio }, 
                mimetype: "audio/mpeg",
                caption: `🎵 Audio extracted from FACEBOOK video`
            }, { quoted: mek });
        }

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
        console.error(`Error in Facebook downloader:`, error);
        await conn.sendMessage(from, { text: `❌ An error occurred: ${error.message}` }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

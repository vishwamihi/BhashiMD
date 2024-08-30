const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');
const moment = require('moment');

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

// Helper function for downloading and sending media
async function downloadAndSendMedia(conn, mek, from, url, apiEndpoint, mediaType, pushname) {
    if (!url || !url.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ *Downloading...*" }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const data = await fetchJson(`${baseUrl}/api/${apiEndpoint}?url=${encodeURIComponent(url)}`);

        const fileInfo = data.data || data;
        const captionHeader = `
╭─『 ${apiEndpoint.toUpperCase().replace('DL', ' DL')} 』───⊷
│
│ ✨ *Requester*: ${pushname}
│ 🤖 *Bot*: BHASHI-MD
│ 📄 *File Name:* ${fileInfo.fileName || fileInfo.title || 'Not available'}
│ 📦 *Size:* ${formatFileSize(fileInfo.fileSize || fileInfo.size || 0)}
│ 📎 *Type:* ${fileInfo.mimeType || fileInfo.file_type || 'Not available'}
│
│ 🤷‍♀️ *We Will Send Your ${apiEndpoint.replace('dl', '').toUpperCase()} Content*
╰────────────────────⊷`.trim();

        if (mediaType === 'video') {
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
                // Timeout after 30 seconds
                setTimeout(() => {
                    conn.ev.off('messages.upsert', messageHandler);
                    resolve(null);
                }, 30000);
            });

            let selectedQuality;
            if (qualityResponse) {
                selectedQuality = parseInt(qualityResponse) - 1;
            }

            if (selectedQuality >= 0 && selectedQuality < qualities.length) {
                const chosenQuality = qualities[selectedQuality];
                await conn.sendMessage(from, { video: { url: chosenQuality.url }, caption: `Selected Quality: ${chosenQuality.quality}\n\n${caption}` }, { quoted: mek });
            } else {
                await conn.sendMessage(from, { text: "Invalid selection or no response. Sending the highest available quality." }, { quoted: mek });
                await conn.sendMessage(from, { video: { url: qualities[0].url }, caption: `Selected Quality: ${qualities[0].quality}\n\n${caption}` }, { quoted: mek });
            }

            if (videoInfo.audio) {
                await conn.sendMessage(from, { 
                    audio: { url: videoInfo.audio }, 
                    mimetype: "audio/mpeg",
                    caption: `🎵 Audio extracted from ${apiEndpoint.replace('dl', '').toUpperCase()} video`
                }, { quoted: mek });
            }
        } else if (mediaType === 'document') {
            const caption = `${captionHeader}\n\n> BHASHI-MD`.trim();

            await conn.sendMessage(from, { 
                document: { url: fileInfo.download || fileInfo.link || fileInfo.url }, 
                fileName: fileInfo.fileName || fileInfo.title, 
                mimetype: fileInfo.mimeType || fileInfo.file_type,
                caption: caption
            }, { quoted: mek });
        }

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
        console.error(`Error in ${apiEndpoint}:`, error);
        await conn.sendMessage(from, { text: `❌ An error occurred: ${error.message}` }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
}

// Facebook Downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "Download Facebook videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    await downloadAndSendMedia(conn, mek, from, q, 'fdown', 'video', pushname);
});

// Twitter Downloader
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "Download Twitter videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    await downloadAndSendMedia(conn, mek, from, q, 'twitterdl', 'video', pushname);
});

// Google Drive Downloader
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    await downloadAndSendMedia(conn, mek, from, q, 'gdrivedl', 'document', pushname);
});

// Mediafire Downloader
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "Download Mediafire files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    await downloadAndSendMedia(conn, mek, from, q, 'mediafiredl', 'document', pushname);
});

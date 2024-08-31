const { cmd } = require('../command');
const fbDownloader = require('fb-downloader-scrapper');

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
        const result = await fbDownloader(q);
        
        if (!result || !result.length) {
            throw new Error("No downloadable content found.");
        }

        const hdVideo = result.find(v => v.quality === 'hd');
        const sdVideo = result.find(v => v.quality === 'sd');

        if (!hdVideo && !sdVideo) {
            throw new Error("No video qualities available.");
        }

        const captionHeader = `
╭─『 FACEBOOK DL 』───⊷
│
│ ✨ *Requester*: ${pushname}
│ 🤖 *Bot*: BHASHI-MD
│ 📄 *Title:* ${result[0].title || 'Not available'}
│
│ 🤷‍♀️ *We Will Send Your FACEBOOK Content*
╰────────────────────⊷`.trim();

        const caption = `${captionHeader}\n\n> BHASHI-MD`.trim();

        // Send quality selection message
        let qualityMessage = "Available qualities:\n";
        qualityMessage += sdVideo ? "1.1 SD\n" : "";
        qualityMessage += hdVideo ? "1.2 HD\n" : "";
        qualityMessage += "\nReply with your chosen quality (1.1 or 1.2) within 30 seconds.";

        await conn.sendMessage(from, { text: qualityMessage }, { quoted: mek });

        // Wait for user's quality selection with a 30-second timeout
        const qualityResponse = await Promise.race([
            new Promise((resolve) => {
                const messageHandler = (m) => {
                    const msg = m.messages[0];
                    if (msg.key.remoteJid === from) {
                        conn.ev.off('messages.upsert', messageHandler);
                        resolve(msg.message.conversation);
                    }
                };
                conn.ev.on('messages.upsert', messageHandler);
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Response timeout")), 30000))
        ]);

        let selectedVideo;
        if (qualityResponse === "1.1" && sdVideo) {
            selectedVideo = sdVideo;
        } else if (qualityResponse === "1.2" && hdVideo) {
            selectedVideo = hdVideo;
        } else {
            selectedVideo = hdVideo || sdVideo; // Default to HD if available, otherwise SD
            await conn.sendMessage(from, { text: "Invalid or no selection. Sending the best available quality." }, { quoted: mek });
        }

        await conn.sendMessage(from, { 
            video: { url: selectedVideo.url }, 
            caption: `Selected Quality: ${selectedVideo.quality.toUpperCase()}\n\n${caption}`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
        console.error(`Error in Facebook downloader:`, error);
        await conn.sendMessage(from, { text: `❌ An error occurred: ${error.message}` }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

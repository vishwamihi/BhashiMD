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

// Mediafire Downloader
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "Download Mediafire files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid Mediafire URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ *ᴅʟ ʙʏ ʙʜᴀꜱʜɪ-ᴍᴅ...*" }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${encodeURIComponent(q)}`);

        const fileInfo = data.data || data;
        const captionHeader = `
╭─『 *ᴍᴇᴅɪᴀꜰɪʀᴇ ᴅʟ* 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname}
│ 🤖 *ʙᴏᴛ*: BHASHI-MD
│ 📄 *ꜰɪʟᴇ ɴᴀᴍᴇ:* ${fileInfo.fileName || fileInfo.title || 'Not available'}
│ 📦 *ꜱɪᴢᴇ:* ${formatFileSize(fileInfo.fileSize || fileInfo.size || 0)}
│ 📎 *ᴛʏᴘᴇ:* ${fileInfo.mimeType || fileInfo.file_type || 'Not available'}
│
│ 🤷‍♀️ _We Will Send Your MEDIAFIRE Content_
╰────────────────────⊷`.trim();

        const caption = `${captionHeader}\n\n> BHASHI-MD`.trim();

        await conn.sendMessage(from, { 
            document: { url: fileInfo.download || fileInfo.link || fileInfo.url }, 
            fileName: fileInfo.fileName || fileInfo.title, 
            mimetype: fileInfo.mimeType || fileInfo.file_type,
            caption: caption
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
        console.error(`Error in Mediafire downloader:`, error);
        await conn.sendMessage(from, { text: `❌ An error occurred: ${error.message}` }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

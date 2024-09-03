const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

// Fetch API URL
let baseUrl;
(async () => {
    try {
        let baseUrlGet = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
        baseUrl = baseUrlGet.api;
    } catch (error) {
        console.error('❌ Error fetching base URL:', error);
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

// Google Drive Downloader with size limit (e.g., 100MB limit)
const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 100 MB

cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid Google Drive URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ *ᴅʟ ʙʏ ʙʜᴀꜱʜɪ-ᴍᴅ...*" }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
        const fileInfo = data.data || data;

        // Check if file size exceeds the limit
        const fileSize = fileInfo.fileSize || fileInfo.size || 0;
        if (fileSize > MAX_DOWNLOAD_SIZE) {
            await conn.sendMessage(from, { text: `⚠️ The file size is too large. Maximum allowed size is 500 MB. The provided file is ${formatFileSize(fileSize)}.` }, { quoted: mek });
            return await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        }

        const captionHeader = `
╭─『 *ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ ᴅʟ* 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname}
│ 🤖 *ʙᴏᴛ*: BHASHI-MD
│ 📄 *ꜰɪʟᴇ ɴᴀᴍᴇ:* ${fileInfo.fileName || fileInfo.title || 'Not available'}
│ 📦 *ꜱɪᴢᴇ:* ${formatFileSize(fileSize)}
│ 📎 *ᴛʏᴘᴇ:* ${fileInfo.mimeType || fileInfo.file_type || 'Not available'}
│
│ 🤷‍♀️ _Your Google Drive content is on its way!_
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
        console.error('❌ Error in Google Drive downloader:', error);
        const errorMessage = error.response && error.response.status === 404 
            ? '❌ Error: The requested file could not be found. Please check the URL and try again.'
            : `❌ An error occurred: ${error.message}`;

        await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

const { cmd } = require('../command');
const apiDylux = require('api-dylux'); // Adjust if necessary based on the actual import
const { promisify } = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);

cmd({
    pattern: "scdl",
    desc: "Download audio from SoundCloud.",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a SoundCloud URL.");

        // Initialize api-dylux (adjust if necessary based on the actual API)
        const soundcloud = new apiDylux.SoundCloud();

        // Fetch audio data
        const data = await soundcloud.download(q);

        if (!data || !data.url) return reply("No results found or an error occurred.");

        const { title, url, thumbnail } = data;

        let desc = `*SoundCloud Audio Downloader*\n\n` +
            `🎵 *Title:* ${title}\n` +
            `🔗 *Download URL:* ${url}\n` +
            `📷 *Thumbnail:* ${thumbnail}\n\n` +
            `*🚨 Your audio is being prepared. You can download it using the provided URL.*`;

        // Send message with details and download URL
        await conn.sendMessage(from, { image: { url: thumbnail }, caption: desc }, { quoted: mek });

        // Send the audio file directly
        await conn.sendMessage(from, { audio: { url: url }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

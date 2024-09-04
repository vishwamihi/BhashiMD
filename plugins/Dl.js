const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');

// Fetch Base API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
    baseUrl = baseUrlGet.api;
})();

const yourName = "> *©️ʙʜᴀꜱʜɪ-ᴍᴅ-ᴅʟ*";

// Facebook Video Downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "📹 Download Facebook videos",
    category: "download",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❗ Please provide a valid Facebook URL. Example: `.fb https://fb.watch/xyz`");
        
        // Fetch data from API
        let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        
        reply("📥 *Fetching your Facebook video...*");
        
        // Send HD video
        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: `✨ *Here is your HD video* ✨\n\n${yourName}` }, { quoted: mek });
        
        // Send SD video
        await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: `✨ *Here is your SD video* ✨\n\n${yourName}` }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error occurred while downloading the video: ${e.message}`);
    }
});

// Twitter Video Downloader
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "🐦 Download Twitter videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❗ Please provide a valid Twitter URL. Example: `.twitter https://twitter.com/xyz`");
        
        // Fetch data from API
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`);
        
        reply("📥 *Fetching your Twitter video...*");
        
        // Send HD video
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `✨ *Here is your HD video* ✨\n\n${yourName}` }, { quoted: mek });
        
        // Send SD video
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `✨ *Here is your SD video* ✨\n\n${yourName}` }, { quoted: mek });
        
        // Send Audio
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg", caption: `🎧 *Here is your audio* 🎧\n\n${yourName}` }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error occurred while downloading the media: ${e.message}`);
    }
});

// Mediafire Downloader
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "📂 Download MediaFire files",
    category: "download",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❗ Please provide a valid MediaFire URL. Example: `.mediafire https://mediafire.com/xyz`");
        
        // Fetch data from API
        let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`);
        
        reply("📥 *Fetching your MediaFire file...*");
        
        // Send the file as a document
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: `🗂️ *Here is your file:* ${data.data.name}\n\n${yourName}` }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error occurred while downloading the file: ${e.message}`);
    }
});

// APK Downloader

cmd({
    pattern: "apk",
    alias: ["modapk"],
    desc: "download apks",
    category: "download",
    react: "⚡",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("❗Apk Not Found,Sorry")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/apkdl?url=${q}`)
        reply("*plase waite...*")
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: cap }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

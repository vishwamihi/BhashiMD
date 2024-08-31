const config = require('../config')
const { cmd, commands } = require('../command')
const yts = require('yts')
const fg = require('@bochilteam/scraper')

// ... [Previous commands remain unchanged]

// Function to download and send a song
cmd({
    pattern: "song",
    desc: "download songs.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if(!q) return reply("Please give me url or title")
        const search = await yts(q)
        const data = search.videos[0];
        const url = data.url
        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎧 ‎*ᴛɪᴛʟᴇ* : ${data.title}
⏰ *ᴛɪᴍᴇ ᴅᴜʀᴀᴛɪᴏɴ* : ${data.timestamp}
📤 *ᴜᴘʟᴏᴀᴅᴇ ᴏɴ* : ${data.ago}
🪩 *ᴠɪᴇᴡꜱ* : ${data.views}
‎
*🚨🪄 Your Song Download Request Uploading Fallowing. You Can See File Audio Type And Document Type.*`
        await conn.sendMessage(from, {image:{url: data.thumbnail}, caption:desc}, {quoted:mek});
        //download audio
        let down = await fg.yta(url)
        let downloadUrl = down.dl_url
        //send audio + document message
        await conn.sendMessage(from, {audio: {url:downloadUrl}, mimetype:"audio/mpeg"}, {quoted:mek})
        await conn.sendMessage(from, {document: {url:downloadUrl}, mimetype:"audio/mpeg", fileName:data.title + ".mp3", caption:""}, {quoted:mek})
    } catch(e) {
        console.log(e)
        reply(`${e}`)
    }
})

// Function to download and send a video
cmd({
    pattern: "video",
    desc: "download videos.",
    category: "download",
    react: "🎥",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if(!q) return reply("Please give me url or title")
        const search = await yts(q)
        const data = search.videos[0];
        const url = data.url
        let desc = `‎‎*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
🎥 ‎*ᴛɪᴛʟᴇ* : ${data.title}
⏰ *ᴛɪᴍᴇ ᴅᴜʀᴀᴛɪᴏɴ* : ${data.timestamp}
📤 *ᴜᴘʟᴏᴀᴅᴇ ᴏɴ* : ${data.ago}
🪩 *ᴠɪᴇᴡꜱ* : ${data.views}
‎
*🚨🪄 Your Video Download Request Uploading Fallowing.*`
        await conn.sendMessage(from, {image:{url: data.thumbnail}, caption:desc}, {quoted:mek});
        //download video
        let down = await fg.ytv(url)
        let downloadUrl = down.dl_url
        //send video message
        await conn.sendMessage(from, {video: {url:downloadUrl}, caption:data.title}, {quoted:mek})
    } catch(e) {
        console.log(e)
        reply(`${e}`)
    }
})

module.exports = {
    // You can export any additional functions or variables if needed
}

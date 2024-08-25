const { tiktokdl } = require('tiktokdl')
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var monspace ='```'

cmd({
    pattern: "tt",
    alias: ["tiktok"],
    react: '🎵',
    desc: "Download TikTok videos",
    category: "download",
    use: '.tt <tiktok link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await reply('*🚫 Please provide a TikTok URL! 🚫*')

let wm = `
╭─『 TIKTOK DL 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname}
│ 🤖 *ʙᴏᴛ*: BHASHI-MD
│  
│ 🤷‍♀️ _We Will Send Your tiktok Video And Audio_
╰────────────────────⊷

> BHASHI-MD`

let wwm = 'BHASHI-MD'
let response = await tiktokdl(q)
let { video } = response
let { music } = response

await conn.sendMessage(from, { video: { url: video }, caption: wm}, { quoted: mek })
await conn.sendMessage(from, { audio: { url: music }, mimetype:"audio/mpeg"}, { quoted: mek })

return await conn.sendMessage(from, { react: { text: '🎉', key: mek.key }})
} catch (e) {
reply('❌ Error occurred while processing your request! ❌')
console.log(e)
}
})

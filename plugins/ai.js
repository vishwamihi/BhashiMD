const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    desc: "AI chat.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
        return reply(`${data.data}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`)
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

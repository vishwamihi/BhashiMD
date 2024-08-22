const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require(`../lib/functions`)
cmd({
    pattern: "system",
    alias : ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    react: "🧬",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡*

⏰ 𝗨𝗽 𝗧𝗶𝗺𝗲 : ${runtime(process.uptime())}
📻 𝗥𝗮𝗺 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
⚙️ 𝗛𝗼𝘀𝘁 : ${os.hostname()}
👑 𝗢𝘄𝗻𝗲𝗿 : OFC Bhashitha

Bhashi MD Very Powerful Whatsapp Bot. Base Build Using By Baileys API Keys.‎`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
} )

  

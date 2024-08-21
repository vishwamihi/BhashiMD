const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require(`../lib/functions`)
cmd({
    pattern: "system",
    alias : ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
‎ 
┏━━━┫  𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡
┃
┃ ⏰ 𝗨𝗽 𝗧𝗶𝗺𝗲 : 
┃ 📻 𝗥𝗮𝗺 𝗨𝘀𝗮𝗴𝗲 :
┃ ⚙️ 𝗛𝗼𝘀𝘁 :
┃ 👑 𝗢𝘄𝗻𝗲𝗿 : OFC Bhashitha 
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
} )

  

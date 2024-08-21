const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require(`../lib/functions`)
cmd({
    pattern: "test",
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `

*YOUR TEST JS SUCESSFULL*

> ᴘᴏᴡᴇʀᴅ ʙʏ ᴏꜰᴄ ʙʜᴀꜱʜɪᴛʜᴀ

`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
} )

  

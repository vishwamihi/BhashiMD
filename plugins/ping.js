const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
        const endTime = Date.now()
        const ping = endTime - startTime
        
        const buttons = [
            {buttonId: '.menu', buttonText: {displayText: 'Menu'}, type: 1}
        ]

        const buttonMessage = {
            text: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms`,
            footer: 'Click the button below to see the menu',
            buttons: buttons,
            headerType: 1
        }

        await conn.sendMessage(from, buttonMessage, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

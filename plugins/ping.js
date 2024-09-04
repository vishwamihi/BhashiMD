const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping response with newsletter forwarding information
        await conn.sendMessage(from, { 
            text: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping}ms`,
            footer: '> BHASHI-MD',
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363327841612745@newsletter", 
                    newsletterName: "sᴏɴɢ ʟʏʀɪᴄs" 
                }
            }
        }, { quoted: message });
        
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

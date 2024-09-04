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
            footer: '*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*',
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363237238158413@newsletter", 
                    newsletterName: "🇧​🇭​🇦​🇸​🇭​🇮​-🇲​🇩​" 
                }
            }
        }, { quoted: message });
        
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

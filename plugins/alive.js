const config = require('../config');
const { cmd } = require('../command');
const os = require('os'); // For system information

// Helper function to detect platform
function detectPlatform() {
    if (process.env.REPL_ID) return 'Replit';
    if (process.env.HEROKU_APP_NAME) return 'Heroku';
    if (process.env.KOYEB_PROJECT_ID) return 'Koyeb';
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) return 'AWS Lambda';
    if (process.env.VERCEL) return 'Vercel';
    return 'Unknown Platform';
}

// Define the platform
const PLATFORM = detectPlatform();

cmd({
    pattern: "alive",
    desc: "Check if the bot is online and send an 'alive' message with system info.",
    category: "main",
    react: "👋🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // System information
        const systemInfo = `
> *ᴘʟᴀᴛꜰᴏʀᴍᴇ* : ${PLATFORM}
> *ᴜᴘᴛɪᴍᴇ* : ${formatUptime(os.uptime())}
> *ᴛᴏᴛᴀʟ ʀᴀᴍ* : ${formatFileSize(os.totalmem())}
> *ꜰʀᴇᴇ ʀᴀᴍ* : ${formatFileSize(os.freemem())}
        `.trim();

        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/DarkYasiyaofc/VOICE/blob/main/hi.mp3?raw=true' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });

        // Send the image message with system info and description
        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/5rm6dLz/image.png' },
            caption: `
 𝙃𝙀𝙇𝙇𝙊 𝙄 𝘼𝙈 𝙊𝙉𝙇𝙄𝙉𝙀

_A Bhashi Md Whatsapp Bot Based Third Party Application Provide Many Services With A Real Time Automated Conversational Experience. Enjoy._

${systemInfo}

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*

            `.trim(),
            footer: '*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*',
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363237238158413@newsletter", 
                    newsletterName: "🇧​🇭​🇦​🇸​🇭​ɪ​ - 🇲​🇩​" 
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error('🚫 Error:', e);
        await reply(`🚫 Error: ${e.message}`);
    }
});

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600*24));
    const hours = Math.floor(seconds % (3600*24) / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}



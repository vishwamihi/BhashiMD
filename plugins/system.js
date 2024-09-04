const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "system",
    alias: ["status", "botinfo"],
    desc: "Check uptime, RAM usage, CPU info, and more",
    category: "main",
    react: "🧬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
        const cpuArch = os.arch();
        const cpuCores = os.cpus().length;
        const systemPlatform = os.platform();
        const systemType = os.type();
        const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

        let status = `
────⚙️ 𝘽𝙃𝘼𝙎𝙃𝙄-𝙈𝘿 𝙎𝙔𝙎𝙏𝙀𝙈 ⚙️───

A Bhashi Md Whatsapp Bot Based Third Party Application Provide Many Services With A Real Time Automated Conversational Experience. Enjoy.

                     SYSTEM INFO
                   ──────────
> ⏱️ ᴜᴘᴛɪᴍᴇ : ${uptime}
> 🪄 ʀᴀᴍ ᴜꜱᴀɢᴇ : ${memoryUsage} MB / ${totalMemory} MB
> 🖥️ ᴄᴘᴜ ᴀʀᴄʜɪᴛᴇᴄᴛᴜʀᴇ : ${cpuArch}
> ⚙️ ᴄᴘᴜ ᴄᴏʀᴇꜱ : ${cpuCores}
> 🌐 ᴘʟᴀᴛꜰᴏʀᴍᴇ : ${systemPlatform}
> ❄️ ꜱʏꜱᴛᴇᴍ ᴛʏᴘᴇꜱ : ${systemType}
> 🛡️ ʜᴏꜱᴛ : ${os.hostname()}

                  DEVELOPER INFO
               ─────────────
> 👑 ᴏᴡɴᴇʀ : OFC Bhashitha
> 🧑‍💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ : Vishwa Mihiranga

ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ
ᴘᴏᴡᴇʀᴅ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ`;

        // Send the image with status as caption
        await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/xgGPSSz/image.png" },
            caption: status
        });

    } catch (e) {
        console.log(e);
        reply(`*Error:* ${e.message}`);
    }
});

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
        *📊 ʙʜᴀꜱʜɪ-ᴍᴅ ꜱʏꜱᴛᴇᴍ ɪɴꜰᴏ ✅*

        ⏰ *ᴜᴘᴛɪᴍᴇ :* ${uptime}
        💾 *ʀᴀᴍ ᴜꜱᴀɢᴇ :* ${memoryUsage} MB / ${totalMemory} MB
        🖥️ *ᴄᴘᴜ ᴀʀᴄʜɪᴛᴇᴄᴛᴜʀᴇ :* ${cpuArch}
        ⚙️ *ᴄᴘᴜ ᴄᴏʀᴇꜱ :* ${cpuCores}
        🌐 *ᴘʟᴀᴛꜰᴏʀᴍᴇ :* ${systemPlatform}
        🏠 *ꜱʏꜱᴛᴇᴍ ᴛʏᴘᴇꜱ :* ${systemType}
        🆓 *ꜰʀᴇᴇ ᴍᴇᴍᴘʀʏ :* ${freeMemory} MB
        📻 *ʜᴏꜱᴛ :* ${os.hostname()}
        👑 *ᴏᴡɴᴇʀ :* OFC Bhashitha
        👾 *ᴅᴇᴠᴇʟᴏᴘᴇʀ :* Vishwa Mihiranga

        *Have a great day!* 🪄
        `;

        return reply(status);
    } catch (e) {
        console.log(e);
        reply(`*Error:* ${e.message}`);
    }
});

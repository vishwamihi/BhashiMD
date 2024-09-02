const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ai",
    desc: "AI chat.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a query.");
        
        // Fetch response from the GPT API
        let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(q)}`);

        if (data && data.data) {
            // Return the AI's response to the user with contextInfo
            return conn.sendMessage(from, {
                text: `${data.data}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true
                }
            }, { quoted });
        } else {
            return reply("Sorry, I couldn't get a response from the AI. Please try again.");
        }
    } catch (e) {
        // Log the error and send the error message to the user
        console.error(e);
        return reply(`An error occurred: ${e.message}`);
    }
});

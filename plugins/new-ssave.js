const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ssave",
    desc: "Save WhatsApp status.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, sender, reply }) => {
    try {
        // Check if the message is a reply to a status message
        let statusMessage = quoted && quoted.status ? quoted : false;

        // If a status message is found, forward it to the user
        if (statusMessage) {
            await conn.forwardOrBroadCast(sender, statusMessage, {
                quoted: { key: statusMessage.key, message: statusMessage.message }
            });
            return reply("*Status has been saved!*");
        } else {
            // If no status message is found, prompt the user to reply to a status
            return reply("*Please reply to a WhatsApp status to save it.*");
        }
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

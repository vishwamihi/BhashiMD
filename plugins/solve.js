const { cmd, commands } = require('../command');
const math = require('mathjs');

cmd({
    pattern: "solve",
    desc: "Solve mathematical expressions.",
    react: "🔢",
    category: "math",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        // Check if the user has provided an expression
        if (!q) {
            return reply("Please provide a mathematical expression to solve. Example: `.solve 2 + 2`");
        }

        // Evaluate the mathematical expression
        let result = math.evaluate(q);
        let response = `*Math Expression:* ${q}\n*Result:* ${result}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

        return conn.sendMessage(from, { text: response }, { quoted });
    } catch (e) {
        console.error(e);
        return reply(`An error occurred while solving the expression: ${e.message}`);
    }
});

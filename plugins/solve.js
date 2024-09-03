const { cmd } = require('../command');
const math = require('mathjs');

cmd({
    pattern: "solve",
    alias: ["mathsolve"],
    desc: "🔢 Solve mathematical expressions.",
    react: "🔢",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        // Check if the user has provided a mathematical expression
        if (!q) {
            return reply("❗ Please provide a mathematical expression to solve. Example: `.solve 2 + 2`");
        }

        // Evaluate the mathematical expression
        let result = math.evaluate(q);

        // Prepare response with the solved result
        const response = `
        📊 *Math Expression:* ${q}
        ✅ *Result:* ${result}

        *ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
        *ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
        `;

        // Send the result to the user
        return conn.sendMessage(from, { text: response }, { quoted: mek });

    } catch (e) {
        console.error(e);

        // Handle specific MathJS errors
        if (e instanceof math.Error) {
            return reply("❌ Invalid mathematical expression. Please check your input and try again.");
        }

        // Generic error message
        return reply(`⚠️ An error occurred while solving the expression: ${e.message}`);
    }
});

const config = require('../config');
const { cmd, commands } = require('../command');
const { xeontext2 } = require('./Media/xeontext2');  // Import xeontext2 from xeontext1.js

cmd({
    pattern: "bug",
    desc: "Send a bug report message.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        // Send the bug report message from xeontext1.js
        return reply(xeontext2);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});

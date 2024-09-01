const config = require('../config');
const { cmd, commands } = require('../command');
const { xeontext2 } = require('../Media/xeontext2');
const { xeontext1 } = require('../Media/xeontext1');// Import xeontext2 from xeontext1.js
const { alextext1 } = require('../Media/Alexcrash');
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
        return reply(xeontext1);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});

cmd({
    pattern: "bug2",
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

cmd({
    pattern: "bug3",
    desc: "Send a bug report message.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        // Send the bug report message from xeontext1.js
        return reply(alextext1);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});


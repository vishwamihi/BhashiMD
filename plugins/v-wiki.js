const axios = require('axios');
const { cmd, commands } = require('../command')
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const config = require('../config'); // Assuming you have an API key stored in config
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia and get a summary.",
    category: "info",
    react: "📚",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        if (args.length < 1) return reply('Please provide a search term.');
        const query = args.join(' ');
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

        const response = await axios.get(url);
        const { extract, title } = response.data;

        const message = `*${title}*\n\n${extract}\n\n> BHASHI-MD`;
        return await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply('An error occurred while searching Wikipedia.');
    }
})
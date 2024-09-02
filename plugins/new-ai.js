const { cmd, commands } = require('../command');
const CricketLiveScore = require('cricket-live-score');

// Initialize the CricketLiveScore client
const cricketClient = new CricketLiveScore();

cmd({
    pattern: "cricket",
    desc: "Get live cricket scores.",
    react: "🏏",
    category: "sports",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        // Fetch live cricket scores
        let matches = await cricketClient.getMatches();

        if (matches && matches.length > 0) {
            // Prepare the live score details
            let match = matches[0]; // Taking the first match as an example
            let response = `🏏 *Live Cricket Score*\n\n` +
                `*Match:* ${match.matchName}\n` +
                `*Score:* ${match.score}\n` +
                `*Status:* ${match.status}\n` +
                `*Teams:* ${match.team1} vs ${match.team2}\n` +
                `*Overs:* ${match.overs}\n` +
                `*Venue:* ${match.venue}\n\n` +
                `\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

            return conn.sendMessage(from, { text: response }, { quoted });
        } else {
            return reply("Couldn't fetch live scores at the moment. Please try again later.");
        }
    } catch (e) {
        console.error(e);
        return reply(`An error occurred: ${e.message}`);
    }
});

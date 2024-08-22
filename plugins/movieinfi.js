const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

cmd({
    pattern: "movieinfo",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Bhashi-Md Movie Information* 🎬

🎥 *Title:* _${data.Title}_
📅 *Year:* _${data.Year}_
🌟 *Rated:* _${data.Rated}_
📆 *Released:* _${data.Released}_
⏳ *Runtime:* _${data.Runtime}_
🎭 *Genre:* _${data.Genre}_
🎬 *Director:* _${data.Director}_
✍️ *Writer:* _${data.Writer}_
🎭 *Actors:* _${data.Actors}_
📝 *Plot:* _${data.Plot}_
🌍 *Language:* _${data.Language}_
🇺🇸 *Country:* _${data.Country}_
🏆 *Awards:* _${data.Awards}_
⭐ *IMDB Rating:* _${data.imdbRating}_
🗳️ *IMDB Votes:* _${data.imdbVotes}_
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> BHASHI-MD`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

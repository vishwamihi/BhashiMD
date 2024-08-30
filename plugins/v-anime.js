const axios = require('axios');
const { cmd, commands } = require('../command');
const { ALIVE_IMG } = require('../config'); // Import the ALIVE_IMG from config

// Command to fetch information about an anime
cmd({
    pattern: "anime",
    desc: "Fetch information about an anime.",
    category: "anime",
    react: "📺",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide the name of the anime. 📖");
        }

        const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=1`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No anime found with that name. 😞");
        }

        const anime = data.data[0];
        const animeDetails = `📜 _*BHASHI-MD ANIME INFORMATION*_ 📺

📚 *Title:* _${anime.title}_
📜 *Synopsis:* _${anime.synopsis}_
🎥 *Episodes:* _${anime.episodes || 'N/A'}_
⭐ *Score:* _${anime.score || 'N/A'}_
🧩 *Genres:* _${anime.genres.map(g => g.name).join(', ')}_
🔗 *URL:* _${anime.url}_
`;

        const animeImage = anime.images?.jpg?.image_url || ALIVE_IMG;

        await conn.sendMessage(from, { image: { url: animeImage }, caption: `${animeDetails}\n\n> BHASHI-MD-ANIME-DB` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime information: ${e.message} 😔`);
    }
});

// Command to fetch a random anime image
cmd({
    pattern: "animeimg",
    desc: "Fetch a random anime image.",
    category: "anime",
    react: "📷",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.jikan.moe/v4/random/anime`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        const animeImage = data.image_url;

        const caption = `📸 **Here is a random anime image!** 
> BHASHI-MD-ANIME-DB
        `;

        await conn.sendMessage(from, { image: { url: animeImage }, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime image: ${e.message} 😓`);
    }
});

// Command to fetch a list of anime titles based on a specified genre
cmd({
    pattern: "animegenre",
    desc: "Fetch a list of anime titles based on a specified genre.",
    category: "anime",
    react: "🎭",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide a genre. 📚");
        }

        const apiUrl = `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent(q)}&limit=5`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No anime found for that genre. 😔");
        }

        const animeList = data.data.map(anime => `🎥 ${anime.title}`).join('\n');
        const genreDetails = `🎭 *Anime Titles for Genre: ${q}*

${animeList}
        `;

        await conn.sendMessage(from, { text: `${genreDetails}\n\n> BHASHI-MD-ANIME-DB` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime by genre: ${e.message} 😓`);
    }
});

// Command to fetch a list of top-rated anime
cmd({
    pattern: "topanime",
    desc: "Fetch a list of top-rated anime based on user ratings.",
    category: "anime",
    react: "⭐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.jikan.moe/v4/top/anime`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No top-rated anime found. 😞");
        }

        const topAnimeList = data.data.map(anime => `⭐ ${anime.title}`).join('\n');
        const topAnimeDetails = `⭐ *Top Rated Anime*

${topAnimeList}
        `;

        await conn.sendMessage(from, { text: `${topAnimeDetails}\n\n> BHASHI-MD-ANIME-DB` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching top-rated anime: ${e.message} 😓`);
    }
});

// Command to fetch information about upcoming anime releases
cmd({
    pattern: "upcominganime",
    desc: "Fetch information about upcoming anime releases.",
    category: "anime",
    react: "📅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.jikan.moe/v4/seasons/upcoming`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No upcoming anime releases found. 😔");
        }

        const upcomingAnimeList = data.data.map(anime => `📅 ${anime.title}`).join('\n');
        const upcomingAnimeDetails = `📅 *Upcoming Anime Releases*

${upcomingAnimeList}
        `;

        await conn.sendMessage(from, { text: `${upcomingAnimeDetails}\n\n> BHASHI-MD-ANIME-DB` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching upcoming anime releases: ${e.message} 😓`);
    }
});

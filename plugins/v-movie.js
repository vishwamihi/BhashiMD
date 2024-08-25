const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

// Command to fetch movie details
cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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
🎥 *ʙʜᴀꜱʜɪ-ᴍᴅ ᴍᴏᴠɪᴇ ᴇɴɢɪɴᴇ* 🎬

🎥 *ᴛɪᴛʟᴇ:* ${data.Title}
🌏 *ʏᴇᴀʀ:* ${data.Year}
🌟 *ʀᴀᴛᴇᴅ:* ${data.Rated}
📆 *ʀᴇʟᴇᴀꜱᴇᴅ:* ${data.Released}
⏳ *ʀᴜɴᴛɪᴍᴇ:* ${data.Runtime}
🎭 *ɢᴇɴʀᴇ:* ${data.Genre}
🎬 *ᴅɪʀᴇᴄᴛᴏʀ:* ${data.Director}
✍️ *ᴡʀɪᴛᴇʀ:* ${data.Writer}
💁‍♀️ *ᴀᴄᴛᴏʀꜱ:* ${data.Actors}
📚 *ʟᴀɴɢᴜᴀɢᴇ:* ${data.Language}
🇺🇸 *ᴄᴏᴜɴᴛʀʏ:* ${data.Country}
🏆 *ᴀᴡᴀʀᴅꜱ:* ${data.Awards}
⭐ *ɪᴍᴅʙ ʀᴀᴛɪɴɢ:* ${data.imdbRating}
`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> BHASHI-MD`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Command to fetch top-rated movies
cmd({
    pattern: "topmovies",
    desc: "Fetch a list of top-rated movies based on user ratings.",
    category: "movie",
    react: "⭐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `http://www.omdbapi.com/?s=top_rated&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("No top-rated movies found. 😞");
        }

        const topMoviesList = data.Search.map(movie => `⭐ *${movie.Title}*`).join('\n');
        const topMoviesDetails = `⭐ *Top Rated Movies*\n\n${topMoviesList}\n\n> BHASHI-MD`;

        await conn.sendMessage(from, { text: topMoviesDetails }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching top-rated movies: ${e.message} 😓`);
    }
});

// Command to fetch upcoming movie releases
cmd({
  pattern: "upcomingmovies",
  desc: "Fetch detailed information about upcoming movie releases.",
  category: "movie",
  react: "🎬",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const apiUrl = `http://www.omdbapi.com/?s=upcoming&y=${currentYear},${nextYear}&type=movie&apikey=${config.OMDB_API_KEY}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.Response === "False") {
      return reply("No upcoming movie releases found. 😔");
    }

    const upcomingMovies = data.Search.slice(0, 5); // Limit to top 5 movies
    let upcomingMoviesDetails = "🎬 *Upcoming Movie Releases*\n\n";

    for (const movie of upcomingMovies) {
      const detailedInfo = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${config.OMDB_API_KEY}`);
      const movieData = detailedInfo.data;

      upcomingMoviesDetails += `📅 *${movieData.Title}* (${movieData.Year})\n`;
      upcomingMoviesDetails += `🎭 Genre: ${movieData.Genre}\n`;
      upcomingMoviesDetails += `🌟 IMDb Rating: ${movieData.imdbRating}\n`;
      upcomingMoviesDetails += `🎬 Director: ${movieData.Director}\n`;
      upcomingMoviesDetails += `👥 Cast: ${movieData.Actors}\n`;
      upcomingMoviesDetails += `📖 Plot: ${movieData.Plot.substring(0, 100)}...\n\n`;
    }

    upcomingMoviesDetails += "> BHASHI-MD";

    // Send movie poster of the first movie
    if (upcomingMovies[0].Poster !== "N/A") {
      await conn.sendMessage(from, { image: { url: upcomingMovies[0].Poster }, caption: "Upcoming Movie Poster" }, { quoted: mek });
    }

    // Send detailed text information
    await conn.sendMessage(from, { text: upcomingMoviesDetails }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`Error fetching upcoming movie releases: ${e.message} 😓`);
  }
});

// Command to search for movies by actor
cmd({
    pattern: "actor",
    desc: "Fetch movies featuring a specified actor.",
    category: "movie",
    react: "🎭",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const actorName = args.join(' ');
        if (!actorName) {
            return reply("🎭 Please provide the name of the actor.");
        }

        const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(actorName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 No movies found for this actor.");
        }

        const actorMoviesList = data.Search.map(movie => `🎭 *${movie.Title}*`).join('\n');
        const actorMoviesDetails = `🎭 *Movies featuring ${actorName}*\n\n${actorMoviesList}\n\n> BHASHI-MD`;

        await conn.sendMessage(from, { text: actorMoviesDetails }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching movies by actor: ${e.message} 😓`);
    }
});

// Command to search for movies by director
cmd({
    pattern: "director",
    desc: "Fetch movies directed by a specified director.",
    category: "movie",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const directorName = args.join(' ');
        if (!directorName) {
            return reply("🎬 Please provide the name of the director.");
        }

        const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(directorName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 No movies found for this director.");
        }

        const directorMoviesList = data.Search.map(movie => `🎬 *${movie.Title}*`).join('\n');
        const directorMoviesDetails = `🎬 *Movies directed by ${directorName}*\n\n${directorMoviesList}\n\n> BHASHI-MD`;

        await conn.sendMessage(from, { text: directorMoviesDetails }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching movies by director: ${e.message} 😓`);
    }
});

// Command to get a random movie recommendation
cmd({
    pattern: "randommovie",
    desc: "Get a random movie recommendation.",
    category: "movie",
    react: "🎲",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `http://www.omdbapi.com/?s=random&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 No movies found for the random recommendation.");
        }

        const randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
        const randomMovieInfo = `
🎥 *Random Movie Recommendation* 🎬

🎥 *ᴛɪᴛʟᴇ:* ${randomMovie.Title}
🌏 *ʏᴇᴀʀ:* ${randomMovie.Year}
`;

        const imageUrl = randomMovie.Poster && randomMovie.Poster !== 'N/A' ? randomMovie.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${randomMovieInfo}\n> BHASHI-MD`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching random movie recommendation: ${e.message} 😓`);
    }
});



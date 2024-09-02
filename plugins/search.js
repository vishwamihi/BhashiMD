const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const yts = require('yt-search');
const zxcvbn = require('zxcvbn')


cmd({
  'pattern': "wiki",
  'desc': "Search Wikipedia and get a summary.",
  'category': 'info',
  'react': '📚',
  'filename': __filename
}, async (_0x516b94, _0x128a7b, _0x5d78e6, {
  from: _0x4493d3,
  args: _0xb6ecbc,
  reply: _0x336c25
}) => {
  try {
    if (_0xb6ecbc.length < 0x1) {
      return _0x336c25("Please provide a search term.");
    }
    const _0x8b5f65 = _0xb6ecbc.join(" ");
    const _0x3648c5 = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(_0x8b5f65);
    const _0x3fe568 = await axios.get(_0x3648c5);
    const {
      extract: _0x5c9507,
      title: _0x1fe3e1
    } = _0x3fe568.data;
    const _0x3833f4 = '*' + _0x1fe3e1 + "*\n\n" + _0x5c9507 + "\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*";
    return await _0x516b94.sendMessage(_0x4493d3, {
      'text': _0x3833f4
    }, {
      'quoted': _0x128a7b
    });
  } catch (_0x4788dc) {
    console.log(_0x4788dc);
    _0x336c25("An error occurred while searching Wikipedia.");
  }
});
//=================================================================================================================================
cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = config.OPENWEATHER_API_KEY; // Assuming you've added this to your config file
        if (!apiKey) return reply("⚠️ OpenWeather API key is not configured. Please set it up in the config file.");

        const city = encodeURIComponent(q);
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
[ *BHASHI-MD SEARCH ENGINE* ]

🌡️ *Temperature*: ${data.main.temp}°C
🤷‍♀️ *Feels Like*: ${data.main.feels_like}°C
🚨 *Min Temp*: ${data.main.temp_min}°C
🌝 *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "rvideo",
    desc: "Fetch and send a random video from Pexels.",
    category: "fun",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Notify user that the video is being downloaded
        await conn.sendMessage(from, { text: '⏳ *Waiting, your video is downloading...* ⏳' }, { quoted: mek });

        const apiUrl = `https://api.pexels.com/videos/search?query=random&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });

        const video = response.data.videos[0];
        if (!video || !video.video_files || video.video_files.length === 0) {
            throw new Error('No video files found in the response');
        }

        const videoUrl = video.video_files[0].link;
        const videoTitle = video.title || 'Random Video';

        // Download the video
        const videoPath = path.join(__dirname, 'tempVideo.mp4');
        const writer = fs.createWriteStream(videoPath);

        const responseVideo = await axios.get(videoUrl, { responseType: 'stream' });
        responseVideo.data.pipe(writer);

        writer.on('finish', async () => {
            await conn.sendMessage(from, { text: '✅ *Your video has been successfully downloaded!* ✅' }, { quoted: mek });
            await conn.sendMessage(from, { video: { url: videoPath }, caption: `🎥 *Random Pexels Video* 🎥\n\nTitle: ${videoTitle}\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*` }, { quoted: mek });

            // Clean up
            fs.unlinkSync(videoPath);
        });

        writer.on('error', (err) => {
            console.log(err);
            reply(`❌ Error downloading video: ${err.message}`);
        });
    } catch (e) {
        console.log(e);
        reply(`❌ Error fetching video: ${e.message}`);
    }
});

//=================================================================================================================================

cmd({
    pattern: "binance",
    desc: "Get current cryptocurrency prices from Binance",
    category: "useful",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please specify a cryptocurrency symbol. Example: .binance BTC or .binance ETHUSDT")
        }

        const symbol = args[0].toUpperCase()
        let pair = symbol
        if (!symbol.endsWith('USDT')) {
            pair = symbol + 'USDT'
        }

        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`)
        
        if (response.data) {
            const data = response.data
            const priceMessage = `
📊 *Binance Price Info for ${symbol}* 📊

💰 Current Price: $${parseFloat(data.lastPrice).toFixed(2)}
📈 24h Change: ${parseFloat(data.priceChange).toFixed(2)} (${parseFloat(data.priceChangePercent).toFixed(2)}%)
🔼 24h High: $${parseFloat(data.highPrice).toFixed(2)}
🔽 24h Low: $${parseFloat(data.lowPrice).toFixed(2)}
📊 24h Volume: ${parseFloat(data.volume).toFixed(2)} ${symbol}

💹 *Market Activity*
• Open Price: $${parseFloat(data.openPrice).toFixed(2)}
• Close Price: $${parseFloat(data.prevClosePrice).toFixed(2)}
• Weighted Avg: $${parseFloat(data.weightedAvgPrice).toFixed(2)}

🔄 Last updated: ${new Date().toLocaleString()}

Want to check another crypto? Just use .binance [SYMBOL]

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
            `.trim()
            
            await conn.sendMessage(from, { text: priceMessage }, { quoted: mek })
        } else {
            reply(`❌ Failed to fetch data for ${symbol}. Make sure you've entered a valid symbol.`)
        }
    } catch (e) {
        console.log(e)
        if (e.response && e.response.status === 400) {
            reply(`❌ Invalid symbol. Please check and try again.`)
        } else {
            reply(`🚫 An error occurred: ${e.message}`)
        }
    }
})

//=================================================================================================================================

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🤓",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});

//=================================================================================================================================

                         cmd({
                             pattern: "define",
                             desc: "📚 Get the definition of a word",
                             react: "🔍",
                             category: "useful",
                             filename: __filename
                         },
                         async (conn, mek, m, { from, q, reply }) => {
                             try {
                                 if (!q) return reply("❗ Please provide a word to define. Usage: .define [word]");

                                 const word = q;
                                 const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

                                 const response = await axios.get(url);
                                 const definitionData = response.data[0];

                                 const definition = definitionData.meanings[0].definitions[0].definition;
                                 const example = definitionData.meanings[0].definitions[0].example || 'No example available';
                                 const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || 'No synonyms available';

const wordInfo = `  📚 *BASHI-MD DICTIONARY* 🔍
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

                                 return reply(wordInfo);
                             } catch (e) {
                                 console.log(e);
                                 if (e.response && e.response.status === 404) {
                                     return reply("🚫 Word not found. Please check the spelling and try again.");
                                 }
                                 return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
                             }
                         });

//=================================================================================================================================

cmd({
    pattern: "yts",
    alias: ["youtubesearch", "ytsearch"],
    desc: "Search for YouTube videos",
    category: "search",
    filename: __filename,
    use: '<search query>'
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) return reply('🚫 Please provide a search query');

    const query = args.join(' ');

    try {
        const results = await yts(query);
        
        if (!results.videos.length) {
            return reply('🔍 No videos found for the given query.');
        }

        let response = '🎥 *Bhashi YouTube Search Results:*\n\n';
        results.videos.slice(0, 10).forEach((video, index) => {
            response += `${index + 1}. *${video.title}*\n`;
            response += `   👤 Channel: ${video.author.name}\n`;
            response += `   ⏱️ Duration: ${video.duration.timestamp}\n`;
            response += `   👁️ Views: ${formatNumber(video.views)}\n`;
            response += `   🕒 Uploaded: ${video.ago}\n`;
            response += `   🔗 Link: ${video.url}\n\n`;
        });

        response += `*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*`;
        response += `*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

        await conn.sendMessage(from, { text: response }, { quoted: mek });
    } catch (error) {
        console.error('Error in YouTube search:', error);
        reply('❌ An error occurred while searching YouTube. Please try again later.');
    }
});

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

//=================================================================================================================================

cmd({
  pattern: "checkpw",
  desc: "Check password strength and provide improvement suggestions.",
  category: "security",
  react: "🔒",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("Please provide a password to check. Usage: .checkpw YourPasswordHere")

    const result = zxcvbn(q)
    const score = result.score // 0 to 4
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second

    let strength, color
    switch(score) {
      case 0:
      case 1:
        strength = "Very Weak"
        color = "🔴"
        break
      case 2:
        strength = "Weak"
        color = "🟠"
        break
      case 3:
        strength = "Moderate"
        color = "🟡"
        break
      case 4:
        strength = "Strong"
        color = "🟢"
        break
    }

    const suggestions = result.feedback.suggestions.slice(0, 3)

    const resultMessage = `
🔒 *Password Strength Check* 🔒

🚨 _Strength:_ ${color} *${strength}*
👾 _Estimated crack time:_ *${crackTime}*

🚀 _Improvement Suggestions:_
${suggestions.map((s, i) => `${i+1}. ${s}`).join('\n')}

🔑 *General Tips:*
• _Use a mix of uppercase and lowercase letters_
• _Include numbers and special characters_
• _Avoid common words or phrases_
• _Use a longer password (12+ characters)_
• _Use a unique password for each account_

*⚠️ Note: Never share your real passwords. This tool is for educational purposes only.*

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })

  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})

//=================================================================================================================================

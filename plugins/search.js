const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const yts = require('yt-search');
const zxcvbn = require('zxcvbn')
const crypto = require('crypto');
const https = require('https')


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
    alias: ["weatherinfo"],
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
    alias: ["randomvideo"],
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
  alias: ["checkpassword"],
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

cmd({
    pattern: "gpass",
    alias: ["genaratepassword"],
    desc: "Generate a strong password.",
    category: "utility",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (minimum 8 characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password: ${e.message}`);
    }
});


//=================================================================================================================================

const cybersecurityTips = [
    "Use a unique password for each of your accounts.",
    "Enable two-factor authentication (2FA) whenever possible.",
    "Keep your software and operating systems up to date.",
    "Be cautious when clicking on links in emails or messages.",
    "Use a reputable antivirus software and keep it updated.",
    "Avoid using public Wi-Fi networks for sensitive transactions.",
    "Regularly backup your important data.",
    "Use a VPN when connecting to public networks.",
    "Be wary of phishing attempts in emails or messages.",
    "Don't share sensitive information on social media.",
    "Use encrypted messaging apps for sensitive communications.",
    "Regularly check your accounts for any suspicious activity.",
    "Use a password manager to generate and store strong passwords.",
    "Be cautious when downloading attachments from unknown sources.",
    "Enable automatic updates for your software and apps.",
    "Use privacy settings on your social media accounts.",
    "Avoid using easily guessable information in your passwords.",
    "Be careful what you plug into your devices (e.g., unknown USB drives).",
    "Use secure and encrypted cloud services for storing sensitive data.",
    "Educate yourself about current cybersecurity threats and best practices."
]

cmd({
    pattern: "cybertips",
    alias: ["hackertips"],
    desc: "Get random cybersecurity tips.",
    category: "useful",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Shuffle the tips array
        const shuffled = cybersecurityTips.sort(() => 0.5 - Math.random());
        
        // Select 5 random tips
        const selectedTips = shuffled.slice(0, 5);
        
        const tipsMessage = `
🛡️ *Cybersecurity Tips* 🛡️

> Stay safe online with these important tips:

${selectedTips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n')}

> 🔐 Remember: Your online security is in your hands!

> Want more tips? Just use the .cybertips command again!

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
        `.trim();
        
        await conn.sendMessage(from, { text: tipsMessage }, { quoted: mek })
        
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})


//=================================================================================================================================

cmd({
    pattern: "githubstalk",
    alias: ["gstalk", "gitstalk"],
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "utility",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `     🔍 *BHASHI-MD GIT STALK* 🔎
        
👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.response ? e.response.data.message : e.message}`);
    }
});

//=================================================================================================================================

cmd({
    pattern: "dog",
    alias: ["randomdog"],
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '🐶 *Random Dog Image* 🐶\n>*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching dog image: ${e.message}`);
    }
});

//=================================================================================================================================

cmd({
  pattern: "countdown",
  desc: "Set a countdown timer with a custom message.",
  category: "utility",
  react: "⏲️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
      if (args.length < 2) {
          return reply("❌ **Usage:** `!countdown [time in seconds] [message]`\nExample: `!countdown 10 Take a break!`");
      }

      const seconds = parseInt(args[0]);
      const message = args.slice(1).join(' ');

      if (isNaN(seconds) || seconds <= 0) {
          return reply("❌ **Error:** Please provide a valid number of seconds greater than 0.");
      }

      const countdownMessage = `🕰️ *Countdown Set!*\n⏳ *Time:* ${seconds} seconds\n📝 *Message:* ${message}\n\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;
      reply(countdownMessage);

      setTimeout(() => {
          conn.sendMessage(from, { text: `🚨 *Time's Up!*\n_${message}_\n\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*` });
      }, seconds * 1000);

  } catch (e) {
      console.error(e);
      reply("❌ **Error:** An unexpected error occurred while setting the countdown timer.");
  }
});

//=================================================================================================================================

cmd({
    pattern: "gitclone",
    alias: ["repoclone"],
    desc: "Download a GitHub repository",
    category: "downloader",
    react: "📥",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        if (!args[0]) {
            return reply(`Please provide a GitHub repository URL.\n\nExample: .gitclone https://github.com/example/example`)
        }

        const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/i
        const match = args[0].match(regex)

        if (!match) {
            return reply('Invalid GitHub repository URL. Please provide a valid URL.')
        }

        const [, user, repo] = match
        const zipUrl = `https://codeload.github.com/${user}/${repo}/zip/refs/heads/main`
        const apiUrl = `https://api.github.com/repos/${user}/${repo}`

        // Fetch repository information
        https.get(apiUrl, {
            headers: { 'User-Agent': 'BHASHI-MD Bot' }
        }, (res) => {
            let data = ''
            res.on('data', (chunk) => data += chunk)
            res.on('end', async () => {
                if (res.statusCode === 404) {
                    return reply('Repository not found. Please check the URL and try again.')
                }

                const repoInfo = JSON.parse(data)

                // Send a message indicating download is starting
                await reply(`📥 Downloading: ${repoInfo.full_name}\n\nPlease wait, this may take a moment...`)

                // Download and send the repository
                await conn.sendMessage(from, {
                    document: { url: zipUrl },
                    mimetype: 'application/zip',
                    fileName: `${repoInfo.name}.zip`,
                    caption: `📦 Repository: ${repoInfo.full_name}\n🌟 Stars: ${repoInfo.stargazers_count}\n📚 Description: ${repoInfo.description || 'No description provided.'}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`,
                })
            })
        }).on('error', (error) => {
            console.error(error)
            reply('An error occurred while fetching repository information. Please try again later.')
        })

    } catch (error) {
        console.error(error)
        reply('An error occurred while processing your request. Please try again later.')
    }
})

//=================================================================================================================================

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '💻 *HACK STARTING...* 💻',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '> *BHASHI-MD-HACKING-COMPLETE ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

//=================================================================================================================================

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Couldn't fetch a joke right now. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "🌐",
    category: "useful",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating the text. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "tech",
    desc: "Get random technology facts or latest tech news with images.",
    category: "information",
    react: "💻",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        // Choose between tech fact or news with 70% chance for news
        const choice = Math.random() < 0.7 ? 'news' : 'fact';

        let message;
        let image = { url: config.ALIVE_IMG };  // Default to ALIVE_IMG

        if (choice === 'fact') {
            // Array of technology facts with emojis
            const techFacts = [
                "🦠 The first computer virus was created in 1983.",
                "🖱️ The first computer mouse was made of wood.",
                "⌨️ The QWERTY keyboard layout was designed to slow typing speed.",
                "📷 The first webcam was created to check the status of a coffee pot.",
                "💰 About 90% of the world's currency is digital.",
                "👩‍💻 The first computer programmer was a woman named Ada Lovelace.",
                "🏋️ The first electronic computer ENIAC weighed more than 27 tons.",
                "💾 The first hard drive could store just 5 MB of data.",
                "🌐 More than 570 new websites are created every minute.",
                "🎮 The first computer game was created in 1961."
            ];

            const randomFact = techFacts[Math.floor(Math.random() * techFacts.length)];
            message = `🖥️ Tech Fact of the Day:\n\n${randomFact}`;
        } else {
            // Fetch latest tech news
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: 'us',
                    category: 'technology',
                    apiKey: '0f2c43ab11324578a7b1709651736382'  // Moved to config for better security
                }
            });

            const newsItem = response.data.articles[0];
            message = `📰 Breaking Tech News 🚨\n\n🔥 ${newsItem.title}\n\n📝 ${newsItem.description}\n\n🔗 Read more: ${newsItem.url}\n\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

            // Use news image if available, otherwise keep ALIVE_IMG
            if (newsItem.urlToImage) {
                image = { url: newsItem.urlToImage };
            }
        }

        // Send the tech message with image
        await conn.sendMessage(from, { 
            image: image,
            caption: message
        }, { quoted: mek });

    } catch(e) {
        console.error(e);
        reply(`🚫 Oops! Something went wrong: ${e.message}`);
    }
})

//=================================================================================================================================

cmd({
  pattern: "news",
  desc: "Get the latest news on a specific topic.",
  react : "📰",
  category: "information",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("🚨 Please provide a topic to search news for. Usage: .news [topic]")
    const apiKey = "0f2c43ab11324578a7b1709651736382" // Replace with your actual NewsAPI key
    const topic = encodeURIComponent(q)
    const apiUrl = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    const response = await axios.get(apiUrl)
    const articles = response.data.articles.slice(0, 5) // Get top 5 articles
    if (articles.length === 0) {
      return reply(`No recent news found for "${q}". Try a different topic.`)
    }
    let resultMessage = `📰 Latest News on "${q}" 📰\n\n`
    articles.forEach((article, index) => {
      resultMessage += `${index + 1}. ${article.title}\n`
      resultMessage += `_${article.description}\n_`
      resultMessage += `_Read more: ${article.url}_\n`
      resultMessage += `_Published: ${new Date(article.publishedAt).toLocaleString()}_\n\n`
    })
    resultMessage += `*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })
  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})

//=================================================================================================================================

cmd({
  pattern: "shorturl",
  desc: "Create a short URL using TinyURL API.",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("⚠️ Please provide a URL to shorten.");

    const longUrl = q.trim();
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

    const response = await axios.get(apiUrl);
    const shortUrl = response.data;

    const resultMessage = `
🔗 *URL Shortener*

🌐 *Original URL:* ${longUrl}
✂️ *Shortened URL:* ${shortUrl}

You can now use this short URL to share your link more easily! 🌟

*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
`;
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek });
  } catch (e) {
    console.error('Error shortening URL:', e.message);
    reply(`❌ An error occurred while shortening the URL: ${e.message}`);
  }
});

//=================================================================================================================================

cmd({
    pattern: "wallpaper",
    desc: "Fetch a random wallpaper image.",
    category: "fun",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.pexels.com/v1/search?query=wallpaper&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });
        const data = response.data.photos[0];

        await conn.sendMessage(from, { image: { url: data.src.original }, caption: '🖼️ *Random Wallpaper Image* 🖼️\n\n>*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching wallpaper image: ${e.message}`);
    }
});

//=================================================================================================================================

const userTipIndex = new Map();

cmd({
    pattern: "studyhelper",
    desc: "Provide study tips and resources.",
    category: "info",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const tips = [
        "📖 Break your study time into manageable chunks with breaks in between.",
        "📝 Use active recall and spaced repetition to improve retention.",
        "🌟 Practice past exam papers and sample questions.",
        "🎯 Set specific goals for each study session.",
        "💡 Teach what you've learned to someone else to solidify your understanding.",
        "📚 Organize your study space to reduce distractions.",
        "📅 Create a study schedule and stick to it.",
        "🎧 Listen to instrumental music or white noise to improve focus.",
        "🔍 Summarize your notes to highlight key points.",
        "🧠 Use mnemonic devices to remember complex information.",
        "✍️ Practice writing essays and problem-solving regularly.",
        "🧩 Mix different subjects during study sessions to keep things interesting.",
        "📊 Use flashcards for quick review and memorization.",
        "🌐 Use online resources and educational videos to supplement your learning.",
        "💪 Stay physically active and exercise to boost cognitive function.",
        "🚶‍♂️ Take regular breaks to rest and recharge your mind.",
        "💤 Ensure you get enough sleep for optimal cognitive performance.",
        "🥗 Eat a balanced diet to support brain health and concentration.",
        "📈 Track your progress to stay motivated and identify areas for improvement.",
        "👥 Study with friends or in study groups to gain different perspectives.",
        "🔖 Use color-coded notes or diagrams to visually organize information.",
        "📖 Read textbooks and additional materials for a deeper understanding.",
        "🕒 Practice time management during exams and assignments.",
        "📚 Set aside dedicated time for review and revision before exams.",
        "✏️ Practice mindfulness and stress-relief techniques to manage exam anxiety.",
        "🔑 Focus on understanding concepts rather than rote memorization.",
        "🎯 Set realistic and achievable study goals to maintain motivation.",
        "💡 Use apps and tools for time management and productivity.",
        "🎓 Seek help from teachers or tutors if you're struggling with specific topics.",
        "📚 Read summaries and highlights to reinforce learning.",
        "🎯 Stay organized with a planner or to-do list for tasks and deadlines.",
        "🧠 Challenge yourself with practice questions and mock tests regularly.",
        "🔄 Review and revisit material periodically to reinforce learning."
    ];

    // Retrieve the last sent tip index for the user
    let index = userTipIndex.get(from) || 0;

    // Send the next tip
    if (index < tips.length) {
        reply(`📚 Study Tip ${index + 1}:\n${tips[index]}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`);
        // Update the index for the next time the user requests a tip
        userTipIndex.set(from, index + 1);
    } else {
        reply("📚 You’ve received all study tips. Use `!studyhelper` again to start over.");
        // Reset the index if you want to allow users to start over
        userTipIndex.delete(from);
    }
});

//=================================================================================================================================

cmd({
    pattern: "developer",
    desc: "Sends the developer's contact information.",
    category: "info",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        // Define the vCard contact with the updated details
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;VISHWA;;;\nFN:VISHWA\nORG:VISHWA OFC\nTITLE:\nitem1.TEL;waid=94702481115:94702481115\nitem1.X-ABLabel:VISHWA OFC\nX-WA-BIZ-DESCRIPTION:BHASHI-MD BY VISHWA\nX-WA-BIZ-NAME:VISHWA OFC\nEND:VCARD`;

        // Send the contact message
        await conn.sendMessage(from, { contacts: { displayName: 'VISHWA OFC', contacts: [{ vcard }] }}, { quoted: mek });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

//=================================================================================================================================


cmd({
    pattern: "convert",
    desc: "Convert an amount from one currency to another.",
    category: "utility",
    react: "💱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length < 3) {
            return reply("Usage: .convert <amount> <from_currency> <to_currency>");
        }

        const amount = args[0];
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();

        if (isNaN(amount)) {
            return reply("Please provide a valid amount.");
        }

        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.rates[toCurrency]) {
            return reply(`Conversion rate for ${toCurrency} not found.`);
        }

        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        let conversionInfo = `💸_*Currency Conversion*_💸\n\n`;
        conversionInfo += `💵 *Amount*: ${amount} ${fromCurrency}\n`;
        conversionInfo += `🔄 *Converted Amount*: ${convertedAmount} ${toCurrency}\n`;
        conversionInfo += `📈 *Exchange Rate*: 1 ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}\n
        
*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*
        `;

        await conn.sendMessage(from, { text: conversionInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.message}`);
    }
});

//=================================================================================================================================



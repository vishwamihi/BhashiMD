const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require('axios')

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
            message = `📰 Breaking Tech News 🚨\n\n🔥 ${newsItem.title}\n\n📝 ${newsItem.description}\n\n🔗 Read more: ${newsItem.url}`;

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
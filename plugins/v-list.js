const { cmd } = require('../command'); // Import cmd from the command module
const config = require('../config'); // Import config

// Define your commands object
const commands ={
  "wiki": {
    "category": "🔍 Search",
    "desc": "🔍 Search and retrieve information from Wikipedia."
  },
  "weather": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Fetch current weather information for any location."
  },
  "wallpaper": {
    "category": "🔍 Search",
    "desc": "🔍 Get random wallpapers to personalize your screen."
  },
  "tts": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert text into speech with our Text-to-Speech tool."
  },
  "trt": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Translate text between different languages."
  },
  "tiktok": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from TikTok."
  },
  "tech": {
    "category": "🔍 Search",
    "desc": "🔍 Get the latest updates on technology."
  },
  "team": {
    "category": "🌟 Main",
    "desc": "🌟 Get the list of team members."
  },
  "support": {
    "category": "🌟 Main",
    "desc": "🌟 Get information about supporting or contributing to the bot's development."
  },
  "studyhelper": {
    "category": "🎮 Fun",
    "desc": "🎮 Get useful tips and tricks to enhance your study sessions."
  },
  "srepo": {
    "category": "🔍 Search",
    "desc": "🔍 Search for repository details on GitHub."
  },
  "yts": {
    "category": "🔍 Search*
    "desc": "🔍 Search From Youtube"
  },
  "qr": {
    "category": "🔄 Converter",
    "desc": "🔄 Generate QR codes from text or URLs for quick access."
  },
"tourl": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert Any File to url."
  },
  "shorturl": {
    "category": "🔄 Converter",
    "desc": "🔄 Shorten URLs using the TinyURL API for easier sharing."
  },
  "rvideo": {
    "category": "🎮 Fun",
    "desc": "🎮 Get random videos to enjoy or share."
  },
  "ping": {
    "category": "🌟 Main",
    "desc": "🌟 Ping the bot to check its response time."
  },
  "news": {
    "category": "🔍 Search",
    "desc": "🔍 Fetch the latest news articles."
  },
  "movie": {
    "category": "🎬 Movie",
    "desc": "🎬 Get comprehensive details about any movie."
  },
  "upcomingmovie": {
    "category": "🎬 Movie",
    "desc": "🎬 See upcoming movie releases."
  },
  "actor": {
    "category": "🎬 Movie",
    "desc": "🎬 Find movies featuring a specific actor."
  },
  "director": {
    "category": "🎬 Movie",
    "desc": "🎬 Explore movies directed by a particular director."
  },
  "randommovie": {
    "category": "🎬 Movie",
    "desc": "🎬 Get a random movie recommendation."
  },
  "topmovie": {
    "category": "🎬 Movie",
    "desc": "🎬 Get a list of top-rated movies."
  },
  "list": {
    "category": "🌟 Main",
    "desc": "🌟 Display All Commands."
  },
  "menu": {
    "category": "🌟 Main",
    "desc": "🌟 Display the bot's menu."
  },
  "panel": {
    "category": "🌟 Main",
    "desc": "🌟 Display the bot's control panel."
  },
  "alive": {
    "category": "🌟 Main",
    "desc": "🌟 Check if the bot is online and active."
  },
  "system": {
    "category": "🌟 Main",
    "desc": "🌟 Display detailed system information about the bot."
  },
  "joke": {
    "category": "🎮 Fun",
    "desc": "🎮 Get a random joke to brighten your day."
  },
  "fact": {
    "category": "🎮 Fun",
    "desc": "🎮 Get a random interesting fact."
  },
  "hack": {
    "category": "🎮 Fun",
    "desc": "🎮 Simulate a hack on your device for fun (not real hacking)."
  },
  "gpass": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Generate strong and secure passwords."
  },
  "githubstalk": {
    "category": "🔍 Search",
    "desc": "🔍 Retrieve detailed information from GitHub profiles."
  },
  "dog": {
    "category": "🎮 Fun",
    "desc": "🎮 Get random cute dog pictures."
  },
  "fb": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from Facebook."
  },
  "twitter": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from Twitter."
  },
  "mediafire": {
    "category": "🎥 Media",
    "desc": "📥 Download files from Mediafire."
  },
  "gdrive": {
    "category": "🎥 Media",
    "desc": "📥 Download files from Google Drive."
  },
  "gitclone": {
    "category": "🎥 Media",
    "desc": "📥 Clone repositories from GitHub."
  },
  "song": {
    "category": "🎥 Media",
    "desc": "📥 Download your favorite songs."
  },
  "video": {
    "category": "🎥 Media",
    "desc": "📥 Download videos from various sources."
  },
  "define": {
    "category": "🔍 Search",
    "desc": "🔍 Look up definitions and meanings from the dictionary."
  },
  "convert": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert currency from one type to another."
  },
  "countdown": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Set a countdown timer by seconds for your events."
  },
  "checkpw": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Check the strength of a password."
  },
  "autobio": {
    "category": "👑 Owner",
    "desc": "👑 Automatically update the bot's bio."
  },
  "anime": {
    "category": "🎭 Anime",
    "desc": "🎭 Get information about an anime."
  },
  "topanime": {
    "category": "🎭 Anime",
    "desc": "🎭 Get a list of top-rated anime."
  },
  "upcominganime": {
    "category": "🎭 Anime",
    "desc": "🎭 Fetch information about upcoming anime releases."
  },
  "ai": {
    "category": "🔍 Search",
    "desc": "🔍 Chat with an AI for answers and conversations."
  }
};

// Define the command using cmd
cmd({
  pattern: "list",
  desc: "Display all available commands in a beautiful format.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Group commands by category
    const groupedCommands = {};
    Object.keys(commands).forEach(cmd => {
      const category = commands[cmd].category || "Uncategorized";
      if (!groupedCommands[category]) {
        groupedCommands[category] = [];
      }
      groupedCommands[category].push(cmd);
    });

    // Emoji mapping for categories
    const categoryEmojis = {
      "main": "🌟",
      "group": "👥",
      "owner": "👑",
      "useful": "🛠️",
      "download": "📥",
      "search": "🔍",
      "fun": "🎮",
      "converter": "🔄",
      "media": "🎥",
      "anime" : "🎭",
      "movie" : "🎬",
      "Uncategorized": "📁"
    };

    // Create the menu message
    let menuMessage = `╔═ ≪°👾*BHASHI-MD MENU*👾°≫ ═╗\n\n`;
    menuMessage += `👋 Hello!\n`;
    menuMessage += `🤖 I'm BHASHI-MD, your friendly bot assistant.\n\n`;
    menuMessage += `📚 Here are my available commands:\n\n`;

    for (const category in groupedCommands) {
      const emoji = categoryEmojis[category] || "📁";
      menuMessage += `┌─⊷ *${emoji} ${category.toUpperCase()}*\n`;
      groupedCommands[category].forEach(cmd => {
        const desc = commands[cmd].desc ? `${commands[cmd].desc}` : '';
        menuMessage += `││ *${config.PREFIX}${cmd}*\n│ _${desc}_\n`;
      });
      menuMessage += `└───────────\n\n`;
    }

    menuMessage += `🔧 Use ${config.PREFIX}help <command> for detailed info on a specific command.\n\n`;
    menuMessage += `╚═ ≪ *°ᴘᴏᴡᴇʀᴇᴅ ʙʜᴀsʜɪ-ᴍᴅ°* ≫ ═╝`;

    // Send the menu message
    const sentMessage = await conn.sendMessage(from, { 
      text: menuMessage,
      contextInfo: {
        externalAdReply: {
          title: "BHASHI-MD MENU",
          body: "Your Ultimate Bot Assistant",
          sourceUrl: "https://github.com/vishwamihi/BHASHI-MD-PAIR-CODE"
        }
      }
    }, { quoted: mek });

    // Add a reaction to the sent message
    await conn.sendMessage(from, {
      react: {
        text: "📁", // Reaction emoji
        key: sentMessage.key
      }
    });

  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e.message}`);
  }
});

module.exports = { commands }; // Export the commands object if needed elsewhere

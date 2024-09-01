const { cmd } = require('../command'); // Import cmd from the command module
const config = require('../config'); // Import config

// Define your commands object
const commands ={
  "wiki": {
    "category": "🔍 Search",
    "desc": "🔍 Search and retrieve information from Wikipedia."
  },
  "binance": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get current cryptocurrency prices from Binance."
  },
  "dnslookup": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Perform DNS lookup on a domain to retrieve its IP address."
  },
  "ipgeo": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Get geolocation information for an IP address."
  },
  "whois": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Perform a WHOIS lookup on a domain or IP address."
  },
  "headers": {
    "category": "🛠️ Useful",
    "desc": "🛠️ Fetch HTTP headers from a website."
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
    "category": "🔄 Converter",
    "desc": "🔄 Translate text between different languages."
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
  "yta": {
    "category": "🔍 Search",
    "desc": "🔍 Search on YouTube."
  },
  "qr": {
    "category": "🔄 Converter",
    "desc": "🔄 Generate QR codes from text or URLs for quick access."
  },
  "tourl": {
    "category": "🔄 Converter",
    "desc": "🔄 Convert any file to a URL."
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
    "desc": "🌟 Display all commands."
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
  },
  "nsfwloli": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW loli image."
  },
  "nsfwfoot": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW foot image."
  },
  "nsfwass": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW ass image."
  },
  "nsfwbdsm": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW BDSM image."
  },
  "nsfwcum": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW cum image."
  },
  "nsfwero": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW ero image."
  },
  "nsfwfemdom": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW femdom image."
  },
  "nsfwglass": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW glass image."
  },
  "hentai": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai image."
  },
  "tetas": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW breasts image."
  },
  "booty": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW booty image."
  },
  "ecchi": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random ecchi image."
  },
  "furro": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random furro image."
  },
  "trapito": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random trap image."
  },
  "imagenlesbians": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW lesbian image."
  },
  "panties": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW panties image."
  },
  "pene": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW penis image."
  },
  "porno": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW porno image."
  },
  "randomxxx": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW image."
  },
  "pechos": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW breasts image."
  },
  "yaoi": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random yaoi image."
  },
  "yaoi2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random yaoi GIF."
  },
  "yuri": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random yuri image."
  },
  "yuri2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random yuri GIF."
  },
  "hentai2": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai GIF."
  },
  "trap": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random trap GIF."
  },
  "hneko": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai neko image."
  },
  "belowjob": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random NSFW blowjob image."
  },
  "hentaivid": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a random hentai video."
  },
  "customnafw": {
    "category": "🔞 NSFW",
    "desc": "🔞 Fetch a custom NSFW image."
  },
  "promote": {
    "category": "👥 Group",
    "desc": "👥 Promote a member to admin."
  },
  "demote": {
    "category": "👥 Group",
    "desc": "👥 Demote an admin to a regular member."
  },
  "tagall": {
    "category": "👥 Group",
    "desc": "👥 Tag all members in the group."
  },
  "seticon": {
    "category": "👥 Group",
    "desc": "👥 Set the group icon."
  },
  "setsubject": {
    "category": "👥 Group",
    "desc": "👥 Set the group subject."
  },
  "removeall": {
    "category": "👥 Group",
    "desc": "👥 Remove all members from the group."
  },
  "setdecs": {
    "category": "👥 Group",
    "desc": "👥 Set the group description."
  },
  "mute": {
    "category": "👥 Group",
    "desc": "👥 Mute a member."
  },
  "unmute": {
    "category": "👥 Group",
    "desc": "👥 Unmute a member."
  },
  "kick": {
    "category": "👥 Group",
    "desc": "👥 Kick a member from the group."
  },
  "groupinfo": {
    "category": "👥 Group",
    "desc": "👥 Get information about the group."
  },
  "getpic": {
    "category": "👥 Group",
    "desc": "👥 Retrieve the group profile picture."
  },
  "setgoodbye": {
    "category": "👥 Group",
    "desc": "👥 Set the goodbye message for the group."
  },
  "setwelcome": {
    "category": "👥 Group",
    "desc": "👥 Set the welcome message for the group."
  },
  "add": {
    "category": "👥 Group",
    "desc": "👥 Add a member to the group."
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

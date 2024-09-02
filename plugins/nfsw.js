const axios = require('axios');
const { cmd, commands } = require('../command');
const cheerio = require('cheerio');
const dyluxApi = require("api-dylux");

//========================================================================================================================================
cmd({
    pattern: 'hentai2',
    desc: 'Fetches NSFW Waifu images',
    category: 'download',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/waifu'; // API endpoint for Waifu images

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            await conn.sendMessage(from, { image: { url: imageUrl } }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Trap images
cmd({
    pattern: 'trap',
    desc: 'Fetches NSFW trap images',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/trap';

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Trap Waifu Image #${i + 1} 🔥\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Neko images
cmd({
    pattern: 'hneko',
    desc: 'Fetches NSFW neko images',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/neko';

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Neko Waifu Image #${i + 1} 🐾\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Blowjob images
cmd({
    pattern: 'blowjob',
    desc: 'Fetches NSFW blowjob images',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/blowjob';

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Blowjob Waifu Image #${i + 1} 🍑\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW hentai videos
cmd({
    pattern: 'hentaivid',
    desc: 'Fetches NSFW hentai videos',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let videos = await hentai();
        let length = videos.length > 10 ? 10 : videos.length;
        let i = Math.floor(Math.random() * length);

        await conn.sendMessage(from, {
            video: { url: videos[i].video_1 },
            caption: `*Title:* ${videos[i].title}\n*Category:* ${videos[i].category} 🎥\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`
        }, { quoted: mek });
    } catch (error) {
        reply('🚫 An error occurred while retrieving the video: ' + error.message);
    }
});

async function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153);
        axios.get('https://sfmcompile.club/page/' + page)
            .then((data) => {
                const $ = cheerio.load(data.data);
                const results = [];
                $('#primary > div > div > ul > li > article').each(function () {
                    results.push({
                        title: $(this).find('header > h2').text(),
                        link: $(this).find('header > h2 > a').attr('href'),
                        category: $(this).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                        share_count: $(this).find('header > div.entry-after-title > p > span.entry-shares').text(),
                        views_count: $(this).find('header > div.entry-after-title > p > span.entry-views').text(),
                        type: $(this).find('source').attr('type') || 'video/mp4',
                        video_1: $(this).find('source').attr('src') || $(this).find('img').attr('data-src'),
                        video_2: $(this).find('video > a').attr('href') || ''
                    });
                });
                resolve(results);
            })
            .catch((error) => reject(error));
    });
}

//========================================================================================================================================
// Command to fetch random NSFW content
cmd({
    pattern: 'customnsfw',
    desc: 'Fetches random NSFW content',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/custom'; // Replace with the actual URL if different

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Custom NSFW Image #${i + 1} 🔥\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================

const nsfwCommands = [
    { pattern: 'nsfwloli', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwloli.json' },
    { pattern: 'nsfwfoot', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwfoot.json' },
    { pattern: 'nsfwass', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwass.json' },
    { pattern: 'nsfwbdsm', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwbdsm.json' },
    { pattern: 'nsfwcum', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwcum.json' },
    { pattern: 'nsfwero', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwero.json' },
    { pattern: 'nsfwfemdom', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwfemdom.json' },
    { pattern: 'nsfwglass', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwglass.json' },
    { pattern: 'hentai', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/hentai.json' },
    { pattern: 'nsfworgy', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfworgy.json' },
    { pattern: 'tetas', url: 'https://api-fgmods.ddns.net/api/nsfw/boobs?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/tetas.json' },
    { pattern: 'booty', url: 'https://api-fgmods.ddns.net/api/nsfw/ass?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/booty.json' },
    { pattern: 'ecchi', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/ecchi.json' },
    { pattern: 'furro', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/furro.json' },
    { pattern: 'trapito', url: 'https://api.waifu.pics/nsfw/trap' },
    { pattern: 'imagenlesbians', url: 'https://api-fgmods.ddns.net/api/nsfw/lesbian?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/imagenlesbians.json' },
    { pattern: 'panties', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/panties.json' },
    { pattern: 'pene', url: 'https://api-fgmods.ddns.net/api/nsfw/penis?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/pene.json' },
    { pattern: 'porno', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/porno.json' },
    { pattern: 'randomxxx', urls: [
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/tetas.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/booty.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/imagenlesbians.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/panties.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/porno.json'
    ] },
    { pattern: 'pechos', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/pechos.json' },
    { pattern: 'yaoi', url: 'https://nekobot.xyz/api/image?type=yaoi' },
    { pattern: 'yaoi2', url: 'https://purrbot.site/api/img/nsfw/yaoi/gif' },
    { pattern: 'yuri', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/yuri.json' },
    { pattern: 'yuri2', url: 'https://purrbot.site/api/img/nsfw/yuri/gif', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/yuri.json' }
];

const fetchImage = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error(`Error fetching from ${url}: ${error}`);
        return null;
    }
};

nsfwCommands.forEach(({ pattern, url, fallback, urls }) => {
    cmd({
        pattern,
        desc: `Fetches random ${pattern} image.`,
        category: "nsfw",
        react: "🔞",
        filename: __filename
    },
    async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
        try {
            let imageUrl;
            if (urls) {
                const randomUrl = urls[Math.floor(Math.random() * urls.length)];
                const res = await fetchImage(randomUrl);
                imageUrl = res[Math.floor(Math.random() * res.length)];
            } else {
                const data = await fetchImage(url);
                if (data) {
                    if (Array.isArray(data)) {
                        imageUrl = data[Math.floor(Math.random() * data.length)];
                    } else if (data.url) {
                        imageUrl = data.url;
                    }
                } else if (fallback) {
                    const fallbackData = await fetchImage(fallback);
                    imageUrl = fallbackData[Math.floor(Math.random() * fallbackData.length)];
                }
            }
            
            if (imageUrl) {
                await conn.sendMessage(from, { image: { url: imageUrl }, caption: ` 🫦 Here Is Your Sexy _${command}_\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`.trim() }, { quoted: m });
            } else {
                reply('Sorry, I could not fetch the image.');
            }
        } catch (error) {
            console.error(`Error handling ${pattern} command: ${error}`);
            reply('An error occurred while processing your request.');
        }
    });
});

//========================================================================================================================================


const xnxxCommands = [
  {
    pattern: "xnxx",
    react: "🔞",
    desc: "Search for xnxx videos",
    category: "download",
    use: ".xnxx <query>",
    filename: __filename
  },
  {
    pattern: "xnxxdl",
    react: "👾",
    desc: "Download xnxx video",
    category: "download",
    use: ".xnxxdl <link>",
    filename: __filename
  }
];

// xnxx Search Command
cmd(xnxxCommands[0], async (conn, message, info, { from, q, reply }) => {
  try {
    // Check if a query is provided
    if (!q) {
      return await reply("Please provide a search query. Usage: .xnxx <query>");
    }

    // Perform the search using api-dylux
    let searchResults = await dyluxApi.xnxxSearch(q);

    // If search is successful and results are found
    if (searchResults.status) {
      let resultText = searchResults.result.map((item, index) => {
        return `${index + 1}. *Title:* ${item.title}\n*Link:* ${item.link}\n`;
      }).join("\n");

      // Append BHASHI-MD signature
      resultText += `\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

      // Send the formatted search results back to the user
      await conn.sendMessage(from, { text: resultText }, { quoted: message });
    } else {
      await reply("No results found for your search.");
    }
  } catch (error) {
    console.error(error);
    await reply("An error occurred while processing your request.");
  }
});

// xnxx Download Command
cmd(xnxxCommands[1], async (conn, message, info, { from, q, reply }) => {
  try {
    // Check if a link is provided
    if (!q || !q.includes("xnxx.com")) {
      return await reply("Please provide a valid xnxx link. Usage: .xnxxdl <link>");
    }

    // Perform the download using api-dylux
    let downloadResult = await dyluxApi.xnxxdl(q);

    // If download is successful, send the video with caption
    if (downloadResult.url_dl) {
      const videoInfo = `*BHASHI XNXX DL*\n\n✍ *TITLE:* ${downloadResult.title}\n⌛ *DURATION:* ${downloadResult.duration}\n📽 *QUALITY:* ${downloadResult.quality}\n\n*ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴅ ʙʏ ʙʜᴀꜱʜɪᴛʜᴀ ᴀɴᴅ ᴠɪꜱʜᴡᴀ ᴍɪʜɪʀᴀɴɢᴀ*`;

      await conn.sendMessage(from, { video: { url: downloadResult.url_dl }, caption: videoInfo }, { quoted: message });
    } else {
      await reply("Failed to download the video.");
    }
  } catch (error) {
    console.error(error);
    await reply("An error occurred while processing your request.");
  }
});


//========================================================================================================================================

const axios = require('axios');
const { cmd, commands } = require('../command');

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
                await conn.sendMessage(from, { image: { url: imageUrl }, caption: `_${command}_`.trim() }, { quoted: m });
            } else {
                reply('Sorry, I could not fetch the image.');
            }
        } catch (error) {
            console.error(`Error handling ${pattern} command: ${error}`);
            reply('An error occurred while processing your request.');
        }
    });
});

module.exports = handler;

const axios = require('axios');
const { cmd } = require('../command'); // Adjust the path if necessary

cmd({
    pattern: 'hentai',
    desc: 'Fetches NSFW Waifu images',
    category: 'Hentai',
    react: '🙄',
    fromMe: true
}, async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms, verifGroupe, superUser } = commandeOptions;

    if (!verifGroupe && !superUser) {
        return repondre('⚠️ This command is reserved for groups only.');
    }

    const isHentaiGroupe = await hdb.checkFromHentaiList(origineMessage);

    if (!isHentaiGroupe && !superUser) {
        return repondre('🚫 This group is not a hentai group. Calm down.');
    }

    const url = 'https://api.waifu.pics/nsfw/waifu'; // API endpoint for Waifu images

    try {
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            await zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
        }
    } catch (error) {
        console.error(error);
        repondre('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

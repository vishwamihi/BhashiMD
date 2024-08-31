const axios = require('axios');
const { cmd } = require('../command'); // Adjust the path if necessary

cmd({
    pattern: 'igdl',
    desc: 'Download Instagram videos or images',
    category: 'Download',
    react: '📥',
    fromMe: true
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    const link = arg.join(' ');

    if (!link) {
        return repondre('❌ Veuillez fournir un lien vidéo Instagram.');
    }

    try {
        // Fetch the media from the API
        const response = await axios.get(`https://api.vihangayt.com/downloader/ig?url=${encodeURIComponent(link)}`);
        const mediaData = response.data.data.data[0];

        if (mediaData.type === 'video') {
            // Send the video
            await zk.sendMessage(dest, {
                video: { url: mediaData.url },
                caption: '📹 Instagram video downloader powered by *MSELA-CHUI-V2*',
                gifPlayback: false
            }, { quoted: ms });
        } else if (mediaData.type === 'image') {
            // Send the image
            await zk.sendMessage(dest, {
                image: { url: mediaData.url },
                caption: '📸 Instagram image downloader powered by *MSELA-CHUI-V2*'
            });
        } else {
            // Handle unexpected media type
            repondre('⚠️ Unsupported media type.');
        }
    } catch (e) {
        console.error(e);
        repondre(`🚫 Une erreur est survenue lors du téléchargement : ${e.message}`);
    }
});

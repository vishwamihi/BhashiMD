const axios = require('axios');
const { cmd } = require('../command'); // Adjust the path if necessary

cmd({
    pattern: 'hentai',
    desc: 'Fetches NSFW Waifu images',
    category: 'download',
    react: '🙄',
    fromMe: true
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = 'https://api.waifu.pics/nsfw/waifu'; // API endpoint for Waifu images

        // Fetch and send 5 images
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            // Send the image
            await conn.sendMessage(from, { image: { url: imageUrl } }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

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
      const caption = `Trap Waifu Image #${i + 1} 🔥`;
      await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
    }
  } catch (error) {
    reply('🚫 An error occurred while retrieving the data: ' + error.message);
  }
});

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
      const caption = `Neko Waifu Image #${i + 1} 🐾`;
      await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
    }
  } catch (error) {
    reply('🚫 An error occurred while retrieving the data: ' + error.message);
  }
});

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
      const caption = `Blowjob Waifu Image #${i + 1} 🍑`;
      await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
    }
  } catch (error) {
    reply('🚫 An error occurred while retrieving the data: ' + error.message);
  }
});

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
      caption: `*Title:* ${videos[i].title}\n*Category:* ${videos[i].category} 🎥`
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
        const hasil = [];
        $('#primary > div > div > ul > li > article').each(function (a, b) {
          hasil.push({
            title: $(b).find('header > h2').text(),
            link: $(b).find('header > h2 > a').attr('href'),
            category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
            share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
            views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
            type: $(b).find('source').attr('type') || 'video/mp4',
            video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
            video_2: $(b).find('video > a').attr('href') || ''
          });
        });
        resolve(hasil);
      })
      .catch((error) => reject(error));
  });
}

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
      const caption = `Custom NSFW Image #${i + 1} 🔥`;
      await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
    }
  } catch (error) {
    reply('🚫 An error occurred while retrieving the data: ' + error.message);
  }
});

const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const { sinhalaSub } = require('mrnima-moviedl');

cmd({
    pattern: "moviedl",
    desc: "Search and download movies/TV shows with Sinhala subtitles.",
    react: "🎬",
    category: "entertainment",
    filename: __filename,
    use: '<movie/show name>',
}, async (message, match) => {
    if (!match) return message.reply("Please provide a movie or TV show name to search.");

    const movie = sinhalaSub();
    try {
        const searchResult = await movie.search(match);
        if (searchResult.status && searchResult.result.length > 0) {
            let resultText = "🎬 Search Results:\n\n";
            searchResult.result.forEach((item, index) => {
                resultText += `${index + 1}. ${item.title} (${item.type})\n`;
            });
            resultText += "\nReply with the number of your choice to get download links.";
            return message.reply(resultText);
        } else {
            return message.reply("No results found. Try a different search term.");
        }
    } catch (error) {
        console.error('Error in moviedl command:', error);
        return message.reply("An error occurred while searching. Please try again later.");
    }
});

cmd({
    pattern: "moviedl_download",
    desc: "Get download links for selected movie/show.",
    react: "🔗",
    category: "entertainment",
    filename: __filename,
    use: '<result number>',
}, async (message, match) => {
    if (!match) return message.reply("Please provide the number of the result you want to download.");

    const index = parseInt(match) - 1;
    const movie = sinhalaSub();
    try {
        const searchResult = await movie.search(message.quoted.text.split('\n')[0].replace('🎬 Search Results:', '').trim());
        if (searchResult.status && searchResult.result[index]) {
            const item = searchResult.result[index];
            const downloadResult = await movie.download(item.link);
            if (downloadResult.status && downloadResult.result.links) {
                let linkText = `🔗 Download Links for ${item.title}:\n\n`;
                downloadResult.result.links.forEach((link) => {
                    linkText += `${link.quality} (${link.size}): ${link.link}\n`;
                });
                return message.reply(linkText);
            } else {
                return message.reply("Couldn't fetch download links. Please try again.");
            }
        } else {
            return message.reply("Invalid selection. Please try searching again.");
        }
    } catch (error) {
        console.error('Error in moviedl_download command:', error);
        return message.reply("An error occurred while fetching download links. Please try again later.");
    }
});

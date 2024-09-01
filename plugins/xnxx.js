const dyluxApi = require("api-dylux");
const { cmd } = require('../command');

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
      resultText += `\n\n> *BHASHI-MD*`;

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
      const videoInfo = `*XNXX DL*\n\n✍ *Title:* ${downloadResult.title}\n⌛ *Duration:* ${downloadResult.duration}\n📽 *Quality:* ${downloadResult.quality}\n\n> *BHASHI-MD*`;

      await conn.sendMessage(from, { video: { url: downloadResult.url_dl }, caption: videoInfo }, { quoted: message });
    } else {
      await reply("Failed to download the video.");
    }
  } catch (error) {
    console.error(error);
    await reply("An error occurred while processing your request.");
  }
});

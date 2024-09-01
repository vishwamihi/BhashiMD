const dyluxApi = require("api-dylux"); // Import the module once
const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "ytdl",
  desc: "Download YouTube video.",
  category: "download",
  use: ".ytdl <YouTube link>",
  react: '🎥',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  command,
  args,
  q,
  reply
}) => {
  try {
    // Validate if the provided link contains "youtube.com" or "youtu.be"
    if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
      return reply("Please enter a valid YouTube link.");
    }

    // Fetch video data using the provided YouTube link
    let videoData = await dyluxApi.youtubedl(q); // Use the initialized API

    // Ensure that videoData contains the necessary properties
    if (!videoData || !videoData.title || !videoData.url_dl) {
      return reply("Failed to retrieve video data.");
    }

    // Prepare the message with video details
    const videoMessage = {
      caption: `*YouTube Download*\n\n🎬 *Title:* ${videoData.title}\n📅 *Published:* ${videoData.published}\n🔗 *Link:* ${videoData.url}`,
      video: { url: videoData.url_dl }
    };

    // Send the video to the chat
    await conn.sendMessage(from, videoMessage, { quoted: mek });
  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
});

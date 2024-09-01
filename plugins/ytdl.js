const config = require("../config");
const { cmd, commands } = require("../command");

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

    // Import the necessary module for downloading the YouTube video
    const apiDylux = require("api-dylux");

    // Fetch video data using the provided YouTube link
    let videoData = await apiDylux.youtubedl(q);

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



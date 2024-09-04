
const axios = require('axios');
const { cmd } = require('../command');


cmd(
  {
    pattern: "iosnews",
    alias: ["ios"],
    desc: "Fetches the latest iOS news.",
    category: "news",
    filename: __filename,
    use: "iosnews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/ios";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch iOS news.*");
      }

      const { title, link, images, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;

      if (images && images.length > 0) {
        output += "*Images:*\n";
        images.forEach((image) => {
          output += `${image}\n`;
        });
        output += "\n";
      }

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: iosnews",
        error,
        "*Failed to fetch iOS news.*"
      );
    }
  }
);

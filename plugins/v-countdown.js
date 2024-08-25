const { cmd } = require('../command');

cmd({
  pattern: "countdown",
  desc: "Set a countdown timer with a custom message.",
  category: "utility",
  react: "⏲️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
      if (args.length < 2) {
          return reply("❌ **Usage:** `!countdown [time in seconds] [message]`\nExample: `!countdown 10 Take a break!`");
      }

      const seconds = parseInt(args[0]);
      const message = args.slice(1).join(' ');

      if (isNaN(seconds) || seconds <= 0) {
          return reply("❌ **Error:** Please provide a valid number of seconds greater than 0.");
      }

      const countdownMessage = `🕰️ *Countdown Set!*\n⏳ *Time:* ${seconds} seconds\n📝 *Message:* ${message}`;
      reply(countdownMessage);

      setTimeout(() => {
          conn.sendMessage(from, { text: `🚨 *Time's Up!*\n_${message}_` });
      }, seconds * 1000);

  } catch (e) {
      console.error(e);
      reply("❌ **Error:** An unexpected error occurred while setting the countdown timer.");
  }
});

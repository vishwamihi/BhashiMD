const axios = require('axios');
const { cmd, commands } = require('../command');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs').promises;

// QR Code command
cmd({
  pattern: "qr",
  desc: "Generate a QR code from text or URL.",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("⚠️ Please provide text or URL to generate a QR code.");
    const text = q.trim();
    const qrOutputPath = path.join(__dirname, 'qrcode_output.png');

    // Generate QR code
    await qrcode.toFile(qrOutputPath, text, {
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // Read the QR code image
    const image = await fs.readFile(qrOutputPath);

    // Send the QR code image
    await conn.sendMessage(from, { 
      image: image,
      caption: `📱 Here's your QR code for: ${text}\n\n> BHASHI-MD`,
    }, { quoted: mek });

    // Delete the temporary file
    await fs.unlink(qrOutputPath);
  } catch (e) {
    console.error('Error generating QR code:', e.message);
    reply(`❌ An error occurred while generating the QR code: ${e.message}`);
  }
});
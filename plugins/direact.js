const fs = require('fs').promises;
const axios = require('axios');
const { cmd } = require('../command');
const { downloadMediaMessage } = require('@adiwajshing/baileys');

cmd({
    pattern: "upload",
    desc: "Upload a file and get a direct download link.",
    react: "📤",
    category: "utility",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, reply, args
}) => {
    try {
        // Check if a file is attached
        const quotedMsg = mek.quoted || mek;
        if (!quotedMsg.mimetype) {
            return reply("Please reply to a file or media that you want to upload.");
        }

        // Download the file
        const buffer = await downloadMediaMessage(quotedMsg, 'buffer', {});
        
        // Generate a filename
        const filename = quotedMsg.filename || `file_${Date.now()}.${quotedMsg.mimetype.split('/')[1]}`;

        // Upload to Transfer.sh
        const uploadResponse = await axios.put(
            `https://transfer.sh/${filename}`,
            buffer,
            {
                headers: {
                    'Content-Type': quotedMsg.mimetype
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            }
        );

        const directLink = uploadResponse.data.trim();

        return reply(`File uploaded successfully!\nDirect download link: ${directLink}`);
    } catch (error) {
        console.error("Upload command error:", error);
        return reply(`An error occurred during upload: ${error.message}`);
    }
});


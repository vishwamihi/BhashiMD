const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Sticker } = require('wa-sticker-formatter');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');

// Helper function to get file buffer
async function getFileBuffer(mediakey, mediaType) {
    const stream = await downloadContentFromMessage(mediakey, mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}

// Command handler
cmd({
    pattern: "sticker",
    alias: ["s", "stick"],
    desc: "Create stickers from image or video",
    category: "utility",
    react: "✂️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const msg = m.message;
        const media = msg?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage ||
                      msg?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ||
                      msg?.videoMessage || msg?.imageMessage;

        if (!media?.mimetype) {
            return conn.sendMessage(from, {
                text: "Please reply to an image or video with the .sticker command to create a sticker."
            }, { quoted: mek });
        }

        // Get the media buffer
        const mediaBuffer = await getFileBuffer(media, media.mimetype.split('/')[0]);

        // Create sticker
        const sticker = new Sticker(mediaBuffer, {
            pack: 'BHASHI-MD',
            author: 'BHASHI-MD',
            type: 'full',
            background: '#ffffff',
            quality: 90
        });

        // Send the sticker
        await conn.sendMessage(from, {
            sticker: await sticker.toBuffer()
        }, { quoted: mek });

    } catch (error) {
        console.error('Error creating sticker:', error);
        conn.sendMessage(from, {
            text: "An error occurred while creating the sticker. Please try again."
        }, { quoted: mek });
    }
});

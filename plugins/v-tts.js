const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);

cmd({
    pattern: "tts",
    desc: "Convert text to speech using AI",
    category: "ai",
    react: "🗣️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 1) return reply('Please provide text to convert to speech.');

        const text = args.join(' ');

        const response = await axios({
            method: 'post',
            url: 'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM',
            headers: {
                'accept': 'audio/mpeg',
                'xi-api-key': config.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            data: {
                text: text,
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.75
                }
            },
            responseType: 'stream'
        });

        const tempFile = './temp_audio.mp3';
        await streamPipeline(response.data, fs.createWriteStream(tempFile));

        // Send the audio as a voice note
        await conn.sendMessage(from, { 
            audio: { url: tempFile },
            mimetype: 'audio/mp4',
            caption: '> BHASHI-MD',  // Caption for the audio message
            ptt: true  // Set this to true to send as a voice note (PTT)
        }, { quoted: mek });

        fs.unlinkSync(tempFile); // Delete the temporary file after sending

    } catch (e) {
        console.error(e);
        reply('An error occurred while converting text to speech.');
    }
});

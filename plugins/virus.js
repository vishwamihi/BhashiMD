const axios = require('axios');
const { cmd } = require('../command'); // Adjust the path if necessary

cmd({
    pattern: "virus",
    alias: ["philips"],
    desc: "Fetch virus information from Philips API",
    react: "🦠",
    category: "info",
    filename: __filename,
}, async (Void, citel, text) => {
    try {
        // Fetch data from the API
        const response = await axios.get('https://saipulanuar.ga/api/virus/philips');
        const data = response.data;

        // Process and format the response
        if (data && data.message) {
            const message = data.message;
            const description = `🔍 *Virus Information:*\n\n${message}`;
            
            // Send the response back to the user
            return await Void.sendMessage(citel.chat, { text: description }, { quoted: citel });
        } else {
            return citel.reply("*No data available from the API.*");
        }
    } catch (err) {
        console.log(err);
        return citel.reply(`❌ *Error:* ${err.message}`);
    }
});

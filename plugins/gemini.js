const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI('AIzaSyB0i2lIksuFBjgzW21yoHL4OZSsGrLvVvw');

module.exports = (Command, msg) => {
    Command({
        cmd: ['aigemini', 'gemini'],
        desc: 'Chat with the most advanced AI created by Google AI',
        react: "👨‍💻",
        type: 'AI COMMANDS',
        handler: async (m, sock) => {
            try {
                // Extract the query from the message
                const args = m.message?.conversation?.split(' ').slice(1).join(' ') ||
                             m.message?.extendedTextMessage?.text?.split(' ').slice(1).join(' ');

                if (!args) {
                    await msg.reply('Hey, how can I help you!', m);
                    return;
                }

                await msg.react('🤝🏻', m);

                // Initialize the generative model
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                // Generate the content
                const result = await model.generateContent({ prompt: args });
                const responseText = result.text;

                await msg.reply(responseText, m);
                await msg.react('✅', m);
            } catch (error) {
                if (error.message.includes('Candidate was blocked due to SAFETY')) {
                    await msg.reply("Please always respect the rules and guidelines when using this service. Let's keep the conversation positive and constructive! 🌟", m);
                } else {
                    console.error("Error handling command:", error);
                    await msg.reply("An error occurred while processing your request. Please try again later.", m);
                }
            }
        }
    }, msg);
};

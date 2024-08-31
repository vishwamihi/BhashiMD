const { cmd } = require('../command');  // Adjust the path based on your project structure
const truecaller = require('truecaller-scraper');  // Ensure this package exists and is used correctly

cmd({
    pattern: "numinfo",
    desc: "Get phone number information",
    category: "useful",
    react: "📞",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a phone number. Example: .phoneinfo +14155552671");
        }

        const phoneNumber = args[0];
        
        // Fetch phone number information
        const info = await truecaller(phoneNumber);
        
        // Format the response
        const response = `
            📞 **Phone Number Information**
            - **Name**: ${info.name || "Not Available"}
            - **Country Code**: ${info.countryCode || "Not Available"}
            - **Carrier**: ${info.carrier || "Not Available"}
            - **Location**: ${info.location || "Not Available"}
        `;
        
        reply(response);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        reply(`🚫 An error occurred: ${error.message}`);
    }
});

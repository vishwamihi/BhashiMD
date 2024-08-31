const truecaller = require('truecaller-scraper');

// Command handler
cmd({
    pattern: "numlook",
    desc: "Get information about a phone number from Truecaller",
    category: "useful",
    react: "📞",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a phone number. Example: .phonelookup +14155552671");
        }

        const phoneNumber = args[0];
        
        truecaller(phoneNumber)
            .then(info => {
                if (info) {
                    reply(`📞 Phone Number Information\n\n🔗 Phone Number: ${info.phoneNumber}\n🌍 Country Code: ${info.countryCode}\n📍 Name: ${info.name}\n\n> BHASHI-MD`);
                } else {
                    reply("❌ No information found.");
                }
            })
            .catch(error => {
                console.log(error);
                reply(`🚫 An error occurred: ${error.message}`);
            });
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

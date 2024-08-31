const axios = require('axios'); // Ensure axios is installed and required
const { cmd, commands } = require('../command');

cmd({
    pattern: "iplookup",
    desc: "Get geolocation information for an IP address",
    category: "useful",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide an IP address. Example: .iplookup 8.8.8.8");
        }

        const ipAddress = args[0];

        // Replace this URL with the actual API endpoint
        const apiUrl = `https://ipinfo.io/${encodeURIComponent(ipAddress)}/json`;

        // If using a service that requires an API key, add it here
        const response = await axios.get(apiUrl);

        const data = response.data;
        const { ip, city, region, country, loc, org } = data;

        reply(`📍 IP Address Information\n\n🔗 IP Address: ${ip}\n🌆 City: ${city}\n🗺️ Region: ${region}\n🌍 Country: ${country}\n📡 Location: ${loc}\n🏢 Organization: ${org}\n\n> BHASHI-MD`);
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

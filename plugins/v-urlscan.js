const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "shodan",
    desc: "🔍 Retrieve basic information about a website using Shodan.",
    category: "🔧 Tools",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a domain or IP address to search. Example: .shodan example.com")
        }

        const query = args[0];
        // Replace with your Shodan API key
        const apiKey = '5d6295d98f638ea52f2b17620c9b3e772005c01e331c54d6ae9d70bf6b99262f';

        // Get the IP address of the domain if it's provided as a domain
        let ipAddress = query;
        if (!ipAddress.includes('.')) {
            const dnsResponse = await axios.get(`https://dns.google/resolve?name=${query}&type=A`);
            ipAddress = dnsResponse.data.Answer[0].data;
        }

        // Fetch information from Shodan
        const response = await axios.get(`https://api.shodan.io/shodan/host/${ipAddress}?key=${apiKey}`);
        const data = response.data;

        const message = `
🔍 *Shodan Host Information* 🔍

🌐 Domain/IP: ${query}
📍 IP Address: ${ipAddress}
🏷️ Hostname: ${data.hostname || 'N/A'}
🗂️ Organization: ${data.org || 'N/A'}
🔐 Ports: ${data.ports.join(', ') || 'N/A'}
📈 Location: ${data.location.city || 'N/A'}, ${data.location.country_name || 'N/A'}

*Disclaimer: Use this tool responsibly and ensure you have permission to check the provided domain/IP.*
        `.trim();

        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

const dns = require('dns'); // Adjust this to your command registration method
const { cmd, commands } = require('../command');

cmd({
    pattern: "dnslookup",
    desc: "Perform DNS lookup on a domain",
    category: "useful",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a domain to lookup. Example: .dnslookup example.com");
        }

        const domain = args[0];
        dns.lookup(domain, (err, address) => {
            if (err) {
                return reply(`❌ DNS Lookup failed: ${err.message}`);
            }
            reply(`🌐 DNS Lookup for ${domain}\n\n🔗 IP Address: ${address}\n\n> BHASHI-MD`);
        });
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

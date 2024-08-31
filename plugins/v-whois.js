const whois = require('whois')
const { cmd, commands } = require('../command');

cmd({
    pattern: "whois",
    desc: "Perform WHOIS lookup on a domain or IP",
    category: "useful",
    react: "📄",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a domain or IP address. Example: .whois google.com")
        }

        const target = args[0]
        whois.lookup(target, (err, data) => {
            if (err) {
                return reply(`❌ WHOIS lookup failed: ${err.message}`)
            }
            reply(`*📄 WHOIS Lookup for ${target} 📄*\n\n${data}\n\n> BHASHI-MD`)
        })
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})

const whois = require('whois')

cmd({
    pattern: "whois",
    desc: "Perform WHOIS lookup on a domain or IP",
    category: "cybersecurity",
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
            reply(`📄 *WHOIS Lookup for ${target}* 📄\n\n${data}`)
        })
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})

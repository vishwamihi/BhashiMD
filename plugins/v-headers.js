const axios = require('axios')
const { cmd, commands } = require('../command');
cmd({
    pattern: "headers",
    desc: "Fetch HTTP headers from a website",
    category: "cybersecurity",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a URL. Example: .headers https://example.com")
        }

        const url = args[0]
        const response = await axios.head(url)
        const headers = response.headers

        const headerInfo = `
*📑 HTTP Headers for ${url} 📑*
> BHASHI-MD

${Object.entries(headers).map(([key, value]) => `• ${key}: ${value}`).join('\n')}
        `.trim()

        reply(headerInfo)
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})

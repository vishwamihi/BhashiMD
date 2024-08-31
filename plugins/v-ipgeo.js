const axios = require('axios')
const { cmd, commands } = require('../command');

cmd({
    pattern: "ipgeo",
    desc: "Get geolocation info for an IP address",
    category: "useful",
    react: "🌍",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide an IP address. Example: .ipgeo 8.8.8.8")
        }

        const ip = args[0]
        const response = await axios.get(`https://ipinfo.io/${ip}/json`)
        const data = response.data

        const geoInfo = `
🌍 *IP Geolocation Info for ${ip}* 🌍

📍 Location: ${data.city}, ${data.region}, ${data.country}
🌐 ISP: ${data.org}
📌 Coordinates: ${data.loc}

For more info, use .whois ${ip}
        `.trim()

        reply(geoInfo)
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})

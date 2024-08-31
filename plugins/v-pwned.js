const axios = require('axios')
const { cmd, commands } = require('../command');

cmd({
    pattern: "pwned",
    desc: "Check if an email or password has been compromised in data breaches",
    category: "cybersecurity",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide an email or password to check. Example: .pwned [email/password]")
        }

        const input = args[0]
        const apiKey = config.HIBP_API_KEY // Replace with your HIBP API key

        // Check if the input is an email or password
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isEmail = emailRegex.test(input)

        let url = ''
        if (isEmail) {
            // Email breach check
            url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(input)}`
        } else {
            // Password breach check (hashed password)
            const sha1 = require('crypto').createHash('sha1').update(input).digest('hex').toUpperCase()
            const prefix = sha1.slice(0, 5)
            url = `https://api.pwnedpasswords.com/range/${prefix}`
        }

        // Perform the breach check request
        const response = await axios.get(url, {
            headers: { 'hibp-api-key': apiKey }
        })

        if (response.status === 200 && response.data) {
            let message
            if (isEmail) {
                // Email was found in breaches
                const breaches = response.data.map(breach => `• ${breach.Name} (Date: ${breach.BreachDate})`).join('\n')
                message = `
🔍 *Breach Report for ${input}* 🔍

⚠️ The email has been found in the following breaches:
${breaches}
                `.trim()
            } else {
                // Password was found in breaches
                message = `⚠️ The provided password has been compromised in data breaches. Consider changing it immediately!`
            }

            // Send the message
            await conn.sendMessage(from, { text: message }, { quoted: mek })
        } else {
            reply(`✅ No breaches found for ${input}.`)
        }
    } catch (e) {
        console.log(e)
        if (e.response && e.response.status === 404) {
            reply(`✅ No breaches found for ${input}.`)
        } else {
            reply(`🚫 An error occurred: ${e.message}`)
        }
    }
})

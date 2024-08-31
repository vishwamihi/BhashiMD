const config = require('../config')
const { cmd, commands } = require('../command')

const cybersecurityTips = [
    "Use a unique password for each of your accounts.",
    "Enable two-factor authentication (2FA) whenever possible.",
    "Keep your software and operating systems up to date.",
    "Be cautious when clicking on links in emails or messages.",
    "Use a reputable antivirus software and keep it updated.",
    "Avoid using public Wi-Fi networks for sensitive transactions.",
    "Regularly backup your important data.",
    "Use a VPN when connecting to public networks.",
    "Be wary of phishing attempts in emails or messages.",
    "Don't share sensitive information on social media.",
    "Use encrypted messaging apps for sensitive communications.",
    "Regularly check your accounts for any suspicious activity.",
    "Use a password manager to generate and store strong passwords.",
    "Be cautious when downloading attachments from unknown sources.",
    "Enable automatic updates for your software and apps.",
    "Use privacy settings on your social media accounts.",
    "Avoid using easily guessable information in your passwords.",
    "Be careful what you plug into your devices (e.g., unknown USB drives).",
    "Use secure and encrypted cloud services for storing sensitive data.",
    "Educate yourself about current cybersecurity threats and best practices."
]

cmd({
    pattern: "cybertips",
    desc: "Get random cybersecurity tips.",
    category: "useful",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Shuffle the tips array
        const shuffled = cybersecurityTips.sort(() => 0.5 - Math.random());
        
        // Select 5 random tips
        const selectedTips = shuffled.slice(0, 5);
        
        const tipsMessage = `
🛡️ *Cybersecurity Tips* 🛡️

> Stay safe online with these important tips:

${selectedTips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n')}

> 🔐 Remember: Your online security is in your hands!

> Want more tips? Just use the .cybertips command again!
        `.trim();
        
        await conn.sendMessage(from, { text: tipsMessage }, { quoted: mek })
        
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})

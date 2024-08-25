const config = require('../config')
const { cmd, commands } = require('../command')
const zxcvbn = require('zxcvbn')

cmd({
  pattern: "checkpw",
  desc: "Check password strength and provide improvement suggestions.",
  category: "security",
  react: "🔒",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("Please provide a password to check. Usage: .checkpw YourPasswordHere")

    const result = zxcvbn(q)
    const score = result.score // 0 to 4
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second

    let strength, color
    switch(score) {
      case 0:
      case 1:
        strength = "Very Weak"
        color = "🔴"
        break
      case 2:
        strength = "Weak"
        color = "🟠"
        break
      case 3:
        strength = "Moderate"
        color = "🟡"
        break
      case 4:
        strength = "Strong"
        color = "🟢"
        break
    }

    const suggestions = result.feedback.suggestions.slice(0, 3)

    const resultMessage = `
🔒 *Password Strength Check* 🔒

🚨 _Strength:_ ${color} *${strength}*
👾 _Estimated crack time:_ *${crackTime}*

🚀 _Improvement Suggestions:_
${suggestions.map((s, i) => `${i+1}. ${s}`).join('\n')}

🔑 *General Tips:*
• _Use a mix of uppercase and lowercase letters_
• _Include numbers and special characters_
• _Avoid common words or phrases_
• _Use a longer password (12+ characters)_
• _Use a unique password for each account_

*⚠️ Note: Never share your real passwords. This tool is for educational purposes only.*
`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })

  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})

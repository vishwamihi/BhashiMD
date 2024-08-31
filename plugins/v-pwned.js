const { cmd, commands } = require('../command');
const { default: HaveIBeenPwned } = require('haveibeenpwned');
const pwnedPasswords = require('pwnedpasswords');

const hibp = new HaveIBeenPwned(); // Create an instance of the HIBP class

cmd({
    pattern: "pwned",
    desc: "Check if an email or password has been compromised in data breaches",
    category: "cybersecurity",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide an email or password to check. Example: .pwned [email/password]");
        }

        const input = args[0];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(input);

        if (isEmail) {
            // Email breach check
            const breaches = await hibp.breachedAccount(input);
            if (breaches.length > 0) {
                const breachList = breaches.map(breach => `• ${breach.Name} (Date: ${breach.BreachDate})`).join('\n');
                const message = `
🔍 *Breach Report for ${input}* 🔍

⚠️ The email has been found in the following breaches:
${breachList}
                `.trim();
                await conn.sendMessage(from, { text: message }, { quoted: mek });
            } else {
                reply(`✅ No breaches found for ${input}.`);
            }
        } else {
            // Password breach check (hashed password)
            const sha1 = require('crypto').createHash('sha1').update(input).digest('hex').toUpperCase();
            const prefix = sha1.slice(0, 5);
            const suffix = sha1.slice(5);

            const result = await pwnedPasswords.checkPassword(prefix, suffix);
            if (result) {
                reply(`⚠️ The provided password has been compromised in data breaches. Consider changing it immediately!`);
            } else {
                reply(`✅ The provided password has not been found in data breaches.`);
            }
        }
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

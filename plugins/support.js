const { cmd } = require('../command');
const config = require('../config');

// 1. Join Command
cmd({
    pattern: "join",
    desc: "Get the invite link to join our group.",
    category: "info",
    react: "🔗",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const inviteLink = "YOUR_GROUP_INVITE_LINK";  // Replace with your actual invite link
    reply(`📢 Join our group using the following link: ${inviteLink}`);
});

// 2. Support Command
cmd({
    pattern: "support",
    desc: "Get information about support channels.",
    category: "info",
    react: "🆘",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const supportInfo = `
    🆘 **Need Help?** 🆘
    If you need support or have any questions, you can reach us through the following channels:

    - **Support Group**: [Support Group Link](YOUR_SUPPORT_GROUP_LINK)  // Replace with your support group link
    - **Email**: support@example.com  // Replace with your support email
    `;
    reply(supportInfo);
});

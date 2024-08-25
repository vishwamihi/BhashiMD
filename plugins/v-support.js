const { cmd } = require('../command');
const config = require('../config');

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

    - **Support Group**: [Support Group Link] (https://whatsapp.com/channel/0029VaSaZd5CBtxGawmSph1k)  // Replace with your support group link
    - **Email**: support@bhashi.md.com  // Replace with your support email
    `;
    reply(supportInfo);
});

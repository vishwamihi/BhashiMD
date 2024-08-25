const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "team",
    desc: "View the bot development team.",
    category: "info",
    react: "👥",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    // Define the team members and their roles
    const teamMembers = [
        { name: "John Doe", role: "Lead Developer", contact: "johndoe@example.com", social: "https://twitter.com/johndoe" },
        { name: "Jane Smith", role: "UI/UX Designer", contact: "janesmith@example.com", social: "https://linkedin.com/in/janesmith" },
        { name: "Alice Johnson", role: "Backend Developer", contact: "alicejohnson@example.com", social: "https://github.com/alicejohnson" },
        { name: "Bob Brown", role: "Project Manager", contact: "bobbrown@example.com", social: "https://facebook.com/bobbrown" }
    ];

    // Create the message with team details
    let teamInfo = `👥 **Meet the Team**\n\n`;

    teamMembers.forEach(member => {
        teamInfo += `👤 **${member.name}**\n🔧 **Role:** ${member.role}\n📧 **Contact:** ${member.contact}\n🌐 **Social:** [${member.social}](${member.social})\n\n`;
    });

    // Add the channel link
    teamInfo += `📢 **Join our channel:** [Our WhatsApp Channel](https://whatsapp.com/channel/0029VaSaZd5CBtxGawmSph1k)\n`;

    // Send the team image followed by the team info
    conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: teamInfo });
});

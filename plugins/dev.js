const { cmd } = require('../command');

cmd({
    pattern: "developer",
    desc: "Sends the developer's contact information.",
    category: "info",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        // Define the vCard contact with the updated description
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;JTxꜱ⁩;;\nFN:JTxꜱ\nORG:JTxꜱ\nTITLE:\nitem1.TEL;waid=5491126788746:5491126788746\nitem1.X-ABLabel:JTxꜱ\nX-WA-BIZ-DESCRIPTION:BHASHI MD BY VISHWA MIHIRANGA\nX-WA-BIZ-NAME:JTxꜱ\nEND:VCARD`;

        // Send the contact message
        await conn.sendMessage(from, { contacts: { displayName: 'JTxꜱ', contacts: [{ vcard }] }}, { quoted: mek });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

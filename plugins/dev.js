const { cmd } = require('../command');

cmd({
    pattern: "developer",
    desc: "Sends the developer's contact information.",
    category: "info",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        // Define the vCard contact with the updated details
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;VISHWA;;;\nFN:VISHWA\nORG:VISHWA OFC\nTITLE:\nitem1.TEL;waid=94702481115:94702481115\nitem1.X-ABLabel:VISHWA OFC\nX-WA-BIZ-DESCRIPTION:BHASHI-MD BY VISHWA\nX-WA-BIZ-NAME:VISHWA OFC\nEND:VCARD`;

        // Send the contact message
        await conn.sendMessage(from, { contacts: { displayName: 'VISHWA OFC', contacts: [{ vcard }] }}, { quoted: mek });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

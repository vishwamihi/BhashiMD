const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "jid",
    desc: "Get the JID of the chat.",
    category: "main",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Retrieve the JID of the chat
        const chatJid = from;

        // Send the JID response
        await conn.sendMessage(from, { 
            text: `📍 Chat JID: ${chatJid}`,
            footer: '> BHASHI-MD'
        });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

//=====================



cmd({
    pattern: "wa",
    desc: "Generate a WhatsApp link with a custom message.",
    category: "main",
    react: "🔗",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
        // Default message if none provided
        const defaultMessage = 'Hello!';

        // Ensure that 'text' is defined and not null, or use default message
        const message = (text && text.trim()) ? text.trim() : defaultMessage;

        // Extract the sender's phone number (assuming it's in E.164 format, i.e., with country code)
        const senderJid = m.sender;
        const phoneNumber = senderJid.split('@')[0]; // Extract the phone number part from the JID

        // Construct the wa.me link with the message
        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Send the response with the wa.me link
        await conn.sendMessage(from, { 
            text: `🔗 WhatsApp Link: ${waLink}`,
            footer: '> BHASHI-MD'
        });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});


cmd({
  pattern: "userinfo",
  desc: "Get detailed information about the user.",
  category: "main",
  react: "🧑‍💻",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
      // Retrieve the sender's JID
      const senderJid = m.sender;
      const phoneNumber = senderJid.split('@')[0]; // Extract the phone number part from the JID

      // Retrieve user information
      const userName = m.pushName || 'Not Available'; // Display name or default to 'Not Available'

      // Check if the user is an admin (only applicable in group chats)
      let isAdmin = 'N/A';
      if (from.endsWith('@g.us')) { // If in a group
          const groupMetadata = await conn.groupMetadata(from).catch(() => null);
          if (groupMetadata) {
              const participant = groupMetadata.participants.find(participant => participant.jid === senderJid);
              isAdmin = participant && participant.isAdmin ? 'Yes' : 'No';
          }
      }

      // Construct the user information message
      let userInfo = `👤 User Information:\n`;
      userInfo += `📞 Phone Number: ${phoneNumber}\n`;
      userInfo += `👤 Display Name: ${userName}\n`;
      userInfo += `👑 Admin: ${isAdmin}\n`;

      // Send the user information response
      await conn.sendMessage(from, { 
          text: userInfo,
          footer: '> BHASHI-MD'
      });

  } catch (e) {
      console.error(e);
      reply(`Error: ${e.message}`);
  }
});




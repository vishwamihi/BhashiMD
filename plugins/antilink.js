
cmd({
    pattern: "anitlink",
    desc: "Toggle anti-link protection.",
    react: "🔗",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        if (!isBotAdmins && !isAdmins) {
            return reply("Only admins can toggle anti-link protection.");
        }

        const option = args[0];
        if (option === 'on') {
            antiConfig.ANTI_LINK = true;
            return reply("🚩 Anti-link protection is now enabled.");
        } else if (option === 'off') {
            antiConfig.ANTI_LINK = false;
            return reply("🚩 Anti-link protection is now disabled.");
        } else {
            return reply("🚩 Invalid option. Use `.anitlink on` or `.anitlink off`.");
        }
    } catch (e) {
        console.log(e);
        reply("An error occurred while processing your request.");
    }
});

// Listen to messages to check for `chat.whatsapp.com` links and delete them if anti-link protection is enabled
conn.on('chat-update', async (chatUpdate) => {
    if (!chatUpdate.messages || !chatUpdate.messages.all()) return;
    const m = chatUpdate.messages.all()[0];
    
    // Ignore if the message is from the bot itself
    if (m.key.fromMe) return;

    const isGroup = m.key.remoteJid.endsWith('@g.us');
    if (!isGroup || !antiConfig.ANTI_LINK) return;

    const messageText = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    if (messageText.includes('chat.whatsapp.com')) {
        try {
            await conn.sendMessage(m.key.remoteJid, { text: '🚫 Links are not allowed in this group!' }, { quoted: m });
            await conn.deleteMessage(m.key.remoteJid, m.key.id);
        } catch (e) {
            console.log(e);
        }
    }
});

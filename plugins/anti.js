const config = require('../config');
const { cmd } = require('../command');

const antiConfig = {
    ANTI_LINK: false,
    ANTI_BAD_WORDS_ENABLED: true,
    ANTI_CAPSLOCK: false,
    ANTI_STICKER_SPAM: false,
    ANTI_PHONE_SHARING: false,
    ANTI_SPAM: false,
    STICKER_SPAM_THRESHOLD: 5,
    STICKER_SPAM_INTERVAL: 10000,
    CAPSLOCK_THRESHOLD: 70,
    SPAM_THRESHOLD: 3,
    SPAM_INTERVAL: 5000
};

// Command handler
async function handleCommand(from, body, mek, isGroup, isBotAdmins, conn) {
    if (body.startsWith('.anitlink')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_LINK = true;
            await conn.sendMessage(from, { text: '🚩 Anti-link protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_LINK = false;
            await conn.sendMessage(from, { text: '🚩 Anti-link protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anitlink on` or `.anitlink off`.' }, { quoted: mek });
        }
    }

    if (body.startsWith('.anitbadwords')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_BAD_WORDS_ENABLED = true;
            await conn.sendMessage(from, { text: '🚩 Anti-bad words protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_BAD_WORDS_ENABLED = false;
            await conn.sendMessage(from, { text: '🚩 Anti-bad words protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anitbadwords on` or `.anitbadwords off`.' }, { quoted: mek });
        }
    }

    if (body.startsWith('.anticapslock')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_CAPSLOCK = true;
            await conn.sendMessage(from, { text: '🚩 Anti-capslock protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_CAPSLOCK = false;
            await conn.sendMessage(from, { text: '🚩 Anti-capslock protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anticapslock on` or `.anticapslock off`.' }, { quoted: mek });
        }
    }

    if (body.startsWith('.anitstickerspam')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_STICKER_SPAM = true;
            await conn.sendMessage(from, { text: '🚩 Anti-sticker spam protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_STICKER_SPAM = false;
            await conn.sendMessage(from, { text: '🚩 Anti-sticker spam protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anitstickerspam on` or `.anitstickerspam off`.' }, { quoted: mek });
        }
    }

    if (body.startsWith('.anitphonesharing')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_PHONE_SHARING = true;
            await conn.sendMessage(from, { text: '🚩 Anti-phone sharing protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_PHONE_SHARING = false;
            await conn.sendMessage(from, { text: '🚩 Anti-phone sharing protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anitphonesharing on` or `.anitphonesharing off`.' }, { quoted: mek });
        }
    }

    if (body.startsWith('.anitspam')) {
        const command = body.split(' ')[1];
        if (command === 'on') {
            antiConfig.ANTI_SPAM = true;
            await conn.sendMessage(from, { text: '🚩 Anti-spam protection is now enabled.' }, { quoted: mek });
        } else if (command === 'off') {
            antiConfig.ANTI_SPAM = false;
            await conn.sendMessage(from, { text: '🚩 Anti-spam protection is now disabled.' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '🚩 Invalid command. Use `.anitspam on` or `.anitspam off`.' }, { quoted: mek });
        }
    }
}

// Anti-abuse checks
async function antiAbuseChecks(from, body, mek, isGroup, isBotAdmins, conn) {
    //=========================ANTI BAD WORD=========================
    if (isGroup && antiConfig.ANTI_BAD_WORDS_ENABLED) {
        const badWords = ["huththo", "pakayo", "fuck", "fuckyou", "pinnaya", "Ponnaya", "Wesigeputha", "Kariya"];
        const bodyLower = body.toLowerCase();
        for (const word of badWords) {
            if (bodyLower.includes(word.toLowerCase())) {
                await conn.sendMessage(from, { text: "🚩 Don't use any bad words!" }, { quoted: mek });
                await conn.sendMessage(from, { delete: mek.key });
                return;
            }
        }
    }

    //=========================ANTI-LINK=========================
    if (isGroup && antiConfig.ANTI_LINK) {
        const chatLinkPattern = /chat\.whatsapp\.com\/(g|gb)\/[A-Z0-9]{5,}/i;
        if (chatLinkPattern.test(body)) {
            if (isBotAdmins) {
                await conn.sendMessage(from, { text: '🚩 Links are not allowed in this group!' }, { quoted: mek });
                await conn.sendMessage(from, { delete: { remoteJid: m.chat, fromMe: false, id: mek.key.id, participant: from } });
            } else {
                await conn.sendMessage(from, { text: '🚩 I am not an admin, so I cannot delete messages with links.' }, { quoted: mek });
            }
            return;
        }
    }

    //=========================ANTI-PHONE NUMBER SHARING=========================
    if (isGroup && antiConfig.ANTI_PHONE_SHARING) {
        const phoneNumberPattern = /(?:\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
        if (phoneNumberPattern.test(body)) {
            if (isBotAdmins) {
                await conn.sendMessage(from, { text: '🚩 Phone number sharing is not allowed in this group!' }, { quoted: mek });
                await conn.sendMessage(from, { delete: { remoteJid: m.chat, fromMe: false, id: mek.key.id, participant: from } });
            } else {
                await conn.sendMessage(from, { text: '🚩 I am not an admin, so I cannot delete messages containing phone numbers.' }, { quoted: mek });
            }
            return;
        }
    }

    //=========================ANTI-STICKER SPAM=========================
    if (isGroup && antiConfig.ANTI_STICKER_SPAM) {
        const stickerSpamThreshold = antiConfig.STICKER_SPAM_THRESHOLD;
        const stickerSpamInterval = antiConfig.STICKER_SPAM_INTERVAL;

        if (!global.stickerSpamData) global.stickerSpamData = {};
        const userStickerSpamData = global.stickerSpamData[from] || [];
        const now = Date.now();

        if (mek.message?.stickerMessage) {
            global.stickerSpamData[from] = userStickerSpamData.filter(timestamp => now - timestamp <= stickerSpamInterval);
            global.stickerSpamData[from].push(now);

            if (global.stickerSpamData[from].length > stickerSpamThreshold) {
                await conn.sendMessage(from, { text: '🚩 Stop spamming stickers in the group!' }, { quoted: mek });
                global.stickerSpamData[from] = [];
                return;
            }
        }
    }

    //=========================ANTI-CAPSLOCK=========================
    if (isGroup && antiConfig.ANTI_CAPSLOCK) {
        const capslockThreshold = antiConfig.CAPSLOCK_THRESHOLD;
        const bodyUpperCase = body.toUpperCase();

        if (body === bodyUpperCase && body.length > capslockThreshold) {
            await conn.sendMessage(from, { text: '🚩 Please avoid using caps lock excessively!' }, { quoted: mek });
            return;
        }
    }

    //=========================ANTI-SPAM=========================
    if (isGroup && antiConfig.ANTI_SPAM) {
        const spamThreshold = antiConfig.SPAM_THRESHOLD;
        const spamInterval = antiConfig.SPAM_INTERVAL;

        if (!global.spamData) global.spamData = {};
        const userSpamData = global.spamData[from] || [];
        const now = Date.now();

        global.spamData[from] = userSpamData.filter(timestamp => now - timestamp <= spamInterval);
        global.spamData[from].push(now);

        if (global.spamData[from].length > spamThreshold) {
            await conn.sendMessage(from, { text: '🚩 Stop spamming messages in the group!' }, { quoted: mek });
            global.spamData[from] = [];
            return;
        }
    }
}

module.exports = { handleCommand, antiAbuseChecks };

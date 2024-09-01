const config = require('../config');
const { cmd } = require('../command');
const { downloadMediaMessage } = require('@adiwajshing/baileys');
const fs = require('fs');

// Helper function to check if the sender is the owner
const isOwner = (sender) => config.owner.includes(sender);

// Helper function to toggle features
const toggleFeature = (feature, state) => {
    config[feature] = state;
    return `✅ ${feature.charAt(0).toUpperCase() + feature.slice(1)} has been turned ${state ? 'on' : 'off'}.`;
};

// 1. Broadcast message to all chats
cmd({
    pattern: "broadcast",
    desc: "📢 Broadcast a message to all chats",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, isGroup, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    const message = args.join(" ");
    if (!message) return m.reply("❗ Please provide a message to broadcast.");
    
    const chats = await conn.getAllChats();
    let successCount = 0;
    
    for (let chat of chats) {
        try {
            await conn.sendMessage(chat.id, { text: `📢 *BROADCAST MESSAGE*\n\n${message}` });
            successCount++;
        } catch (error) {
            console.error(`Failed to send broadcast to ${chat.id}:`, error);
        }
    }
    
    m.reply(`✅ Broadcast sent to ${successCount} chats successfully!`);
});

// 2. Ban a user
cmd({
    pattern: "ban",
    desc: "🚫 Ban a user from using the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide a user's number to ban.");
    
    const userToBan = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned.push(userToBan);
    
    m.reply(`🚫 User ${args[0]} has been banned from using the bot.`);
});

// 3. Unban a user
cmd({
    pattern: "unban",
    desc: "✅ Unban a user",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide a user's number to unban.");
    
    const userToUnban = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned = config.banned.filter(user => user !== userToUnban);
    
    m.reply(`✅ User ${args[0]} has been unbanned.`);
});

// 4. Change bot's name
cmd({
    pattern: "setbotname",
    desc: "✏️ Change the bot's name",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    const newName = args.join(" ");
    if (!newName) return m.reply("❗ Please provide a new name for the bot.");
    
    await conn.updateProfileName(newName);
    m.reply(`✅ Bot's name has been changed to: *${newName}*`);
});

// 5. Change bot's bio
cmd({
    pattern: "setbotbio",
    desc: "✏️ Change the bot's bio",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    const newBio = args.join(" ");
    if (!newBio) return m.reply("❗ Please provide a new bio for the bot.");
    
    await conn.updateProfileStatus(newBio);
    m.reply(`✅ Bot's bio has been changed to: *${newBio}*`);
});

// 6. Add or change bot's owner
cmd({
    pattern: "setowner",
    desc: "👑 Add or change bot owner",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide the new owner's number.");
    
    const newOwner = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.owner = [newOwner];
    
    m.reply(`👑 New bot owner set: ${args[0]}`);
});

// 7. Set bot's prefix
cmd({
    pattern: "setprefix",
    desc: "🔧 Set bot's command prefix",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide a new prefix for the bot.");
    
    config.prefix = args[0];
    m.reply(`✅ Bot's prefix has been set to: *${args[0]}*`);
});

// 8. Block a user
cmd({
    pattern: "block",
    desc: "🚫 Block a user",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide a user's number to block.");
    
    const userToBlock = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.updateBlockStatus(userToBlock, "block");
    
    m.reply(`🚫 User ${args[0]} has been blocked.`);
});

// 9. Unblock a user
cmd({
    pattern: "unblock",
    desc: "✅ Unblock a user",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0]) return m.reply("❗ Please provide a user's number to unblock.");
    
    const userToUnblock = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.updateBlockStatus(userToUnblock, "unblock");
    
    m.reply(`✅ User ${args[0]} has been unblocked.`);
});

// 10. Toggle antilink
cmd({
    pattern: "antilink",
    desc: "🔗 Toggle antilink feature",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
        return m.reply("❗ Please specify 'on' or 'off' to toggle the antilink feature.");
    }
    
    const state = args[0].toLowerCase() === 'on';
    m.reply(toggleFeature('antilink', state));
});

// 11. Toggle antibad
cmd({
    pattern: "antibad",
    desc: "🚯 Toggle antibad feature",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
        return m.reply("❗ Please specify 'on' or 'off' to toggle the antibad feature.");
    }
    
    const state = args[0].toLowerCase() === 'on';
    m.reply(toggleFeature('antibad', state));
});
// 14. Toggle group only mode
cmd({
    pattern: "grouponly",
    desc: "👥 Toggle group only mode",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
        return m.reply("❗ Please specify 'on' or 'off' to toggle group only mode.");
    }
    
    const state = args[0].toLowerCase() === 'on';
    m.reply(toggleFeature('groupOnly', state));
});

// 15. Set bot's profile picture
cmd({
    pattern: "setpp",
    desc: "🖼️ Set bot's profile picture",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { sender }) => {
    if (!isOwner(sender)) return m.reply("👑 *This command is only for the bot owner!*");
    if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.startsWith('image/')) {
        return m.reply("❗ Please reply to an image with this command to set it as the bot's profile picture.");
    }
    
    try {
        const media = await downloadMediaMessage(m.quoted, 'buffer');
        const tmpFilePath = './temp_profile_pic.jpg';
        fs.writeFileSync(tmpFilePath, media);
        
        await conn.updateProfilePicture(conn.user.id, { url: tmpFilePath });
        fs.unlinkSync(tmpFilePath);
        
        m.reply("✅ Bot's profile picture has been updated successfully!");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        m.reply("❌ An error occurred while updating the profile picture. Please try again later.");
    }
});

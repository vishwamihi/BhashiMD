const config = require('../config');
const { cmd, commands } = require('../command');

// Helper function to check permissions
const checkPermissions = (isGroup, isAdmins, isOwner, isBotAdmins) => {
    if (!isGroup) return 'This command can only be used in groups.';
    if (!isAdmins && !isOwner) return 'This command can only be used by group admins.';
    if (!isBotAdmins) return 'Bot must be admin to use this command.';
    return null;
};
cmd({
    pattern: "add",
    desc: "Add a user to the group.",
    category: "group",
    filename: __filename,
    react: "➕"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, args, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        if (args.length === 0) return reply('Please provide the phone number(s) to add.');

        const users = args.map(arg => arg.replace(/[^0-9]/g, '') + "@s.whatsapp.net");
        await conn.groupParticipantsUpdate(from, users, "add");
        reply(`✅ User(s) added to the group successfully.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Set group icon
cmd({
    pattern: "seticon",
    desc: "Set a new group icon.",
    category: "group",
    filename: __filename,
    react: "🖼️"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        if (!m.quoted) return reply(`Please reply to an image with the command to set it as the group icon.`);
        const media = await conn.downloadAndSaveMediaMessage(m.quoted);
        await conn.updateProfilePicture(from, { url: media });
        reply(`✅ Group icon has been updated successfully.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Tag all group members
cmd({
    pattern: "tagall",
    desc: "Mention all group members.",
    category: "group",
    filename: __filename,
    react: "📢"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, participants, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isAdmins && !isOwner) return reply('This command can only be used by group admins.');

        let teks = `📢 *Attention All Members!*\n\n`;
        for (let mem of participants) {
            teks += `@${mem.id.split('@')[0]}\n`;
        }
        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) });
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Remove all members (except bot and group creator)
cmd({
    pattern: "removeall",
    desc: "Remove all members from the group (except bot and group creator).",
    category: "group",
    filename: __filename,
    react: "🚫"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, groupMetadata, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        if (!isOwner) return reply('This command can only be used by the bot owner.');

        const creator = groupMetadata.owner;
        const botId = conn.user.id;
        const participants = groupMetadata.participants.filter(p => p.id !== creator && p.id !== botId);

        await conn.groupParticipantsUpdate(from, participants.map(p => p.id), "remove");
        reply(`🚫 All members have been removed from the group (except the bot and group creator).`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
// Function to handle group promotion
cmd({
    pattern: "promote",
    desc: "Promote a user to admin.",
    category: "group",
    filename: __filename,
    react: "⬆️"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        const mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentionedJid || mentionedJid.length === 0) return reply('Please mention the user you want to promote.');

        await conn.groupParticipantsUpdate(from, mentionedJid, "promote");
        reply(`✅ User promoted to admin successfully.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// Function to handle group demotion
cmd({
    pattern: "demote",
    desc: "Demote an admin to regular user.",
    category: "group",
    filename: __filename,
    react: "⬇️"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        const mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentionedJid || mentionedJid.length === 0) return reply('Please mention the admin you want to demote.');

        await conn.groupParticipantsUpdate(from, mentionedJid, "demote");
        reply(`✅ User demoted from admin successfully.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// Function to handle group invites
cmd({
    pattern: "invite",
    desc: "Get the group invite link.",
    category: "group",
    filename: __filename,
    react: "🔗"
},
async(conn, mek, m, { from, isGroup, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be admin to use this command.');

        const inviteCode = await conn.groupInviteCode(from);
        reply(`🔗 Group Invite Link: https://chat.whatsapp.com/${inviteCode}`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// Function to get group info
cmd({
    pattern: "groupinfo",
    desc: "Get information about the group.",
    category: "group",
    filename: __filename,
    react: "ℹ️"
},
async(conn, mek, m, { from, isGroup, groupMetadata, groupName, participants, groupAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');

        const groupInfo = `
📋 *Group Information*
👥 *Name:* ${groupName}
📝 *Description:* ${groupMetadata.desc || 'No description'}
🆔 *ID:* ${from}
👑 *Owner:* ${groupMetadata.owner || 'Not available'}
👤 *Members:* ${participants.length}
👮 *Admins:* ${groupAdmins.length}
📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleString()}
        `;
        reply(groupInfo);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Kick user
cmd({
    pattern: "kick",
    desc: "Kick a user from the group.",
    category: "group",
    filename: __filename,
    react: "👢"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        const mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentionedJid || mentionedJid.length === 0) return reply('Please mention the user you want to kick.');

        await conn.groupParticipantsUpdate(from, mentionedJid, "remove");
        reply(`👢 User has been kicked from the group.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Change group subject
cmd({
    pattern: "setsubject",
    desc: "Change the group subject.",
    category: "group",
    filename: __filename,
    react: "✏️"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, args, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        const newSubject = args.join(" ");
        if (!newSubject) return reply('Please provide a new subject for the group.');

        await conn.groupUpdateSubject(from, newSubject);
        reply(`✏️ Group subject has been updated to: ${newSubject}`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Change group description
cmd({
    pattern: "setdesc",
    desc: "Change the group description.",
    category: "group",
    filename: __filename,
    react: "📝"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, args, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        const newDesc = args.join(" ");
        if (!newDesc) return reply('Please provide a new description for the group.');

        await conn.groupUpdateDescription(from, newDesc);
        reply(`✏️ Group description has been updated.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Mute group
cmd({
    pattern: "mute",
    desc: "Mute the group (only admins can send messages).",
    category: "group",
    filename: __filename,
    react: "🔇"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        await conn.groupSettingUpdate(from, 'announcement');
        reply(`🔇 Group has been muted. Only admins can send messages now.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

// New command: Unmute group
cmd({
    pattern: "unmute",
    desc: "Unmute the group (allow all participants to send messages).",
    category: "group",
    filename: __filename,
    react: "🔊"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, reply }) => {
    try {
        const permissionError = checkPermissions(isGroup, isAdmins, isOwner, isBotAdmins);
        if (permissionError) return reply(permissionError);

        await conn.groupSettingUpdate(from, 'not_announcement');
        reply(`🔊 Group has been unmuted. All participants can send messages now.`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

module.exports = {
    // You can export any additional functions or variables if needed
};

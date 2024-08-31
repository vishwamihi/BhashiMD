const config = require('../config')
const { cmd, commands } = require('../command')

// Function to handle group promotion
cmd({
    pattern: "promote",
    desc: "Promote a user to admin.",
    category: "group",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isAdmins && !isOwner) return reply('This command can only be used by group admins.');
        if (!isBotAdmins) return reply('Bot must be admin to use this command.');

        const mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentionedJid || mentionedJid.length === 0) return reply('Please mention the user you want to promote.');

        await conn.groupParticipantsUpdate(from, mentionedJid, "promote")
        reply(`User promoted to admin.`);
    } catch(e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
})

// Function to handle group demotion
cmd({
    pattern: "demote",
    desc: "Demote an admin to regular user.",
    category: "group",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isAdmins && !isOwner) return reply('This command can only be used by group admins.');
        if (!isBotAdmins) return reply('Bot must be admin to use this command.');

        const mentionedJid = m.message.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentionedJid || mentionedJid.length === 0) return reply('Please mention the admin you want to demote.');

        await conn.groupParticipantsUpdate(from, mentionedJid, "demote")
        reply(`User demoted from admin.`);
    } catch(e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
})

// Function to handle group invites
cmd({
    pattern: "invite",
    desc: "Get the group invite link.",
    category: "group",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be admin to use this command.');

        const inviteCode = await conn.groupInviteCode(from)
        reply(`Group Invite Link: https://chat.whatsapp.com/${inviteCode}`);
    } catch(e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
})

// Function to get group info
cmd({
    pattern: "groupinfo",
    desc: "Get information about the group.",
    category: "group",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');

        const groupInfo = `
Group Name: ${groupName}
Group Description: ${groupMetadata.desc}
Group ID: ${from}
Group Owner: ${groupMetadata.owner}
Member Count: ${participants.length}
Admin Count: ${groupAdmins.length}
Creation Date: ${new Date(groupMetadata.creation * 1000).toLocaleString()}
        `;
        reply(groupInfo);
    } catch(e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
})

module.exports = {
    // You can export any additional functions or variables if needed
}

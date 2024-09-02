const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    desc: "Get menu list.",
    category: "main",
    react: "🗒️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the main menu
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMG },
            caption: config.MENU_MSG
        }, { quoted: mek });

        // Determine which specific menu message to reply with
        let menuMessage;
        switch (args[0]) {
            case '1.1':
                menuMessage = config.MAIN_MENU;
                break;
            case '1.2':
                menuMessage = config.DL_MENU;
                break;
            case '1.3':
                menuMessage = config.CONVERT_MENU;
                break;
            case '1.4':
                menuMessage = config.AI_MENU;
                break;
            case '1.5':
                menuMessage = config.SEARCH_MENU;
                break;
            case '1.6':
                menuMessage = config.FUN_MENU;
                break;
            case '1.7':
                menuMessage = config.OWNER_MENU;
                break;
            default:
                menuMessage = "Please select a valid menu option.";
        }

        // Reply with the selected menu message
        if (menuMessage) {
            await conn.reply(from, menuMessage, mek);
        } else {
            reply("No menu message found.");
        }
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

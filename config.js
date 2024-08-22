const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
//--------------------------------//--------------------------------//
SESSION_ID: process.env.SESSION_ID=`UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q`,
//--------------------------------//--------------------------------//
PREFIX: process.env.PREFIX=`.`,
//--------------------------------//--------------------------------//
ALIVE_IMG: process.env.ALIVE_IMG=`https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg`,
ALIVE_MSG: process.env.ALIVE_MSG=`*𝗛𝗘𝗟𝗟𝗢 𝗜𝗠 𝗔𝗟𝗜𝗩𝗘 𝗡𝗢𝗪*

A Bhashi Md Whatsapp Bot Based Thirt Party Application Provide Many Servise With A Teal Time Automated Conversational Experience. Enjoy.

Help : https://wa.me/94786328485`,
//--------------------------------//--------------------------------//
PEXELS_API_KEY: process.env.PEXELS_API_KEY='39WCzaHAX939xiH22NCddGGvzp7cgbu1VVjeYUaZXyHUaWlL1LFcVFxH',
//--------------------------------//--------------------------------//
MENU_IMG: process.env.MENU_IMG=`https://telegra.ph/file/d9649350faf1dd9410580.jpg`,
MENU_MSG: process.env.MENU_MSG=`*𝗕𝗛𝗔𝗦𝗛𝗜 𝗠𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧*

Bhashi MD Verify Powerful Whatsapp Bot. Base Build Using By Baileys API Keys.


📂 𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       mainmenu

📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       dlmenu

⚙️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       convertmenu

🤖 𝗔𝗜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       aimenu

🐼 𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       funmenu

🕵🏻 𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦
       ownermenu


This is My All In One Commands Menu. Here All The Commands Are Arranged in Order. Type You Need Command And Send Me.`,
//--------------------------------//--------------------------------//
};

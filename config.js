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
MENU_MSG: process.env.MENU_MSG=`‎Hello I'm Bhashi MD Your Frendly Bot Assistant. This is My All In One Commands Menu. Here All The Commands Are Arranged in Order. Type You Need Command And Send Me.

Example : You Need "Main Commands" Send Me ".mainmenu" Then You Will Get "Main Commands"


📂 𝗺𝗮𝗶𝗻𝗺𝗲𝗻𝘂
       You Can Get Main Commands.

📥 𝗱𝗹𝗺𝗲𝗻𝘂
       You Can Get Download Commands.

⚙️ 𝗰𝗼𝘃𝗲𝗿𝘁𝗺𝗲𝗻𝘂
       You Can Get Convert Commands.

🤖 𝗮𝗶𝗺𝗲𝗻𝘂
       You Can Get Ai Commands.

🐼 𝗳𝘂𝗻𝗺𝗲𝗻𝘂
       You Can Get Fun Commands.

🔍 𝘀𝗲𝗮𝗿𝗰𝗵𝗺𝗲𝗻𝘂
       You Can Get Search Commands.

🕵🏻 𝗼𝘄𝗻𝗲𝗿𝗺𝗲𝗻𝘂
       You Can Get Owner Commands.


Contact Bhashi : https://wa.me/94786328485`,

//--------------------------------//--------------------------------//
MAIN_MENU: process.env.MAIN_MENU=`‎`

//--------------------------------//--------------------------------//
OMDB_API_KEY: process.env.OMDB_API_KEY="76cb7f39",
//--------------------------------//--------------------------------//
MODE: process.env.MODE="public"
//--------------------------------//--------------------------------//    
};

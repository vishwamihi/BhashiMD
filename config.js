const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID=`UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q`,
MENU_MSG: process.env.MENU_MSG=`TYPE YOUR MENU MSG`,   
PREFIX: process.env.PREFIX=`.`,
ALIVE_IMG: process.env.ALIVE_IMG=`https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg`,
ALIVE_MSG: process.env.ALIVE_MSG=`*𝗛𝗘𝗟𝗟𝗢 𝗜𝗠 𝗔𝗟𝗜𝗩𝗘 𝗡𝗢𝗪*

A Bhashi Md Whatsapp Bot Based Thirt Party Application Provide Many Servise With A Teal Time Automated Conversational Experience. Enjoy.
Help : https://wa.me/94786328485`,
PEXELS_API_KEY: process.env.PEXELS_API_KEY='39WCzaHAX939xiH22NCddGGvzp7cgbu1VVjeYUaZXyHUaWlL1LFcVFxH',

};

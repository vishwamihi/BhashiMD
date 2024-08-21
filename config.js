const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID=`UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q`,

ALIVE_IMG: process.env.ALIVE_IMG=`https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg`,

ALIVE_MSG: process.env.ALIVE_MSG=`HELLO IM ALIVE NOW !

𝗔 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 BOT 𝗕𝗔𝗦𝗘𝗗 𝗧𝗛𝗜𝗥𝗗 𝗣𝗔𝗥𝗧𝗬 𝗔𝗣𝗣𝗟𝗜𝗖𝗔𝗧𝗜𝗢𝗡 𝗧𝗛𝗔𝗧 𝗣𝗥𝗢𝗩𝗜𝗗𝗘 𝗠𝗔𝗡𝗬 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦 𝗪𝗜𝗧𝗛 𝗔 𝗥𝗘𝗔𝗟-𝗧𝗜𝗠𝗘 𝗔𝗨𝗧𝗢𝗠𝗔𝗧𝗘𝗗 𝗖𝗢𝗡𝗩𝗘𝗥𝗦𝗔𝗧𝗜𝗢𝗡𝗔𝗟 𝗘𝗫𝗣𝗘𝗥𝗜𝗘𝗡𝗖𝗘. 𝗘𝗡𝗝𝗢𝗬.

HELP : https://wa.me/94786328485`,

 
};

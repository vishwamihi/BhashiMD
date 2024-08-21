const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID, || "UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q",
ALIVE_MSG: process.env.ALIVE_MSG,
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg",
 
};

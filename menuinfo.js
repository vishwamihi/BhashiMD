const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {


MENU_IMG: process.env.MENU_IMG=``,
    
MENU_MSG: process.env.MENU_MSG=`TYPE YOUR MENU MSG`,


};

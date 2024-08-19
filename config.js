const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q",
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*HELLO IM ALIVE NOW ✅*/n*SEND ".MENU" GET FULL CMD LIST 🔄*/n/nᴘᴏᴡᴇʀᴅ ʙʏ ᴏꜰᴄ ʙʜᴀꜱʜɪᴛʜᴀ",
};


const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const fs = require("fs");
require("dotenv").config();

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "UnMzxK7Z#IU0NOFrFff_yC-vHdEkBHlys5ySNDy9S1ZyTAVd8A_Q",
  PREFIX: process.env.PREFIX || ".",
  PEXELS_API_KEY: process.env.PEXELS_API_KEY || "39WCzaHAX939xiH22NCddGGvzp7cgbu1VVjeYUaZXyHUaWlL1LFcVFxH",
  OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  packname: process.env.packname || "🪄BHASHI",
  author: process.env.author || "BHASHI x VISHWA",
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || "2d61a72574c11c4f36173b627f8cb177",
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || "sk_6438bcc100d96458f8de0602aec662f4ba14b905fd090ad3",












  






 //================ OWNERS ONLY DONT GO =================













  








  
  START_MSG: process.env.START_MSG || `
    
    ★ *ＢＨＡＳＨＩ-ＭＤ* ★
    ╴ *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ 🇱🇰* ╴

    \`A fast and responsive multi-device WhatsApp bot built using Baileys and various APIs. It offers seamless functionality without buttons, delivering quick and efficient performance for automated tasks and commands.\`

> 🚨 *ꜰᴏʟʟᴏᴡ ᴜꜱ* : https://whatsapp.com/channel/0029VaSaZd5CBtxGawmSph1k

> 🪄 *ꜱᴜᴘᴘᴏʀᴛᴇʀ ɢʀᴏᴜᴘ* :

> 👾 *ʀᴇᴘᴏ ʟɪɴᴋ* : https://github.com/BhashiMD/BhashiMD/
    
` ,

  ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || `*𝗛𝗘𝗟𝗟𝗢 𝗜𝗠 𝗔𝗟𝗜𝗩𝗘 𝗡𝗢𝗪*

A Bhashi Md Whatsapp Bot Based Third Party Application Provide Many Services With A Real Time Automated Conversational Experience. Enjoy.

Help : https://wa.me/94786328485`,
  MENU_IMG: process.env.MENU_IMG || "https://telegra.ph/file/d9649350faf1dd9410580.jpg",
  MENU_MSG: process.env.MENU_MSG || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My All In One Commands Menu. Here All The Commands Are Arranged in Order. Type You Need Command And Send Me.

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
  MAIN_MENU: process.env.MAIN_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Main Commands List. Enjoy Now.

📂 𝗮𝗹𝗶𝘃𝗲
       Show if The Bot is Online.

📂 𝘀𝘆𝘀𝘁𝗲𝗺
       Display System Information.

📂 𝗽𝗶𝗻𝗴
       Ping The Bot And Shows Response Time

Contact Bhashi : https://wa.me/94786328485`,
  DL_MENU: process.env.DL_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Download Commands List. Enjoy Now.

📥 𝘀𝗼𝗻𝗴
       You Can Download Songs.

📥 𝘃𝗶𝗱𝗲𝗼
       You Can Download Videos.

Contact Bhashi : https://wa.me/94786328485`,
  CONVERT_MENU: process.env.CONVERT_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Convert Commands List. Enjoy Now.

⚙️ 𝗦𝘁𝗶𝗰𝗸𝗲𝗿
       Convert Img To Sticker.

⚙️ 𝘁𝗿𝘁
       Translate Any Language.

⚙️ 𝗰𝗼𝗻𝘃𝗲𝗿𝘁
       Convert Currency To Currency.

⚙️ 𝗴𝗽𝗮𝘀𝘀
       Generate Strong Password.

Contact Bhashi : https://wa.me/94786328485`,
  AI_MENU: process.env.AI_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Ai Commands List. Enjoy Now.

🤖 𝗮𝗶
       Chat With Chat GPT Ai.

🤖 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗲
       You Can Use Ai Generator.

Contact Bhashi : https://wa.me/94786328485`,
  FUN_MENU: process.env.FUN_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Fun Commands List. Enjoy Now.

🐼 𝗷𝗼𝗸𝗲
       Tell a Random Joke.

🐼 𝗳𝗮𝗰𝘁
       Give a Random Fact.

🐼 𝗵𝗮𝗰𝗸
       Hacking Device Messages.

🐼 𝘄𝗮𝗹𝗹𝗽𝗮𝗽𝗲𝗿
       Get Random 4K Wallpaper.

🐼 𝗮𝗻𝗶𝗺𝗲𝗴𝗶𝗿𝗹
       Get Sexy Anime Girl Image.

🐼 𝗮𝗻𝗶𝗺𝗲𝗯𝗼𝘆
       Get Anime Boy Image.

🐼 𝗱𝗼𝗴
       Get Random Dog Image.

🐼 𝗿𝘃𝗶𝗱𝗲𝗼
       Get Random HD Video.

Contact Bhashi : https://wa.me/94786328485`,
  SEARCH_MENU: process.env.SEARCH_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Search Commands List. Enjoy Now.

🔍 𝗱𝗲𝗳𝗶𝗻𝗲
       Search From Dictionary.

🔍 𝗺𝗼𝘃𝗶𝗲
       Get Movie Information.

🔍 𝗴𝗶𝘁𝗵𝘂𝗯𝘀𝘁𝗮𝗹𝗸
       Get Github Profile Information.

🔍 𝘀𝗿𝗲𝗽𝗼
       Search Repo Details.

🔍 𝘄𝗲𝗮𝘁𝗵𝗲𝗿
       Fetches Weather Information.

Contact Bhashi : https://wa.me/94786328485`,
  OWNER_MENU: process.env.OWNER_MENU || `Hello I'm Bhashi MD Your Friendly Bot Assistant. This is My Owner Commands List. But These Commands Can Only Be Used By Bhashi MD Owner. Enjoy Now.

🕵🏻 𝗿𝗲𝘀𝘁𝗮𝗿𝘁
       Restart The Bhashi MD.

🕵🏻 𝘀𝗲𝘁𝗮𝘂𝘁𝗼𝗯𝗶𝗼
       Set Auto Bio On Bot Status.

🕵🏻 𝗷𝗼𝗶𝗻
       Join Group Invite Link.

Contact Bhashi : https://wa.me/94786328485`,
};

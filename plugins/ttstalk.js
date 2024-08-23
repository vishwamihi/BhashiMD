const { cmd } = require('../command')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

cmd({
    pattern: "tiktokstalk",
    alias: ["ttstalk"],
    desc: "Stalk TikTok user profile",
    category: "stalking",
    filename: __filename,
    use: '<username>'
},
async(conn, mek, m, { from, quoted, body, args, text, reply }) => {
    if (!text) {
        await reply(`Please provide a TikTok username.\nUsage: .tiktokstalk <username>`);
        return;
    }

    try {
        text = text.replace(/@/, "");
        let res = await fetchUser(text);
        if (!res) throw "User not found";

        let img = res.profileImage;
        delete res.profileImage;

        let txt = Object.keys(res)
            .map((v) => `*${capitalize(v)}:* ${res[v] ?? ""}`)
            .join("\n");

        await conn.sendMessage(
            from,
            {
                image: { url: img },
                caption: `🎵 *TikTok User Info*\n\n${txt}\n\n_Powered by BHASHI-MD_`,
            },
            { quoted: mek }
        );
    } catch (error) {
        await reply(`Error: ${error.message}`);
    }
});

async function fetchUser(q) {
    const url = "https://www.tiktokstalk.com/user/" + q;
    const response = await fetch(url);
    if (!response.ok) throw "Failed to fetch user data";
    const html = await response.text();
    const $ = cheerio.load(html);
    const formattedNumber = (numStr) => {
        const num = parseInt(numStr.replace(/[^\d]/g, ""), 10);
        return isNaN(num) ? "NaN" : num.toLocaleString();
    };

    return {
        profileImage: $(".user-info figure img").attr("src"),
        username: $(".user-info .title h1").text().trim(),
        fullName: $(".user-info .title h2").text().trim(),
        bio: $(".user-info .description p").text().trim(),
        likes: formattedNumber($(".number-box .count:eq(0)").text()),
        followers: formattedNumber($(".number-box .count:eq(1)").text()),
        following: formattedNumber($(".number-box .count:eq(2)").text()),
    };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

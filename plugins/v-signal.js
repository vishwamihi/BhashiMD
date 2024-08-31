const axios = require('axios');

cmd({
    pattern: "signal",
    desc: "📈 Get a basic trading signal based on price changes for a specified cryptocurrency.",
    category: "📊 Trading",
    react: "📈",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please specify a cryptocurrency symbol. Example: .signal btc")
        }

        const symbol = args[0].toLowerCase();
        const url = `https://api.coingecko.com/api/v3/coins/${symbol}`;

        const response = await axios.get(url);
        const data = response.data;

        // Extract relevant data
        const currentPrice = data.market_data.current_price.usd;
        const priceChange24h = data.market_data.price_change_percentage_24h;
        const signal = priceChange24h > 0 ? 'Buy' : 'Sell';

        const message = `
📈 *Trading Signal for ${data.name} (${symbol.toUpperCase()})* 📈

🚀 Signal: ${signal}
💰 Current Price: $${currentPrice.toFixed(2)}
📉 24h Change: ${priceChange24h.toFixed(2)}%
🗓️ Time: ${new Date().toLocaleString()}

*Disclaimer: Trading involves risk. Please do your own research before making any trades.*
        `.trim();

        await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});

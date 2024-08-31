const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require('axios')

cmd({
    pattern: "binance",
    desc: "Get current cryptocurrency prices from Binance",
    category: "crypto",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please specify a cryptocurrency symbol. Example: .binance BTC or .binance ETHUSDT")
        }

        const symbol = args[0].toUpperCase()
        let pair = symbol
        if (!symbol.endsWith('USDT')) {
            pair = symbol + 'USDT'
        }

        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`)
        
        if (response.data) {
            const data = response.data
            const priceMessage = `
📊 *Binance Price Info for ${symbol}* 📊

💰 Current Price: $${parseFloat(data.lastPrice).toFixed(2)}
📈 24h Change: ${parseFloat(data.priceChange).toFixed(2)} (${parseFloat(data.priceChangePercent).toFixed(2)}%)
🔼 24h High: $${parseFloat(data.highPrice).toFixed(2)}
🔽 24h Low: $${parseFloat(data.lowPrice).toFixed(2)}
📊 24h Volume: ${parseFloat(data.volume).toFixed(2)} ${symbol}

💹 *Market Activity*
• Open Price: $${parseFloat(data.openPrice).toFixed(2)}
• Close Price: $${parseFloat(data.prevClosePrice).toFixed(2)}
• Weighted Avg: $${parseFloat(data.weightedAvgPrice).toFixed(2)}

🔄 Last updated: ${new Date().toLocaleString()}

Want to check another crypto? Just use .binance [SYMBOL]
            `.trim()
            
            await conn.sendMessage(from, { text: priceMessage }, { quoted: mek })
        } else {
            reply(`❌ Failed to fetch data for ${symbol}. Make sure you've entered a valid symbol.`)
        }
    } catch (e) {
        console.log(e)
        if (e.response && e.response.status === 400) {
            reply(`❌ Invalid symbol. Please check and try again.`)
        } else {
            reply(`🚫 An error occurred: ${e.message}`)
        }
    }
})

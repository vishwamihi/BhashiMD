const config = require('../config')
const { cmd, commands } = require('../command')
const axios = require('axios')

cmd({
  pattern: "news",
  desc: "Get the latest news on a specific topic.",
  react : "📰",
  category: "information",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("🚨 Please provide a topic to search news for. Usage: .news [topic]")
    const apiKey = "0f2c43ab11324578a7b1709651736382" // Replace with your actual NewsAPI key
    const topic = encodeURIComponent(q)
    const apiUrl = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    const response = await axios.get(apiUrl)
    const articles = response.data.articles.slice(0, 5) // Get top 5 articles
    if (articles.length === 0) {
      return reply(`No recent news found for "${q}". Try a different topic.`)
    }
    let resultMessage = `📰 Latest News on "${q}" 📰\n\n`
    articles.forEach((article, index) => {
      resultMessage += `${index + 1}. ${article.title}\n`
      resultMessage += `_${article.description}\n_`
      resultMessage += `_Read more: ${article.url}_\n`
      resultMessage += `_Published: ${new Date(article.publishedAt).toLocaleString()}_\n\n`
    })
    resultMessage += `> Powered by NewsAPI.org\n> BHASHI-MD`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })
  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})
const config = require('../config')
const {cmd} = require('../command')
const https = require('https')

cmd({
    pattern: "gitclone",
    desc: "Download a GitHub repository",
    category: "downloader",
    react: "📥",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        if (!args[0]) {
            return reply(`Please provide a GitHub repository URL.\n\nExample: .gitclone https://github.com/example/example`)
        }

        const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/i
        const match = args[0].match(regex)

        if (!match) {
            return reply('Invalid GitHub repository URL. Please provide a valid URL.')
        }

        const [, user, repo] = match
        const zipUrl = `https://codeload.github.com/${user}/${repo}/zip/refs/heads/main`
        const apiUrl = `https://api.github.com/repos/${user}/${repo}`

        // Fetch repository information
        https.get(apiUrl, {
            headers: { 'User-Agent': 'BHASHI-MD Bot' }
        }, (res) => {
            let data = ''
            res.on('data', (chunk) => data += chunk)
            res.on('end', async () => {
                if (res.statusCode === 404) {
                    return reply('Repository not found. Please check the URL and try again.')
                }

                const repoInfo = JSON.parse(data)

                // Send a message indicating download is starting
                await reply(`📥 Downloading: ${repoInfo.full_name}\n\nPlease wait, this may take a moment...`)

                // Download and send the repository
                await conn.sendMessage(from, {
                    document: { url: zipUrl },
                    mimetype: 'application/zip',
                    fileName: `${repoInfo.name}.zip`,
                    caption: `📦 Repository: ${repoInfo.full_name}\n🌟 Stars: ${repoInfo.stargazers_count}\n📚 Description: ${repoInfo.description || 'No description provided.'}`,
                })
            })
        }).on('error', (error) => {
            console.error(error)
            reply('An error occurred while fetching repository information. Please try again later.')
        })

    } catch (error) {
        console.error(error)
        reply('An error occurred while processing your request. Please try again later.')
    }
})

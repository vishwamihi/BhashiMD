const { cmd } = require('../command');
const fetch = require('node-fetch');
const axios = require('axios');

// GPT-4 Command
cmd({
  pattern: "gpt4",
  category: "ai",
  desc: "Chat with GPT-4 AI model",
  use: "<text>",
  filename: __filename,
}, async (conn, mek, m, { q, reply, cmdName }) => {
  if (!q) return reply(`*_Please provide a query_*\n*_Example ${cmdName} What is the meaning of life?_*`);

  try {
    const apiUrl = `https://ultimetron.guruapi.tech/gpt4?prompt=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.result.success) return reply("*There's a problem, try again later!*");

    const { reply: gptReply } = data.result;
    reply(`*ASTA GPT-4*\n\`\`\`${gptReply}\`\`\``);
  } catch (error) {
    return reply(`Error: ${error}\n\nCommand: ${cmdName}`);
  }
});

// Gemini Command
cmd({
  pattern: "gemini",
  category: "ai",
  desc: "Chat with Bard AI model",
  use: "<text>",
  filename: __filename,
}, async (conn, mek, m, { q, reply, cmdName }) => {
  if (!q) return reply(`*_Please provide a query_*\n*_Example ${cmdName} What is the meaning of life?_*`);

  try {
    const res = await (await fetch(`https://api.maher-zubair.tech/ai/gemini?q=${encodeURIComponent(q)}`)).json();

    if (!res.status === 200) return reply("*There's a problem, try again later!*");

    const { result } = res;
    reply(`*ASTA GEMINI AI*\n\`\`\`${result}\`\`\``);
  } catch (error) {
    return reply(`Error: ${error}\n\nCommand: ${cmdName}`);
  }
});

// Alexa2 Command (Simsimi)
cmd({
  pattern: "alexa2",
  category: "ai",
  desc: "Chat with Simsimi Alexa AI",
  use: "<text>",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Hi, do you want to talk?");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `text=${encodeURIComponent(q)}&lc=en&key=`
    };
    
    const response = await fetch("https://api.simsimi.vn/v2/simtalk", requestOptions);
    const data = await response.json();

    if (data.status === "200" && data.message) {
      reply(data.message);
    } else {
      reply("*No response!*");
    }
  } catch (error) {
    reply(`Error: ${error}`);
  }
});

// Chat Command (AI Response)
cmd({
  pattern: "chat",
  category: "ai",
  desc: "Chat with an AI",
  use: "<text>",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    const aiReply = await aiResponse(q);
    reply(`*ASTA CHATBOT*\n\`\`\`${aiReply}\`\`\``);
  } catch (error) {
    reply(`Error: ${error}`);
  }
});

// Dall-E Command
cmd({
  pattern: "dalle",
  category: "ai",
  desc: "Generate an image using DALL-E",
  use: "<text>",
  filename: __filename,
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("*Please provide a prompt to generate an image!*");

    const apiUrl = `https://api.maher-zubair.tech/ai/dalle?q=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 200 && data.img) {
      await conn.sendMessage(m.chat, { image: { url: data.img }, caption: `[PROMPT]: ${q}` });
    } else {
      reply(`Error: ${data.err || "Error generating image"}`);
    }
  } catch (error) {
    reply(`Error: ${error}`);
  }
});

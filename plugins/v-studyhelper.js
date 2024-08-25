const { cmd } = require('../command');

// In-memory storage for tracking the last sent tip per user
const userTipIndex = new Map();

cmd({
    pattern: "studyhelper",
    desc: "Provide study tips and resources.",
    category: "info",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const tips = [
        "📖 Break your study time into manageable chunks with breaks in between.",
        "📝 Use active recall and spaced repetition to improve retention.",
        "🌟 Practice past exam papers and sample questions.",
        "🎯 Set specific goals for each study session.",
        "💡 Teach what you've learned to someone else to solidify your understanding.",
        "📚 Organize your study space to reduce distractions.",
        "📅 Create a study schedule and stick to it.",
        "🎧 Listen to instrumental music or white noise to improve focus.",
        "🔍 Summarize your notes to highlight key points.",
        "🧠 Use mnemonic devices to remember complex information.",
        "✍️ Practice writing essays and problem-solving regularly.",
        "🧩 Mix different subjects during study sessions to keep things interesting.",
        "📊 Use flashcards for quick review and memorization.",
        "🌐 Use online resources and educational videos to supplement your learning.",
        "💪 Stay physically active and exercise to boost cognitive function.",
        "🚶‍♂️ Take regular breaks to rest and recharge your mind.",
        "💤 Ensure you get enough sleep for optimal cognitive performance.",
        "🥗 Eat a balanced diet to support brain health and concentration.",
        "📈 Track your progress to stay motivated and identify areas for improvement.",
        "👥 Study with friends or in study groups to gain different perspectives.",
        "🔖 Use color-coded notes or diagrams to visually organize information.",
        "📖 Read textbooks and additional materials for a deeper understanding.",
        "🕒 Practice time management during exams and assignments.",
        "📚 Set aside dedicated time for review and revision before exams.",
        "✏️ Practice mindfulness and stress-relief techniques to manage exam anxiety.",
        "🔑 Focus on understanding concepts rather than rote memorization.",
        "🎯 Set realistic and achievable study goals to maintain motivation.",
        "💡 Use apps and tools for time management and productivity.",
        "🎓 Seek help from teachers or tutors if you're struggling with specific topics.",
        "📚 Read summaries and highlights to reinforce learning.",
        "🎯 Stay organized with a planner or to-do list for tasks and deadlines.",
        "🧠 Challenge yourself with practice questions and mock tests regularly.",
        "🔄 Review and revisit material periodically to reinforce learning."
    ];

    // Retrieve the last sent tip index for the user
    let index = userTipIndex.get(from) || 0;

    // Send the next tip
    if (index < tips.length) {
        reply(`📚 Study Tip ${index + 1}:\n${tips[index]}\n\n> BHASHI-MD`);
        // Update the index for the next time the user requests a tip
        userTipIndex.set(from, index + 1);
    } else {
        reply("📚 You’ve received all study tips. Use `!studyhelper` again to start over.");
        // Reset the index if you want to allow users to start over
        userTipIndex.delete(from);
    }
});

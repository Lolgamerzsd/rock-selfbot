const afkUsers = new Map();

module.exports = {
    name: 'afk',
    description: 'Set your status to AFK',
    execute(message, args) {
        const reason = args.join(' ') || 'I am currently AFK';
        afkUsers.set(message.author.id, reason);
        message.channel.send(`${message.author.username} is now AFK: ${reason}`);
    },
};

// Listen for messages to check if AFK user is mentioned
module.exports.checkAFK = (message) => {
    if (message.mentions.users.size > 0) {
        message.mentions.users.forEach(user => {
            if (afkUsers.has(user.id)) {
                message.channel.send(`${user.username} is AFK: ${afkUsers.get(user.id)}`);
            }
        });
    }

    // Remove AFK status if the AFK user sends a message
    if (afkUsers.has(message.author.id)) {
        afkUsers.delete(message.author.id);
        message.channel.send(`${message.author.username} is no longer AFK.`);
    }
};

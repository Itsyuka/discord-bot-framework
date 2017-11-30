module.exports = {
    name: 'Ping Command',
    description: 'Pings the chat',
    category: 'utils',
    command: 'ping',
    permissions: null,
    run: async ({channel}) => {
        let sentMessage = await channel.createMessage('Pong!');
        let end = Date.now();
        await sentMessage.edit(`Pong! \`${end - sentMessage.timestamp}ms\``);
    }
};
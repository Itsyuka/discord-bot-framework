const {ADMINISTRATOR} = require('../../util/permissions');

module.exports = {
    name: 'Status Command',
    description: 'Sets the status of the bot',
    category: 'administrator',
    command: 'setStatus',
    permissions: ADMINISTRATOR,
    async run({message, channel}) {
        let status = message.params._[0];
        if(!status) await channel.createMessage({
            embed: {
                color: parseInt('0x570095'),
                description: `You need to supply a status`
            }
        });
        if(!['online', 'dnd', 'idle', 'invisible'].includes(status)) await channel.createMessage({
            embed: {
                color: parseInt('0x570095'),
                description: `Status must be either "online", "idle", "dnd", or "invisible"`
            }
        });
        let statusMessage = message.commandless.substr(status.length);
        await this.bot.editStatus(status, {
            name: statusMessage
        });
        await channel.createMessage({
            embed: {
                color: parseInt('0x570095'),
                description: `Status was changed successfully`
            }
        })
    }
};
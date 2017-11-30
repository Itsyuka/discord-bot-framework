const {ADMINISTRATOR} = require('../../util/permissions');

module.exports = {
    name: 'Prefix Command',
    description: 'Changes the chat prefix',
    category: 'administrator',
    command: 'prefix',
    permissions: ADMINISTRATOR,
    async run({message, channel}) {
        let prefix = message.params._[0];
        if(prefix) {
            this.config.prefix = prefix[1];
            await this.config.saveConfig();
            await channel.createMessage({
                embed: {
                    color: parseInt('0x570095'),
                    description: `Your prefix is now \`${prefix[1]}\``
                }
            });
        } else {
            await channel.createMessage({
                embed: {
                    color: parseInt('0x570095'),
                    description: 'You need to define a prefix'
                }
            });
        }
    }
};
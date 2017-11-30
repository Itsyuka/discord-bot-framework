const {sprintf} = require('sprintf-js');
const {MANAGE_GUILD} = require('../util/permissions');

module.exports = {
    id: 'leave',
    name: 'Leave Module',
    description: 'Notifies when users leave a guild',
    defaultConfig: { // Default config for module
        enabled: false,
        channel: '',
        message: ''
    },
    async initialize() {
        this.bot.on('guildMemberRemove', async (guild, member) => {
            if(this.config.enabled && this.config.channel && this.config.message) {
                let channel = guild.channels.find(c => c.id === this.config.channel);
                if(channel) {
                    await channel.createMessage({
                        embed: {
                            color: parseInt('0x570095'),
                            description: sprintf(this.config.message.replace('{name}', '%1$s'), member.user.username)
                        }
                    });
                }
            }
        });
    },
    run: null,
    commands: [
        {
            name: 'Edit Message',
            description: `Edits the leave message`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({message, channel}) {
                this.config.message = message.commandless;
                await this.this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The leave message was changed to \`${message.commandless}\``
                    }
                });
            }
        },
        {
            name: 'Edit Channel',
            description: `Edits where the leave notification gets placed`,
            category: 'administrator',
            command: 'editChannel',
            permissions: MANAGE_GUILD,
            async run({message, channel}) {
                if(message.cleanParams._[0] !== null) {
                    let channelParam = message.cleanParams._[0];
                    if(/^\d+$/.test(channelParam)) {
                        let foundChannel = channel.guild.channels.find(c => c.id === channelParam);
                        if(foundChannel) {
                            this.config.channel = foundChannel.id;
                            await this.config.saveConfig();
                            await channel.createMessage({
                                embed: {
                                    color: parseInt('0x570095'),
                                    description: `The leave channel was set to #${foundChannel.name}`
                                }
                            });
                        } else {
                            await channel.createMessage({
                                embed: {
                                    color: parseInt('0x570095'),
                                    description: `Could not find the channel: #${channelParam}`
                                }
                            });
                        }
                    } else {
                        channelParam = channelParam.charAt(0) === '#' ? channelParam.substr(1) : channelParam;
                        let foundChannel = channel.guild.channels.find(c => c.name === channelParam);
                        if(foundChannel) {
                            this.config.channel = foundChannel.id;
                            await this.config.saveConfig();
                            await channel.createMessage({
                                embed: {
                                    color: parseInt('0x570095'),
                                    description: `The leave channel was set to #${foundChannel.name}`
                                }
                            });
                        } else {
                            await channel.createMessage({
                                embed: {
                                    color: parseInt('0x570095'),
                                    description: `Could not find the channel: #${channelParam}`
                                }
                            });
                        }
                    }
                } else {
                    this.config.channel = channel.id;
                    await this.config.saveConfig();
                    await channel.createMessage({
                        embed: {
                            color: parseInt('0x570095'),
                            description: `The leave channel was set to #${channel.name}`
                        }
                    });
                }
            }
        },
        {
            name: 'Enable',
            description: `Enables the leave message system`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({channel}) {
                this.config.enabled = true;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The leave system was enabled!`
                    }
                });
            }
        },
        {
            name: 'Disable',
            description: `Enables the leave message system`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({channel}) {
                this.config.enabled = false;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The leave system was enabled!`
                    }
                });
            }
        },
    ]
};
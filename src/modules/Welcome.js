const {sprintf} = require('sprintf-js');
const {MANAGE_GUILD} = require('../util/permissions');

module.exports = {
    id: 'welcome',
    name: 'Welcome Module',
    description: 'Welcomes new users in a guild',
    defaultConfig: { // Default config for module
        enabled: false,
        channel: '',
        message: ''
    },
    async initialize() {
        this.bot.on('guildMemberAdd', async (guild, member) => {
            if(this.config.enabled && this.config.channel && this.config.message) {
                let channel = guild.channels.find(c => c.id === this.config.channel);
                if(channel) {
                    await channel.createMessage({
                        embed: {
                            color: parseInt('0x570095'),
                            description: sprintf(this.config.message.replace('{name}', '%1$s'), member.username)
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
            description: `Edits the welcome message`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({message, channel}) {
                this.config.message = message.commandless;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The welcome message was changed to \`${message.commandless}\``
                    }
                });
            }
        },
        {
            name: 'Edit Channel',
            description: `Edits where the welcome notification gets placed`,
            category: 'administrator',
            command: 'editChannel',
            permissions: MANAGE_GUILD,
            async run({message, channel}) {
                console.log(message.cleanParams);
                if(message.cleanParams._[0]) {
                    let channelParam = message.cleanParams._[0];
                    if(/^\d+$/.test(channelParam)) {
                        let foundChannel = channel.guild.channels.find(c => c.id === channelParam);
                        if(foundChannel) {
                            this.config.channel = foundChannel.id;
                            await this.config.saveConfig();
                            await channel.createMessage({
                                embed: {
                                    color: parseInt('0x570095'),
                                    description: `The welcome channel was set to #${foundChannel.name}`
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
                                    description: `The welcome channel was set to #${foundChannel.name}`
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
                            description: `The welcome channel was set to #${channel.name}`
                        }
                    });
                }
            }
        },
        {
            name: 'Enable',
            description: `Enables the welcome message system`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({channel}) {
                this.config.enabled = true;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The welcome system was enabled!`
                    }
                });
            }
        },
        {
            name: 'Disable',
            description: `Enables the welcome message system`,
            category: 'administrator',
            command: 'editMessage',
            permissions: MANAGE_GUILD,
            async run({channel}) {
                this.config.enabled = false;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        color: parseInt('0x570095'),
                        description: `The welcome system was enabled!`
                    }
                });
            }
        },
    ]
};
const {ADMINISTRATOR} = require('../util/permissions');

module.exports = {
    id: 'logger',
    name: 'Logging Module',
    description: 'Logs all actions from users',
    defaultConfig: { // Default config for module
        enabled: false,
        channel: ''
    },
    async initialize() {
        this.bot.on('guildMemberAdd', async (guild, member) => {
            if(member.user.id === this.bot.user.id) return;
            if(this.config.enabled && this.config.channel) {
                await this.bot.createMessage(this.config.channel, {
                    embed: {
                        title: 'User joined',
                        color: parseInt('0x570095'),
                        thumbnail: {
                            url: member.user.staticAvatarURL
                        },
                        fields: [
                            {
                                name: 'DiscordTag',
                                value: `${member.user.username}#${member.user.discriminator}`
                            },
                            {
                                name: 'Discord ID',
                                value: member.user.id
                            },
                            {
                                name: 'Bot',
                                value: member.user.bot ? '✔' : '❌'
                            }
                        ]
                    }
                });
            }
        });
        this.bot.on('guildMemberRemove', async (guild, member) => {
            if(member.user.id === this.bot.user.id) return;
            if(this.config.enabled && this.config.channel) {
                await this.bot.createMessage(this.config.channel, {
                    embed: {
                        title: 'User Left',
                        color: parseInt('0x570095'),
                        thumbnail: {
                            url: member.user.staticAvatarURL
                        },
                        fields: [
                            {
                                name: 'DiscordTag',
                                value: `${member.user.username}#${member.user.discriminator}`
                            },
                            {
                                name: 'Discord ID',
                                value: member.user.id
                            }
                        ]
                    }
                });
            }
        });
        this.bot.on('messageDelete', async (message) => {
            if(this.config.enabled && this.config.channel) {
                if(message.channel.guild && message.content) {
                    if(message.author.id === bot.user.id) return;
                    await this.bot.createMessage(this.config.channel, {
                        embed: {
                            title: 'Message deleted',
                            color: parseInt('0x570095'),
                            thumbnail: {
                                url: message.author.staticAvatarURL
                            },
                            fields: [
                                {
                                    name: 'Author',
                                    value: `${message.author.username}#${message.author.discriminator}`
                                },
                                {
                                    name: 'Author ID',
                                    value: message.author.id
                                },
                                {
                                    name: 'Channel',
                                    value: message.channel.mention
                                },
                                {
                                    name: 'Content',
                                    value: message.content
                                }
                            ]
                        }
                    });
                }
            }
        });
        this.bot.on('messageUpdate', async (message, oldMessage) => {
            if(this.config.enabled && this.config.channel) {
                if(message.channel.guild && message.content) {
                    if(message.author.id === this.bot.user.id) return;
                    await this.bot.createMessage(this.config.channel, {
                        embed: {
                            title: 'Message edited',
                            color: parseInt('0x570095'),
                            thumbnail: {
                                url: message.author.staticAvatarURL
                            },
                            fields: [
                                {
                                    name: 'Author',
                                    value: `${message.author.username}#${message.author.discriminator}`
                                },
                                {
                                    name: 'Author ID',
                                    value: message.author.id
                                },
                                {
                                    name: 'Channel',
                                    value: message.channel.mention
                                },
                                {
                                    name: 'Original Message',
                                    value: oldMessage.content
                                },
                                {
                                    name: 'Edited Message',
                                    value: message.content
                                }
                            ]
                        }
                    });
                }
            }
        });
    },
    run: null,
    commands: [
        {
            name: 'Set Channel',
            description: 'Set\'s the logging channel',
            category: 'administrator',
            command: 'setChannel',
            permissions: ADMINISTRATOR,
            async run({channel}) {
                this.config.channel = channel.id;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        description: 'Channel was set for logging',
                        color: parseInt('0x570095'),
                    }
                });
            }
        },
        {
            name: 'Enable',
            description: 'Enables the logging service',
            category: 'administrator',
            command: 'enable',
            permissions: ADMINISTRATOR,
            async run({channel}) {
                this.config.enabled = true;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        description: 'Logging was enabled',
                        color: parseInt('0x570095'),
                    }
                });
            }
        },
        {
            name: 'Disable',
            description: 'Disables the logging service',
            category: 'administrator',
            command: 'disable',
            permissions: ADMINISTRATOR,
            async run({channel}) {
                this.config.enabled = false;
                await this.config.saveConfig();
                await channel.createMessage({
                    embed: {
                        description: 'Logging was disabled',
                        color: parseInt('0x570095'),
                    }
                });
            }
        }
    ]
};
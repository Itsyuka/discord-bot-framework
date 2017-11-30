const Config = require('./Config');
const minimist = require('minimist');
const readdir = require('recursive-readdir');
const {join} = require('path');

class CommandHandler {
    static async initialize(bot) {
        CommandHandler.commands = new Map();
        let files = await readdir(join(__dirname, '../commands'));
        for(let file of files.filter(file => file.includes('.js'))) {
            try {
                let command = require(file);
                command.run = command.run.bind({bot: bot, config: Config});
                CommandHandler.commands.set(command.command, command);
                console.log(command.name, 'loaded!')
            } catch (e) {
                console.error(e);
            }
        }
    }

    static handleMessage(message) {
        if(message.author.bot) return;
        if(message.content.startsWith(Config.prefix)) {
            let command = message.content.substr(Config.prefix.length).split(' ')[0];
            if(CommandHandler.commands.has(command)) {
                let commandFunc = CommandHandler.commands.get(command);
                if((!commandFunc.permissions || (message.member && (message.member.permission.allow & commandFunc.permissions) > 0))) {
                    message.commandless = message.content.substr(Config.prefix.length+command.length);
                    message.cleanCommandless = message.cleanContent.substr(Config.prefix.length+command.length);
                    message.params = minimist(message.commandless);
                    message.cleanParams = minimist(message.cleanCommandless);
                    commandFunc.run({message, channel: message.channel, guild: message.channel.guild});
                }
            }
        }
    }
}

module.exports = CommandHandler;
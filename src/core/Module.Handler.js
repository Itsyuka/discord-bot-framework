const ModuleConfig = require('../core/Module.Config');
const CommandHandler = require('./Command.Handler');
const readdir = require('recursive-readdir');
const {join} = require('path');

class ModuleHandler {
    static async initialize(bot) {
        ModuleHandler.modules = [];
        let files = await readdir(join(__dirname, '../modules'));
        for(let file of files.filter(file => file.includes('.js'))) {
            try {
                let module = require(file);
                let config = new ModuleConfig(module.id, module.defaultConfig);
                await config.initialize();
                if(typeof module.initialize === 'function') {
                    await module.initialize.bind({bot: bot, config: config})();
                }
                if(typeof module.run === 'function') {
                    module.run = module.run.bind({bot: bot, config: config});
                }
                ModuleHandler.modules.push(module);
                if(Array.isArray(module.commands)) {
                    for(let command of module.commands) {
                        if(typeof command.run === 'function') {
                            command.run = command.run.bind({bot: bot, config: config});
                            CommandHandler.commands.set(`${module.id}.${command.command}`, command);
                        }
                    }
                }
                console.log(module.name, 'loaded!')
            } catch (e) {
                console.error(e);
            }
        }
    }

    static handleMessage(message) {
        for(let module of ModuleHandler.modules) {
            try {
                typeof module.run === 'function' && module.run({message, channel: message.channel});
            } catch (e) {
                console.error(e);
            }
        }
    }
}

module.exports = ModuleHandler;
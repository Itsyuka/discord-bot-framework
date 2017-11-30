const {Client} = require('eris');
const Config = require('./Config');
const CommandHandler = require('./Command.Handler');
const ModuleHandler = require('./Module.Handler');

class Bot extends Client {
    async initialize() {
        await Config.initialize();
        await CommandHandler.initialize(this);
        await ModuleHandler.initialize(this);
        this.token = Config.token;
        this.options = {
            ...this.options,
            ...Config.erisOptions
        };
        this.on('messageCreate', CommandHandler.handleMessage);
        this.on('messageCreate', ModuleHandler.handleMessage);
        this.on('ready', () => console.log('The bot is connected'));
        process.on('SIGINT', () => {
            this.disconnect();
            console.log('The bot is shutting down');
            process.exit(1);
        });
    }
}

module.exports = Bot;
const {promisify} = require('util');
const fs = require('fs');
const {join} = require('path');

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const defaultConfig = {
    token: '',
    prefix: '!',
    owner: '',
    erisOptions: {
        maxShards: 1
    }
};

class Config {
    static async initialize() {
        let config;
        let exit = false;
        try {
            await stat('config');
        } catch (e) {
            await mkdir('config');
        }
        try {
            await stat(join('config', 'modules'));
        } catch (e) {
            await mkdir(join('config', 'modules'));
        }
        try {
            config = {
                ...defaultConfig,
                ...JSON.parse(await readFile(join('config', 'bot.json')))
            };
        } catch (e) {
            config = defaultConfig;
            exit = true;
        } finally {
            Object.assign(Config, config);
            await Config.saveConfig();
            if(exit) {
                console.error('No config found, generated config.json for you');
                process.exit(1);
            }
        }
    }

    static async saveConfig() {
        let config = {};
        for(let [key, value] of Object.entries(Config)) config[key] = value;
        await writeFile(join('config', 'bot.json'), JSON.stringify(config, null, 4));
    }
}

module.exports = Config;
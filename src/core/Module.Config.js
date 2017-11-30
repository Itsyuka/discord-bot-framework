const {promisify} = require('util');
const fs = require('fs');
const {join} = require('path');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class Config {
    constructor(moduleName, defaultConfig = {}) {
        this.moduleName = moduleName;
        Object.assign(this, defaultConfig);
    }

    async initialize() {
        try {
            Object.assign(this, JSON.parse(await readFile(join('config', 'modules', `${this.moduleName}.json`))));
        } catch (e) {
            console.log('No config found for module:', this.moduleName);
        } finally {
            await this.saveConfig();
        }
    }

    async saveConfig() {
        let config = {};
        for(let [key, value] of Object.entries(this)) {
            if(key !== 'moduleName') {
                config[key] = value;
            }
        }
        await writeFile(join('config', 'modules', `${this.moduleName}.json`), JSON.stringify(config, null, 4));
    }
}

module.exports = Config;
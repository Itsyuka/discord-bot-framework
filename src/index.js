const Bot = require('./core/Bot');

const main = async () => {
    let bot = new Bot();
    await bot.initialize();
    await bot.connect();
};

main();
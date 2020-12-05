const colors = require("colors");

function getPrefix() {

    const now = new Date();
    return colors.red(`[`) + colors.green(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`) + colors.red(`]`) +  colors.yellow(` ALPHAD: `)
}

module.exports = {
    print: (message) => {
        console.log(getPrefix(), colors.green(message));
    },

    rainbow: (message) => {
        console.log(getPrefix(), colors.rainbow(message));
    },

    error: (message) => {
        console.log(getPrefix(), colors.red(message));
    }
}
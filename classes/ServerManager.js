const Bot = require("./Bot");
class ServerManager {
    constructor(config, daddy) {
        this.config = config;
        this.botTokens = this.config.tokens ? this.config.tokens : [];
        this.bots = {};
        this.manager = daddy;
        this.getNewBot();
    }

    getNewBot(n=1) {
        for (n; n>= 0; n--) {
            const pt = this.config.prevTokens ? this.config.prevTokens : [];
            const nt = this.manager.allocateBot(this.botTokens.concat(pt), this.config.nickname);
            if (nt) {
                this.botTokens.push(nt);
                this.initialiseBot(nt);
            }
        }
    }

    initialiseBot(token) {
        const nb = new Bot(token, this.config.invite);
        this.bots[token] = nb;
    }
}

module.exports = ServerManager;
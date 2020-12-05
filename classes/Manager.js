const fs = require("fs");
const math = require("mathjs");
const libPrint = require("../lib/console");
const ServerManager = require("./ServerManager");

class Manager {
    constructor(servers, tokens, blacklist) {
        this.servers = servers;
        this.tokens = tokens;
        this.blacklist = blacklist;
        this.writing = false;
        this.main();
    }

    addToBlacklist(userSnowflake, details) {
        this.blacklist[userSnowflake] = details;
        while (this.writing) {}
        this.writing = true;
        libPrint.print(`Blacklisting user ${userSnowflake}`);
        fs.writeFileSync(fs.readFileSync(path.join(__dirname, './config', 'blacklist.json'), JSON.stringify(this.blacklist)));
        this.writing = false;
    }

    allocateBot(currentTokens, server) {
        let copyOfTokens = this.tokens;
        while (copyOfTokens.length > 0) {
            const x = math.randomInt(copyOfTokens.length - 1);
            const candidateToken = copyOfTokens[x];
            if (!currentTokens.includes(candidateToken)) {
                libPrint.print(`Allocated ${candidateToken} to ${server}`)
                return candidateToken
            } else {
                delete copyOfTokens[x];
            }
        }
        libPrint.error(`No valid tokens for allocation to ${server}`);
        return undefined;
    }

    main() {
        const sm = new ServerManager(this.servers[0], this);

    }
}

module.exports = Manager;
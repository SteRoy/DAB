const axios = require("axios");
const discordjs = require("discord.js");
const libPrint = require("../lib/console");

class Bot {
    constructor(token, invite, serverManager) {
        this.token = token;
        this.server = invite;
        this.serverManager = serverManager;
        this.client = new discordjs.Client(this.token);
        this.joinServer();
    }

    joinServer() {
        const headers = {
            'Authorization': this.token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'Accept': '*/*'
        };
        axios.post(`https://discord.com/api/v6/invites/${this.server}`, undefined, {headers}).then(response => {
            // Succeeded
            libPrint.print(`Token ${this.token} has joined ${this.server}.`)
        }).catch((err) => {
            if (err.response.status === 401) {
                // 401 - bot is murdered and needs 'verified'
                libPrint.error(`Token ${this.token} needs to be verified / the token is invalid.`);
            }
        })
    }
}

module.exports = Bot;
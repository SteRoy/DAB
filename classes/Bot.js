const axios = require("axios");
const discordjs = require("discord.js");
const libPrint = require("../lib/console");

class Bot {
    constructor(token, invite, serverManager) {
        this.token = token;
        this.server = invite;
        this.serverManager = serverManager;
        this.client = new discordjs.Client();
        this.init();
        this.guild = null;
    }

    joinServer() {
        const headers = {
            'Authorization': this.token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'Accept': '*/*'
        };
        axios.post(`https://discord.com/api/v6/invites/${this.server}`, undefined, {headers}).then(response => {
            // Succeeded
            this.guild = response.data["guild"];
            libPrint.print(`Token ${this.token} has joined ${this.getGuildName()}.`);
            this.init();
        }).catch((err) => {
            if (err.response.status === 401) {
                // 401 - bot is murdered and needs 'verified'
                libPrint.error(`Token ${this.token} needs to be verified / the token is invalid.`);
            }
        })
    }

    async getGuild() {
        await this.client.guilds.fetch(this.guild.id);
    }

    getGuildMembers() {
        const g = this.getGuild();
        if (g) {
            libPrint.print(`[${this.token}] is fetching members for ${this.getGuildName()}`);
            g.members.fetch().then(members => {
                console.log(members);
            }).catch(err => {
                this.error(err.toString());
            })
        } else {
            // pretty sure this means that the bot is banned/has been kicked from the server
            console.log(g);
        }
    }

    error(message) {
        libPrint.error(`[${this.token}] on [${this.getGuildName()}] has errored: ${message}`)
    }

    getGuildName() {
        if (this.guild) {
            return this.guild.name;
        } else {
            return this.server;
        }
    }

    init() {
        this.client.on('ready', () => {
            libPrint.print(`Token ${this.token} for ${this.getGuildName()} is logged in.`);
            this.joinServer();
            this.getGuildMembers();
        });

        this.client.on('error', (err) => {
            this.error(err);
        });

        this.client.on('debug', (msg) => {
            console.log(msg);
        });

        this.client.login(this.token.toString()).catch(err => {
            this.error(`Invalid Token`);
        });

    }

    main() {
    }
}

module.exports = Bot;
const axios = require("axios");

class Bot {
    constructor(token, invite) {
        this.token = token;
        this.server = invite;
        this.joinServer();
    }

    joinServer() {
        const headers = {
            'Authorization': this.token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'Accept': '*/*'
        };
        axios.post(`https://discord.com/api/v6/invites/${this.server}`, undefined, {headers}).then(response => {
            console.log(response.data);
        }).catch((err) => {
            // 401 - bot is murdered and needs 'verified'
        })
    }
}

module.exports = Bot;
const fs = require("fs");
const path = require("path");
const libprint = require("./lib/console");
const Manager = require("./classes/Manager");

libprint.print(`Initialising`);

// Read Tokens
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, './config', 'tokens.json'), 'utf8'));
libprint.print(`Loaded ${tokens.length} account tokens.`);

// Read Config
const servers = JSON.parse(fs.readFileSync(path.join(__dirname, './config', 'servers.json'), 'utf8'));
libprint.print(`Loaded ${servers.length} server configs.`);

// Read Blacklist
const blacklist = JSON.parse(fs.readFileSync(path.join(__dirname, './config', 'blacklist.json'), 'utf8'));
libprint.print(`Loaded ${Object.keys(blacklist).length} blacklisted identifiers.`)

const mgr = new Manager(servers, tokens, blacklist);
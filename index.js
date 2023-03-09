const { SapphireClient } = require('@sapphire/framework');
const dotenv = require('dotenv'); dotenv.config();
const { TOKEN, DEV_TOKEN, } = require('./config.json');
const client = new SapphireClient({ intents: ["Guilds", "GuildMembers", "GuildMessageReactions", "GuildMessages"], });

client.login(DEV_TOKEN);
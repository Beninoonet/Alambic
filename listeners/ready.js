const { Listener } = require('@sapphire/framework');
const { Client } = require('discord.js');
// GIVEAWAY INIT
const { GiveawayCreator } = require('discord-giveaway');
// config part
const { DATABASE_URI} = require('../config.json');

class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }
  /**
   * 
   * @param {Client} client 
   */
  run(client) {
    // INIT BOT ON READY
    const { username, id } = client.user;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'WATCHING' })

    // INIT GIVEAWAY ON READY
    const Creator = new GiveawayCreator(client, DATABASE_URI);
    
    client.giveaways = Creator;
  }
}


module.exports = {
  ReadyListener
};
const ms = require('ms')


const { Command } = require('@sapphire/framework');
const { CommandInteraction } = require('discord.js');
class StartGACommand extends Command {
  constructor(context, options) {
    super(context, { ...options,
    requiredUserPermissions: ["ManageEvents"] });
  }
  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
      .setName('start-giveaway')
      .setDescription('Starting an giveaway')
      .addStringOption((option) =>
          option //
            .setName('duration')
            .setDescription('Définir la durée du giveaway')
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option //
            .setName('winners')
            .setDescription('Définir le nombre de gagant')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option //
            .setName('prix')
            .setDescription('prix à gagner')
            .setRequired(true)
        )
    );
  }
  /**
   * 
   * @param {CommandInteraction} interaction 
   */
  async chatInputRun(interaction, client) {
        const duration = interaction.options.getString('duration');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

        client.giveawaysManager
        .start(interaction.channel, {
            duration: ms(duration),
            winnerCount,
            prize
        })
        .then((data) => {
            console.log(data); // {...} (messageId, end date and more)
        });
  }

}
module.exports = {
  StartGACommand
};
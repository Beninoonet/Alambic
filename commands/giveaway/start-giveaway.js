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
        await client.giveaways.startGiveaway({
          prize: 'Discord Nitro Classic',
            channelId: interaction.channel.id,
            guildId: interaction.guild.id,
            duration: 30000, // 30 Seconds
            winners: 1, // 1 winner
            hostedBy: interaction.user.id
        })
  }

}
module.exports = {
  StartGACommand
};
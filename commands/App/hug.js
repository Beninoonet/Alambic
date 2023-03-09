require('dotenv').config()
const { TENOR_API } = require("../../config.json")
const Tenor = require("tenorjs").client({
  "Key": TENOR_API, // https://tenor.com/developer/keyregistration
  "Filter": "off", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
  "MediaFilter": "minimal", // either minimal or basic, not case sensitive
  "DateFormat": "MM/D/YYYY - H:mm:ss A" // Change this accordingly
});



const { Command } = require('@sapphire/framework');

const { ApplicationCommandType } = require('discord-api-types/v9');
const { GuildMember , Interaction, MessageEmbed, EmbedBuilder } = require('discord.js');
class HugCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Event to hug a member with gif',
      cooldownDelay: 2_000 // 10_000 milliseconds (10 seconds)
      
    });
  }
  registerApplicationCommands(registry) {
    registry.registerContextMenuCommand((builder) =>
      builder //
        .setName(this.name)
        .setType(ApplicationCommandType.User)
    );
  }
  /**
   * 
   * @param {Interaction} interaction 
   */
  async contextMenuRun(interaction) {
    if (interaction.isUserContextMenuCommand() && interaction.targetMember instanceof GuildMember) {
      await interaction.reply({
        content: `${interaction.user} fait un câlin à ${interaction.targetUser} 🫂`
      })
      Tenor.Search.Random("hug anime", "3")
      .then(Results => {
         Results.forEach(Post => {
                const embed = new EmbedBuilder()
                .setColor('DarkButNotBlack')
                .setImage(Post.media_formats.gif.url)
                .setTimestamp();
                
                interaction.editReply({
                  embeds: [embed]
                });

               

        });
  })
  .catch(console.error);
    }
    
  }
}
module.exports = {
  HugCommand
};
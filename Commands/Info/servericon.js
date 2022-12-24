/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "servericon",
  aliases: ["savatar", "sav", "sicon"],
  permissions: "SendMessages",
  description: "Sends an embed with en enlarged picture of the server icon",
  cooldown: 3,
  execute(message, args, commandName, client, Discord) {
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor(
              `Server icon for ${message.guild.name}`,
              message.guild.iconURL({ dynamic: true })
            )
            .setColor("Random")
            .setDescription(
              `<:image:898358312133865513> [Png](${message.guild.iconURL({
                format: "png",
                dynamic: true,
                size: 1024,
              })}) | [Webp](${message.guild.iconURL({
                dynamic: true,
                size: 1024,
              })}) | [Jpg](${message.guild.iconURL({
                format: "jpg",
                dynamic: true,
                size: 1024,
              })})`
            )
            /* .addField('❱ PNG', `[\`LINK\`](${message.guild.iconURL({ format: 'png' })})`, true)
				.addField('❱ JPEG', `[\`LINK\`](${message.guild.iconURL({ format: 'jpg' })})`, true)
				.addField('❱ WEBP', `[\`LINK\`](${message.guild.iconURL({ format: 'webp' })})`, true) 
				.setURL(message.guild.iconURL({
					dynamic: true,
				})) */
            .setImage(
              message.guild.iconURL({
                dynamic: true,
                size: 256,
              })
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};

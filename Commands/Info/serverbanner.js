/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverbanner",
  aliases: ["sbanner", "sb"],
  permissions: "SendMessages",
  description: "Sends an embed with en enlarged picture of the server banner.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const banner = message.guild.bannerURL({ dynamic: true, size: 4096 });

    if (!banner)
      return message.channel.send(
        `> ${message.author} this server doesn't have a banner.`
      );

    const embed = new EmbedBuilder()
      .setAuthor(
        `Server banner for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("Random")
      .setDescription(
        `<:image:898358312133865513> [Png](${message.guild.bannerURL({
          format: "png",
        })}) | [Webp](${message.guild.bannerURL()}) | [Jpg](${message.guild.bannerURL(
          { format: "jpg" }
        )})`
      )
      .setImage(banner);
    message.channel.send({ embeds: [embed] });
  },
};

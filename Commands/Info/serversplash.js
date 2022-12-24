/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serversplash",
  aliases: ["splash"],
  permissions: "SendMessages",
  description: "Sends an embed with en enlarged picture of the server banner.",
  cooldown: 3,
  execute(message, args, commandName, client, Discord) {
    const splash = message.guild.splashURL({ dynamic: true, size: 4096 });

    if (!splash)
      return message.channel.send(
        `> ${message.author} this server doesn't have a splash screen.`
      );

    const embed = new EmbedBuilder()
      .setAuthor(
        `Server splash for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("Random")
      .setDescription(
        `<:image:898358312133865513> [Png](${message.guild.splashURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })}) | [Webp](${message.guild.splashURL({
          dynamic: true,
          size: 1024,
        })}) | [Jpg](${message.guild.splashURL({
          format: "jpg",
          dynamic: true,
          size: 1024,
        })})`
      )
      .setImage(splash);
    message.channel.send({ embeds: [embed] });
  },
};

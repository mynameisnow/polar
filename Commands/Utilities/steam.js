/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "steam",
  aliases: [],
  permissions: "SendMessages",
  description: "Gives info about something on Steam.",
  cooldown: 2,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    try {
      const steam = args.slice(0).join(" ");
      if (!steam)
        return message.reply({
          content: "Please enter something to seach for on Steam.",
        });

      const result = await fetch("https://api.popcat.xyz/steam?q=").then(
        (res) => res.json()
      );

      const embed = new EmbedBuilder({
        title: "Steam Search",
        color: "RANDOM",
        fields: [
          { name: "Type", value: `${result.type}`, inline: true },
          { name: "Name", value: `${result.name}`, inline: true },
          { name: "Description", value: `${result.description}`, inline: true },
          // { name: 'Likes', value: `${data.likes}`, inline: true },
          { name: "Website", value: `${result.website}`, inline: true },
          { name: "Publishers", value: `${result.developers}`, inline: true },
          { name: "Publishers", value: `${result.publishers}`, inline: true },
          { name: "Price", value: `${result.price}` },
        ],
        thumbnail: {
          url: result.thumbnail,
        },
        footer: {
          text: `Requested by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
      });
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(`[Error - ${commandName.toUpperCase()}] : ` + err);
    }
  },
};

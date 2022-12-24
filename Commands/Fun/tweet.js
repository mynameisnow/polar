/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "tweet",
  aliases: [],
  permissions: "SendMessages",
  description: "Tweet something.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    if (!args[0])
      return message.reply({ content: "Please text something to tweet!" });

    fetch(
      `https://nekobot.xyz/api/imagegen?type=tweet&username=${
        message.author.username
      }&text=${args.join(" ")}`
    )
      .then((res) => res.json())
      .then((data) => {
        const embed = new EmbedBuilder()
          .setTitle("Tweeted!")
          .setImage(`${data.message}`)
          .setColor("Blue")
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
        // message.react('<:twitter:890252878780977243>');
      });
  },
};

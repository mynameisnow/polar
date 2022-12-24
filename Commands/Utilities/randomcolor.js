/* eslint-disable no-unused-vars */
/* const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "randomcolor",
  aliases: ["color"],
  permissions: "SendMessages",
  description: "Fetches a random color.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const result = await fetch("https://api.popcat.xyz/randomcolor").then(
      (res) => res.json()
    );
    const embed = new EmbedBuilder()
      .setTitle("Random Color Generated")
      .addFields([
        { name: "Name", value: result.name, inline: true },
        { name: "Hex", value: result.hex, inline: true },
        { name: "RGB", value: result.rgb, inline: true },
      ])
      .setColor(result.hex)
      .setImage(result.image);
    message.channel.send({ embeds: [embed] });
  },
}; */

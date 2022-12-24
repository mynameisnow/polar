/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "coinflip",
  aliases: ["flip"],
  permissions: "SendMessages",
  description: "A simple coinflip?",
  cooldown: 0,
  execute(message, args, commandName, client, Discord) {
    const answers = [
      "The coin lands on heads!",
      "Tail is the winner!",
      "Heads it is!",
      "The coin lands on tails!",
      "Heads is the winner!",
      "Tails!",
      "Heads!",
      "Tails it is!",
    ];

    const coin = answers[Math.floor(Math.random() * answers.length)];
    const output = `<@${message.author.id}>, ${coin}`;
    const embed = new Discord.EmbedBuilder()
      .setColor("GOLD")
      .setTitle("Flipped a coin! 🪙")
      .setDescription(output)
      // .setFooter(client.user.tag, `${client.user.displayAvatarURL({dynamic: true, size: 512})
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};

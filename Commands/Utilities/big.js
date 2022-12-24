/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "big",
  aliases: [],
  permissions: "SendMessages",
  description: "Enlarges a custom emoji.",
  cooldown: 2,
  execute(message, args, commandName, client, Discord) {
    if (message.content.match(/<a:.+?:\d+>/g)) {
      const emo = message.content.match(/\d+>/g);
      const emojiID = String(emo).substring(0, 18);
      const embed = new EmbedBuilder()
        .setTitle(`${message.content.match(/:.+?:/g)}`)
        .setImage(`https://cdn.discordapp.com/emojis/${emojiID}.gif`);
      return message.channel
        .send({ embeds: [embed] })
        .then()
        .catch(console.error);
    }

    if (message.content.match(/<:.+?:\d+>/g)) {
      const emo = message.content.match(/\d+>/g);
      const emojiID = String(emo).substring(0, 18);
      const embed = new EmbedBuilder()
        .setTitle(`${message.content.match(/:.+?:/g)}`)
        .setImage(`https://cdn.discordapp.com/emojis/${emojiID}.png`);
      return message.channel
        .send({ embeds: [embed], allowedMentions: { repliedUser: false } })
        .then()
        .catch(console.error);
    }

    if (!message.content.match(/<:.+?:\d+>|<a:.+?:\d+>/g)) {
      const errorE = new EmbedBuilder()
        .setTitle("Use an emoji to enlarge it.")
        .setColor("Red");
      return message.channel.send({ embeds: [errorE] });
    }
  },
};

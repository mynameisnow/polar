/* eslint-disable no-unused-vars */
const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const pagination = require("../../functions/pagination");
//

module.exports = {
  name: "pages",
  aliases: [],
  description: "pagination test",
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const embeds = [];

    const Embed1 = new EmbedBuilder()
      .setDescription("Page1")
      .setColor("Random");

    const Embed2 = new EmbedBuilder()
      .setDescription("Page 2")
      .setColor("Random");

    const Embed3 = new EmbedBuilder()
      .setDescription("Page3")
      .setColor("Random");

    embeds.push(Embed1, Embed2, Embed3);

    pagination(message, embeds);
  },
};

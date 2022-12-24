/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "wiki",
  aliases: [],
  permissions: "SendMessages",
  description: "Searches for something on Google.",
  cooldown: 2,
  execute(message, args, commandName, client, Discord) {
    const search = args.join("_");
    const msg = args.join(" ");
    if (!msg) {
      return message.channel.send("You need to enter some text to search for");
    }
    const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new EmbedBuilder()
      .setAuthor(
        "Wikipedia Search",
        "https://cdn.discordapp.com/attachments/881617678501031937/917123713667833876/1200px-Wikipedia-logo-v2.png"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/881617678501031937/917123292236763227/1200px-Wikipedia-logo-v2-en.png"
      )
      .addField("You Searched for:", `${msg}`)
      .addField("Results:", `[Here's What I found](${link})`)
      .setColor("Random");

    message.channel.send({ embeds: [embed] });
  },
};

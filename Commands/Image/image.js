// https://www.google.com/search?tbm=isch&q=%s
/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const google = require("googlethis");
module.exports = {
  name: "image",
  aliases: ["img"],
  permissions: "SendMessages",
  description: "Searches for an image on Google.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const query = args[0];
    const imageSearch = await google.image(query, { safe: true });
    // const attachment = new Discord.MessageAttachment(imageSearch);
    const embed = new EmbedBuilder()
      .setTitle(`Here is your search for ${query}`)
      .setImage(imageSearch);
    // return message.reply(imageSearch);
    return message.reply({ embeds: [embed] });
  },
};

/* eslint-disable no-unused-vars */
// import { Command } from "../../structures/Command";
const { MessageAttachment, EmbedBuilder } = require("discord.js");
// const r = require('link-checker-malicious');

module.exports = {
  name: "screenshot",
  aliases: ["ss"],
  permissions: "MANAGE_MESSAGES",
  description: "Sends a message to a channel through Doggo Bot.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const url = args[0];
    const emb = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Screenshot")
      .setImage(
        `https://image.thum.io/get/png/width/1920/crop/720/noanimate/${url}`
      )
      .setFooter({
        text: `${message.author.tag}`,
        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
      });
    /* if (!url.startsWith('http')) {
			message.reply({ content: 'Provide valid url or die.' });
		} 
		else if (r.is_nsfw(url) as String === 'true') {
            interaction.followUp({ content: `NSFW links are not allowed.` })
        } */
    // else {
    message.channel.send({ embeds: [emb] });
    // }
  },
};

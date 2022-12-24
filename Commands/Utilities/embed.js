/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "embed",
  aliases: ["emb"],
  permissions: "MANAGE_GUILD",
  description: "Enlarges a custom emoji.",
  cooldown: 2,
  execute(message, args, commandName, client, Discord) {
    // get the target channel
    const targetChannel = message.mentions.channels.first();

    /* const mP = new Discord.EmbedBuilder()
			.setAuthor('ERROR', 'https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png')
			.setTitle('Missing Permissions!')
			.setColor('#ff4a4a')
			.setDescription('You don\'t have sufficient permissions!\n```yaml\nMissing Permissions: MANAGE_GUILD\n```');
		if (!message.member.permissions.has('MANAGE_GUILD')) {
			message.channel.send({ embeds: [mP] });
			return;
		} */

    const ch = new EmbedBuilder()
      .setAuthor(
        "ERROR",
        "https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png"
      )
      .setTitle("Missing Arguments!")
      .setColor("#ff4a4a")
      .setDescription(
        "Please specify a channel to send the embed in\n```yaml\nSyntax: .embed <#channel> <JSON>\n```"
      );

    if (!targetChannel) {
      message.channel.send({ embeds: [ch] });
      return;
    }

    try {
      // get the JSON data
      const json = JSON.parse(args.slice(1).join(" "));

      // send the embed
      targetChannel.send({ embeds: [json] });
      message.delete();
    } catch (error) {
      const err = new EmbedBuilder()
        .setAuthor(
          "ERROR",
          "https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png"
        )
        .setTitle("Invalid JSON!")
        .setColor("#ff4a4a")
        .setDescription(
          `You can try using [Carl-bot embed builder](https://carl.gg)\n\`\`\`js\n${error.message}\n\`\`\``
        );

      message.channel.send({ embeds: [err] });
    }
  },
};

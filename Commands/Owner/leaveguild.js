/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "leaveguild",
  aliases: ["leave"],
  description: "The bot leaves a server.",
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const guildId = args[0];
    if (!rgx.test(guildId)) {
      return message.channel.send("Please provide a valid server ID");
    }
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild)
      return message.channel.send(
        "Unable to find server, please check the provided ID"
      );
    await guild.leave();
    const embed = new EmbedBuilder()
      .setTitle("Leave Guild")
      .setDescription(`I have successfully left **${guild.name}**.`)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send({ embeds: [embed] });
  },
};

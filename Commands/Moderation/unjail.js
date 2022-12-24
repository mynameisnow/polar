/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "unjail",
  aliases: [],
  description: "A command to unjail users.",
  permissions: "BanMembers",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const ujMember = message.mentions.members.first();
    const jRole = message.guild.roles.cache.find(
      (role) => role.name === "Jailed"
    );
    // const mRole = message.guild.roles.cache.find(role => role.name === 'Member');
    if (!jRole) {
      const nR = new EmbedBuilder()
        .setColor("Red")
        .setDescription("This guild does not have a jailed role.");
      return message.channel.send({ embeds: [nR] });
    }
    // if (!ujMember) return message.reply({ content: 'Please mention a user.', allowedMentions: { repliedUser: false } });
    if (!ujMember) {
      const nM = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Please mention a user.");
      return message.channel.send({ embeds: [nM] });
    }
    if (!ujMember.roles.cache.find((role) => role.name === "Jailed")) {
      const aM = new EmbedBuilder()
        .setColor("ffcd4c")
        .setDescription(`⚠️ ${ujMember} is not currently jailed! ⚠️`);
      return message.channel.send({ embeds: [aM] });
    }
    ujMember.roles.remove(jRole);
    // ujMember.roles.add(mRole);
    const unmuteEmbed = new EmbedBuilder()
      .setColor("657eb3")
      .setThumbnail(ujMember.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        {
          name: "Jailed User:",
          value: ujMember.user.username,
          inline: true,
        },
        {
          name: "Unjailed By:",
          value: message.member.user.username,
          inline: false,
        },
      ])
      .setTimestamp();
    return message.channel.send({ embeds: [unmuteEmbed] });
  },
};

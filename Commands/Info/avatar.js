/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp"],
  permissions: "SendMessages",
  description: "Shows users avatar",
  cooldown: 0,
  async execute(message, args, commandName, client, Discord) {
    // const target = message.mentions.members.first() || await client.users.fetch(args[0]) || message.member;
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    // message.guild.members.cache.get(args[0])
    const embed = new EmbedBuilder()
      .setTitle(`${target.user.tag}'s Avatar`)
      .setColor(target.displayColor)
      .setImage(
        target.user.displayAvatarURL({
          dynamic: true,
          size: 1024,
        })
      )
      .setDescription(
        `<:image:898358312133865513> [Png](${target.user.avatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })}) | [Webp](${target.user.avatarURL({
          dynamic: true,
          size: 1024,
        })}) | [Jpg](${target.user.avatarURL({
          format: "jpg",
          dynamic: true,
          size: 1024,
        })})`
      );
    // .setFooter(`Requested by: ${message.member.user.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
    // return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    return message.channel.send({ embeds: [embed] });
  },
};

/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "kick",
  aliases: [],
  permissions: "KickMembers",
  description: "Kicks a member from the guild.",
  cooldown: 3,
  // ownerOnly: true,
  async execute(message, args, client) {
    const errEmbed = new EmbedBuilder().setColor("#ffcd4c");

    const kickMember = message.mentions.members.first(); // || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason provided";

    if (kickMember.id === message.author.id) {
      return message.channel.send({
        embeds: [errEmbed.setDescription("You can't kick yourself silly! 😹")],
      });
    }
    if (!kickMember)
      return message.channel.send({
        embeds: [errEmbed.setDescription("Could not find that user.")],
      });
    // if (kickMember.id === client.id) return message.reply({ content: 'why would I kick myself lol', allowedMentions: { repliedUser: false } });
    if (kickMember.permissions.has("BanMembers")) {
      return message.channel.send({
        embeds: [errEmbed.setDescription("You cannot kick a moderator!")],
      });
    }
    if (kickMember) {
      /* const sEmbed = new EmbedBuilder()
				.setColor('RED')
				.setAuthor(kickMember.user.username, kickMember.user.displayAvatarURL({ dynamic: true }))
				.setTitle('You Have Been Kicked!')
				.addField('__Server__', `${message.guild.name}`, true)
				.addField('__Reason__', `${reason}`, true)
				.addField('__Moderator__', `${message.author.username}`, true)
				.setTimestamp();
			kickMember.send({ embeds: [sEmbed] }); 

			const kickEmbed = new EmbedBuilder()
				.setColor('#3aad41')
				.setAuthor(kickMember.user.username, kickMember.user.displayAvatarURL())
				.setTitle('__**Kick Successful**__')
				.addField('Kicked Member', kickMember.toString(), true)
				.addField('Reason', reason.toString(), true)
				.addField('Kicked by', `${message.author}`, true)
				.setThumbnail('https://i.imgur.com/opG7pFm.png')
				.setTimestamp();
			message.channel.send({ embeds: [kickEmbed] }); */
      const kickEmbed = new EmbedBuilder()
        .setTitle(` ${kickMember.user.username} has been kicked.`)
        .setThumbnail(
          kickMember.user.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .setColor("#f56816")
        .addFields([
          {
            name: "Kicked by:",
            value: message.member.user.username,
            inline: true,
          },
          {
            name: "Reason:",
            value: reason ? reason : "No reason specified",
            inline: false,
          },
        ])
        .setTimestamp();
      message.channel.send({ embeds: [kickEmbed] });
      kickMember.kick({ reason: reason });
    }
  },
};

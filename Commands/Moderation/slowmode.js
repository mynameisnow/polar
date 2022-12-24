module.exports = {
  name: "slowmode",
  aliases: [],
  permissions: "ADMINISTRATOR",
  description: "Sets slowmode in a channel.",
  cooldown: 3,
  // ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const duration = args[0];
    if (isNaN(duration)) {
      const nopr = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("**`(prefix)slowmode <time(s)> <reason>`**");
      return message.channel.send({ embeds: [nopr] });
    }
    const reason = args.slice(1).join(" ");
    if (!reason) {
      const norreaon = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("**Please Specify A Reason To Set Slowmode!**");
      return message.channel.send({ embeds: [norreaon] });
    }
    message.channel.setRateLimitPerUser(duration, reason);
    const success = new Discord.EmbedBuilder()
      .setTimestamp()
      .setColor("Random")
      .setAuthor(
        `${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Successfully Set Slowmode To \`${duration}\`. Reason: \`${reason}\`!**`
      );
    message.channel.send({ embeds: [success] });
  },
};

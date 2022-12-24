/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "addrole",
  aliases: [],
  permissions: "MANAGE_ROLES",
  description: "Adds a role to a user.",
  cooldown: 3,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return message.channel.send("Please mention a user to give a role to.");
    }
    /* const name = args.slice(1).join(' ');
		if (!name) return message.channel.send('Please type the name of the role'); */
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!role) return message.channel.send("Couldn't find the Provided Role");
    // if (user.roles.has(role))
    if (user.roles.highest.position < message.guild.me.roles.highest.position)
      return message.channel.send("Insufficient permissions.");
    await user.roles.add(role);
    const roleEmbed = new EmbedBuilder()
      .setColor("#657eb3")
      .setDescription(
        `${user.user.username} has been given the <@&${role.id}> role.`
      );
    message.channel.send({ embeds: [roleEmbed] });
  },
};

/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "removerole",
  aliases: [],
  permissions: "MANAGE_ROLES",
  description: "Removes a role from a user.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return message.channel.send(
        "Please mention a user to give take a role away."
      );
    }
    /* const name = args.slice(1).join(' ');
		if (!name) return message.channel.send('Please type the name of the role'); */
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!role) return message.channel.send("Couldn't find the Provided Role");
    // if (user.roles.has(role))
    if (user.roles.highest.position < message.guild.me.roles.highest.position)
      return message.channel.send("Insufficient permissions.");
    await user.roles.remove(role);
    const roleEmbed = new EmbedBuilder()
      .setColor("#657eb3")
      .setDescription(
        `<@&${role.id}> has been removed from ${user.user.username}`
      );
    message.channel.send({ embeds: [roleEmbed] });
  },
};

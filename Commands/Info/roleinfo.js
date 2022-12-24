/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "roleinfo",
  aliases: ["rolei"],
  description: "Check info for a role.",
  permission: "SendMessages",
  cooldown: 0,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(message, args, commandName, client, Discord) {
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      return message.channel.send(":x: Please provide a valid role.");
    }

    /* let permissions;
		if (role.permissions.toArray().length !== 0) {
			permissions = role.permissions.toArray().map(x => x.split('_').map(y => y[0] + y.slice(1).toLowerCase()).join(' ')).join(', ');
		}
		else {
			permissions = 'None';
		} */
    const permissions = {
      ADMINISTRATOR: "Administrator",
      MANAGE_GUILD: "Manage Server",
      MANAGE_ROLES: "Manage Roles",
      MANAGE_CHANNELS: "Manage Channels",
      KickMembers: "Kick Members",
      BanMembers: "Ban Members",
      MANAGE_NICKNAMES: "Manage Nicknames",
      MANAGE_EMOJIS: "Manage Emojis",
      MANAGE_WEBHOOKS: "Manage Webhooks",
      MANAGE_MESSAGES: "Manage Messages",
      MENTION_EVERYONE: "Mention Everyone",
    };
    const mentionPermissions =
      role.permissions.toArray() === null ? "None" : role.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
      if (mentionPermissions.includes(permission))
        finalPermissions.push(`${permissions[permission]}`);
      else;
    }
    const embed = new EmbedBuilder()
      // .setColor('#ffff')
      .setColor(role.hexColor)
      .setFooter(`Requested by ${message.author.tag} `)
      .setTimestamp()
      .setTitle("Role Information")
      .addFields(
        { name: "Role Name", value: `\`\`\`${role.name}\`\`\``, inline: true },
        { name: "Role ID", value: `\`\`\`${role.id}\`\`\``, inline: true },
        {
          name: "Hex Color",
          value: `\`\`\`${role.hexColor.toUpperCase()}\`\`\``,
        },
        {
          name: "Members",
          value: `\`\`\`${role.members.size}\`\`\``,
          inline: true,
        },
        {
          name: "Hoisted",
          value: `\`\`\`${role.hoist ? "Yes" : "No"}\`\`\``,
          inline: true,
        },
        {
          name: "Mentionable",
          value: `\`\`\`${role.mentionable ? "Yes" : "No"}\`\`\``,
          inline: true,
        },
        {
          name: "Created",
          value: `\`\`\`${moment(role.createdTimestamp).format(
            "MMMM Do YYYY, h:mm:ss"
          )} | ${Math.floor(
            (Date.now() - role.createdTimestamp) / 86400000
          )} day(s) ago\`\`\``,
        }
      )
      .addField(
        "Key Permissions",
        `\`\`\`${finalPermissions.join(", ")}\`\`\``
      );

    return message.channel.send({ embeds: [embed] });
  },
};

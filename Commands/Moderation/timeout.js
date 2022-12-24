/* eslint-disable no-unused-vars */
// const { Message, EmbedBuilder, Client, Permissions } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
// const logsSchema = require('../../models/logs');
const ms = require("ms");
// const pretty = require('pretty-ms');
module.exports = {
  name: "timeout",
  permissions: ["BanMembers"],
  // botPerms: ['MODERATE_MEMBERS'],
  cooldown: 3,
  usage: "<user> <time> <reason>",
  description: "Timeout a user",
  async execute(message, args, commandName, client, Discord) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (member) =>
          member.user.username.toLowerCase() === args.join(" ").toLowerCase()
      ) ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (member) =>
          member.displayName.toLowerCase() === args.join(" ").toLowerCase()
      );

    const length = args[1];

    const reason = args.slice(2).join(" ") || "No Reason Provided";

    const errEmbed = new EmbedBuilder().setColor("#657eb3");

    if (!target)
      return message.reply({
        embeds: [
          errEmbed.setDescription("**Please specify someone to time out**"),
        ],
      });

    if (target.id === message.author.id)
      return message.reply({
        embeds: [errEmbed.setDescription("**Please Mention Someone Else**")],
      });

    if (target.id === client.user.id)
      return message.reply({
        embeds: [
          errEmbed.setDescription(
            "**You Must Time Out The Interaction Manually**"
          ),
        ],
      });

    if (
      message.member.roles.highest.comparePositionTo(target.roles.highest) < 1
    )
      return message.reply({
        embeds: [
          errEmbed.setDescription(
            "**Your Role Is Too Low To Time Out The User**"
          ),
        ],
      });

    if (!target.bannable)
      return message.reply({
        embeds: [
          errEmbed.setDescription("**That person can't be timed out!**"),
        ],
      });
    // moderatable
    if (
      message.guild.me.roles.highest.comparePositionTo(target.roles.highest) < 0
    )
      return message.reply({
        embeds: [
          errEmbed.setDescription(
            `**My Role Must Be Higher Than ${target.user.tag} Highest Role!**`
          ),
        ],
      });

    if (!length)
      return message.reply({
        embeds: [
          errEmbed.setDescription(
            "**Please Give Me A Duration To Timeout The User EX: 1m 1h 1d**"
          ),
        ],
      });

    if (length === "null" || length === "off") {
      if (!target.isCommunicationDisabled())
        return message.reply({
          embeds: [
            errEmbed.setDescription(
              "**I Can Not Remove The User's Timeout Because They Do Not Have A Timeout**"
            ),
          ],
        });

      target.timeout(null, reason).catch((e) => {
        return message.channel.send({
          embeds: [
            errEmbed.setDescription(`**Could not untimeout ${target}**`),
          ],
        });
      });

      message.channel.send({
        embeds: [
          errEmbed.setDescription(`**Successfully UnTimeouted ${target}**`),
        ],
      });

      /* const modlog = new client.modLog({
				message,
				description: `${message.author} Used Timeout On ${target.user.tag}`,
				field1n: 'Time',
				field1v: '0',
				field2n: 'Reason',
				field2v: `${reason}`,
			}); */
    } else {
      const timer = ms(length);

      if (!timer)
        return message.channel.send({
          embeds: [
            errEmbed.setDescription("**Please specify a time EX: 1m 1h 1d**"),
          ],
        });

      target.timeout(timer, reason).catch((e) => {
        return message.channel.send({
          embeds: [errEmbed.setDescription(`**Could not timeout ${target}**`)],
        });
      });

      message.channel.send({
        embeds: [
          errEmbed.setDescription(`**Successfully timed out ${target}**`),
        ],
      });

      // eslint-disable-next-line no-empty-function
      target
        .send({
          embeds: [
            errEmbed.setDescription(
              `**You have been timed out in ${message.guild.name}** for ${length}.`
            ),
          ],
        })
        .catch((err) => {});

      /* const modlog = new client.modLog({
				message,
				description: `${message.author} Used Timeout On ${target.user.tag}`,
				field1n: 'Time',
				field1v: `${pretty(timer)}`,
				field2n: 'Reason',
				field2v: `${reason}`,
			}); */
    }
  },
};
